import * as React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  FlatListProps,
  ActivityIndicator,
} from "react-native";

import { appContext } from "contexts/contextApi";
import { getDigitalTime, getTime } from "lib/utils";
import { Colors } from "styles/index";

import { TransactionItem } from "./transactionItem";
import { transactions } from "../../api_data/transactions";

function wait(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export interface TransactionListProps {
  isSmallScreen: boolean;
  isLoading: boolean;
}

export const TransactionsList = ({
  isLoading,
  isSmallScreen,
}: TransactionListProps) => {
  const { colorScheme } = appContext();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = React.useState<number>(0);

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

  var flatListProps: FlatListProps<any> = {
    data: transactions,
    renderItem: renderItem,
    keyExtractor: keyExtractor,
    contentOffset: { x: 0, y: -25 },
  };

  if (!isSmallScreen) {
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
    <View style={[styles.container, isLoading ? { opacity: 0.5 } : {}]}>
      <FlatList
        {...flatListProps}
        scrollEnabled={!isLoading}
        disableScrollViewPanResponder={isLoading}
      />
      {isLoading && (
        <ActivityIndicator
          size={isSmallScreen ? "small" : "large"}
          color={Colors.primary.s800}
          style={styles.spinner}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10 },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
