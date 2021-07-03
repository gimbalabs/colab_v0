import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { AvailableTimeSlot } from "components/lists/availabilitiesScreen/AvailableTimeSlot";

export interface AvailableTimesListProps {
  availabilities: any;
}

export const AvailableTimesList = ({
  availabilities,
}: AvailableTimesListProps) => {
  const renderItem = ({ item }) => {
    return <AvailableTimeSlot time={100} />;
  };

  const keyExtractor = (item, index) => `${item.time}_${index}`;

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={availabilities}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
