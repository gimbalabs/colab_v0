import { SubHeaderText } from "components/rnWrappers/subHeaderText";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "styles/index";

interface EventLine {
  content: string;
  icon?: React.ReactNode;
}

export interface EventConfirmationDetailProps {
  callbackFn?: (arg: string) => void;
  label: string;
  lineContent: EventLine;
}

export const EventConfirmationDetail = ({
  callbackFn,
  label,
  lineContent,
}: EventConfirmationDetailProps) => {
  const Icon = lineContent.icon;

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <SubHeaderText
          children={label}
          colors={[Colors.primary.s600, Colors.primary.s200]}
          customStyle={{ marginRight: "auto" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  headerContent: {
    flexDirection: "row",
    width: "100%",
  },
});
