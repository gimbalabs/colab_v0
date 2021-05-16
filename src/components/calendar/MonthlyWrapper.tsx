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
import { Colors, Outlines, Typography, Buttons } from "styles";
import { MonthItem } from "./MonthItem";
import { Month } from "interfaces/myCalendarInterface";
import { months } from "common/types/calendarTypes";

export const MonthlyWrapper = () => {
  const { calendar, changeMonthHeader } = myCalendarContext();
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );

  const data = React.useMemo(() => {
    return calendar;
  }, [calendar]);

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

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const layoutWidth = e.nativeEvent.layoutMeasurement.width;
    const offsetX = e.nativeEvent.contentOffset.x;
    const listItemIndex = offsetX / layoutWidth;
    if (calendar != null && listItemIndex % 1 === 0) {
      const calendarHeader = {
        month: calendar[listItemIndex].name,
        year: calendar[listItemIndex].year,
      };
      changeMonthHeader(calendarHeader);
    }
  };

  // Do not pass inline functions as props, as they will be reacreated
  // on each component re-render (slowing down the app)
  return (
    <View style={styles.container} onLayout={onLayout}>
      {dimensions ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          initialScrollIndex={calendar?.findIndex(
            (month) => month.name === months[new Date().getMonth()]
          )}
          onScroll={onScroll}
          scrollEventThrottle={500}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={10}
          showsHorizontalScrollIndicator={false}
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
