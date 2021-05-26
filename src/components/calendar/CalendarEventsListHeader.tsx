import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { RemoveIcon } from "icons/index";
import { Buttons, Colors, Typography } from "styles/index";

export interface CalendarEventsListHeaderProps {
  onClosePress: () => void;
}

export const CalendarEventsListHeader = ({
  onClosePress,
}: CalendarEventsListHeaderProps) => {
  return (
    <View style={styles.dayPreviewBar}>
      <Text style={styles.dayPreviewBarText}>Upcoming events</Text>
      <Pressable
        onPress={onClosePress}
        style={Buttons.applyOpacity(styles.dayPreviewBarButton)}>
        <RemoveIcon height={18} width={18} stroke="#000" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dayPreviewBar: {
    width: "95%",
    marginTop: "2%",
    padding: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.neutral.s100,
  },
  dayPreviewBarText: {
    ...Typography.body.x10,
  },
  dayPreviewBarButton: {},
});
