import { appContext } from "contexts/contextApi";
import * as React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import { Colors, Sizing, Typography } from "styles/index";
import { HorizontalCardItem } from "./HorizontalCardItem";
import { HorizontalProfileCardItem } from "./HorizontalProfileCardItem";

export interface HorizontalCardsListProps {
  list: any;
}

export const HorizontalCardsList = ({ list }: HorizontalCardsListProps) => {
  const { colorScheme } = appContext();
  const keyExtractor = (item: any, index: number) =>
    `${item.title}-${index}-${item.type}`;

  const renderItem = ({ item }: any) => {
    console.log(item);
    if (item.type === "categories") {
      return <HorizontalCardItem item={item} />;
    }
    if (item.type === "profiles") {
      return <HorizontalProfileCardItem item={item} />;
    }
    return <></>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={
            colorScheme === "light"
              ? styles.headerTitle_light
              : styles.headerTitle_dark
          }>
          {list.title}
        </Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={renderItem}
          maxToRenderPerBatch={10}
          keyExtractor={keyExtractor}
          horizontal
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: Sizing.x20,
  },
  header: {
    alignSelf: "flex-start",
    marginLeft: Sizing.x30,
  },
  headerTitle_light: {
    ...Typography.header.x35,
    color: Colors.primary.s800,
  },
  headerTitle_dark: {
    ...Typography.header.x35,
    color: Colors.primary.neutral,
  },
  listContainer: {
    width: "100%",
    height: "100%",
  },
});
