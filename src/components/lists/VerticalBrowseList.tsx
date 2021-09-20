import * as React from "react";
import { View, Text, StyleSheet, VirtualizedList } from "react-native";

import { useEventsPagination } from "lib/hooks/useEventsPagination";
import { getRandomKey } from "lib/utils";
import { useOrganizersPagination } from "lib/hooks/useOrganizersPagination";
import { VerticalOrganizerCardItem } from "./browseScreen/VerticalOrganizerCardItem";
import { VerticalEventCardItem } from "./browseScreen/VerticalEventCardItem";

interface Props {
  cardType: "Events" | "Organizers";
}

export const VerticalBrowseList = ({ cardType }: Props) => {
  const { events, setEventsPage, getEventsPaginated } = useEventsPagination();
  const { organizers, setOrganizersPage, getOrganizersPaginated } =
    useOrganizersPagination();

  const renderListItem = () => {
    switch (cardType) {
      case "Events": {
        return { data: events, item: VerticalEventCardItem };
      }
      case "Organizers":
        return { data: organizers, item: VerticalOrganizerCardItem };
      default:
        throw new Error(`Unknown card type: ${cardType}`);
    }
  };
  const renderItem = ({ item: any }) => {
    const Component: any = renderListItem().item;
    return <Component item={item} />;
  };

  const keyExtractor = (item: any, index: number) => getRandomKey(index + 1);
  const loadResults = () => {
    if (cardType === "Events") {
      getEventsPaginated();
    }
    if (cardType === "Organizers") {
      getOrganizersPaginated();
    }
  };
  const getItem = (data: any, index: number) => data[index];
  const getItemCount = (data: any) => data.length;

  return (
    <VirtualizedList
      data={renderListItem().data}
      renderItem={renderItem}
      getItem={getItem}
      getItemCount={getItemCount}
      keyExtractor={keyExtractor}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
