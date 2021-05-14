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

import { MyCalendarContext } from "contexts/myCalendarContext";
import { Colors, Outlines, Typography, Buttons } from "styles";
import { getSixMonthsWithDays } from "lib/utils";
import { MonthItem } from "./MonthItem";
import { Month } from "interfaces/myCalendarInterface";
import { months } from "common/types/calendarTypes";

export const MonthlyWrapper = () => {
  const { state, dispatch } = React.useContext(MyCalendarContext);
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );
  React.useEffect(() => {
    setCalendar();
  }, []);

  const setCalendar = () => {
    const nextSixMonths = getSixMonthsWithDays(true);
    const previousSixMonths = getSixMonthsWithDays(false, true);

    dispatch({
      type: "LOAD_MY_CALENDAR",
      payload: { calendar: [...previousSixMonths, ...nextSixMonths] },
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <MonthItem
        days={item.days}
        year={item.year}
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
    if (state.calendar != null && listItemIndex % 1 === 0) {
      dispatch({
        type: "CHANGE_MONTH_HEADER",
        payload: {
          calendarHeader: {
            month: state.calendar[listItemIndex].name,
            year: state.calendar[listItemIndex].year,
          },
        },
      });
    }
  };

  // Do not pass inline functions as props, as they will be reacreated
  // on each component re-render (slowing down the app)
  return (
    <View style={styles.container} onLayout={onLayout}>
      {dimensions ? (
        <FlatList
          data={state.calendar}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          initialScrollIndex={state.calendar?.findIndex(
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
