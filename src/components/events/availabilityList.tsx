import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { eventCreationContext } from "contexts/contextApi";
import { getRandomKey } from "lib/utils";
import { EventAvailability } from "common/interfaces/newEventInterface";
import { Availability } from "./availability";

export interface AvailabilityListProps {}

export const AvailabilityList = ({}: AvailabilityListProps) => {
  const { availabilities } = eventCreationContext();

  const renderAvailabilities = ({ item }: { item: EventAvailability }) => (
    <Availability availability={item} />
  );

  const keyExtractor = (item: any, index: number) => `${getRandomKey(index)}`;

  return (
    <View style={styles.container}>
      <FlatList
        data={availabilities}
        renderItem={renderAvailabilities}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ marginTop: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
});
