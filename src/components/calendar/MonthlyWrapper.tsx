import * as React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  LayoutRectangle,
  ActivityIndicator,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { myCalendarContext } from "contexts/contextApi";
import { Colors } from "styles/index";
import { MonthItem } from "./MonthItem";
import { Month, NewCalendarMonths } from "interfaces/myCalendarInterface";
import { monthsByName } from "common/types/calendarTypes";
import { getMonth, getSixMonthsWithDays } from "lib/utils";

export const MonthlyWrapper = () => {
  const { calendar, changeMonthHeader, loadMyCalendar } = myCalendarContext();
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );
  const [index, setIndex] = React.useState<number>(getMonth());
  const [contentOffset, setContentOffset] = React.useState<number>(0);
  const [direction, setDirection] = React.useState<"previous" | "next" | null>(
    null
  );

  var data = React.useMemo(() => {
    return calendar;
  }, [calendar, index]);

  const renderItem = ({ item }: any) => {
    return (
      <MonthItem
        days={item.days}
        year={item.year}
        month={item.name}
        firstDayName={item.firstDayName}
        numOfDays={item.numOfDays}
        name={item.name}
        dimensions={dimensions}
      />
    );
  };

  const keyExtractor = React.useCallback(
    (item: Month, index: number) => `${item.name}_${index}`,
    []
  );

  const getItemLayout = (data: any[] | null | undefined, index: number) => ({
    length: dimensions!.width,
    offset: dimensions!.width * index,
    index,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setDimensions(event.nativeEvent.layout);
  };

  const getLayoutParams = (e: any) => {
    const layoutWidth = e.nativeEvent.layoutMeasurement.width;
    const offsetX = e.nativeEvent.contentOffset.x;
    const listItemIndex = Math.round(offsetX / layoutWidth);

    return { layoutWidth, offsetX, listItemIndex };
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { listItemIndex } = getLayoutParams(e);

    if (calendar != null && listItemIndex % 1 === 0) {
      if (listItemIndex < index) {
        setIndex((prev) => prev--);
      }

      if (listItemIndex > index) {
        setIndex((prev) => prev++);
      }

      const calendarHeader = {
        month: calendar[listItemIndex].name,
        year: calendar[listItemIndex].year,
      };
      changeMonthHeader(calendarHeader);
    }
  };

  const loadNewMonths = (nextMonths: boolean, month: number, year?: number) => {
    loadMyCalendar({ nextMonths, month, year });

    setDirection(null);
  };

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { offsetX } = getLayoutParams(e);
    setContentOffset(offsetX);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { listItemIndex } = getLayoutParams(e);

    // Check whether user has swapped to right or left (next or previous)
    if (contentOffset < e.nativeEvent.contentOffset.x) {
      if (direction === "next") {
        var month = calendar[listItemIndex].name;
        loadNewMonths(true, monthsByName[month]);
      }
      setDirection("next");
    }
    if (contentOffset > e.nativeEvent.contentOffset.x) {
      if (direction === "previous") {
        var month = calendar[listItemIndex].name;
        loadNewMonths(false, monthsByName[month]);
      }
      setDirection("previous");
    }
  };

  // Do not pass inline functions as props, as they will be recreated
  // on each component re-render (and slowing down the app)
  return (
    <View style={styles.container} onLayout={onLayout}>
      {dimensions ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          onScroll={onScroll}
          onScrollBeginDrag={onScrollBeginDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={500}
          initialScrollIndex={2}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={10}
          showsHorizontalScrollIndicator={false}
          keyboardDismissMode={"on-drag"}
          horizontal
          pagingEnabled
          removeClippedSubviews
        />
      ) : (
        <ActivityIndicator
          color={Colors.primary.s200}
          style={styles.loadingIndicator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loadingIndicator: {
    flex: 1,
  },
});
