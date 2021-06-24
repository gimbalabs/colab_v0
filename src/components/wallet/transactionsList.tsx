import * as React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  LayoutChangeEvent,
  FlatListProps,
} from "react-native";

import { appContext } from "contexts/contextApi";
import { getDigitalTime, getTime } from "lib/utils";
import { Colors } from "styles/index";

import { TransactionItem } from "./transactionItem";
import { transactions } from "../../api_data/transactions";

function wait(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export const TransactionsList = () => {
  const { colorScheme } = appContext();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = React.useState<number>(0);
  const [layoutHeight, setLayoutHeight] = React.useState<any>(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      setLastRefreshed(getTime());
    });
  }, []);

  const renderItem = ({ item }: any) => <TransactionItem item={item} />;

  const refreshControlTitle = `Last updated: ${getDigitalTime(lastRefreshed)}`;

  // @TODO needs more scalable solution
  const keyExtractor = ({ date, withUser }: any) => `${date}-${withUser}`;

  const onLayout = (e: LayoutChangeEvent) =>
    setLayoutHeight(e.nativeEvent.layout.height);

  var flatListProps: FlatListProps<any> = {
    onLayout: onLayout,
    data: transactions,
    renderItem: renderItem,
    keyExtractor: keyExtractor,
  };

  if (layoutHeight && layoutHeight >= 300) {
    flatListProps.refreshControl = (
      <RefreshControl
        title={lastRefreshed ? refreshControlTitle : ""}
        tintColor={
          colorScheme === "light" ? Colors.primary.s600 : Colors.primary.neutral
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList {...flatListProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 25 },
});
