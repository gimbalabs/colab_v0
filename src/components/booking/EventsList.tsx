import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

//@ts-ignore
import SummerImg from "../../assets/images/summer.jpeg";
//@ts-ignore
import FallImg from "../../assets/images/fall.jpg";

import { events } from "../../api_data/events";
import { EventsListCard } from "./EventsListCard";

export interface EventsListProps {}

export const EventsList = ({}: EventsListProps) => {
  const renderEventCard = ({ item }: any) => {
    const { title, description, fromDate, toDate, image, color } = item;

    const imageSrc = image === "Fall" ? FallImg : SummerImg;

    return (
      <EventsListCard
        title={title}
        description={description}
        fromDate={fromDate}
        toDate={toDate}
        image={imageSrc}
        color={color}
      />
    );
  };

  const keyExtractor = (item, index) => item.title + index;

  return (
    <FlatList
      style={{ flex: 1 }}
      data={[...events, ...events]}
      renderItem={renderEventCard}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
});
