import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import { appContext, bookingContext } from "contexts/contextApi";
import { EventConfirmationDetail } from "./EventConfirmationDetail";
import { AdaIcon, PresentationIcon, UserIcon } from "assets/icons";

export const EventConfirmationDetails = ({ navigation }: any) => {
  const { colorScheme } = appContext();
  const {
    previewingOrganizer,
    duration,
    durationCost,
    pickedDate,
    eventTitle,
  } = bookingContext();

  const isLightMode = colorScheme === "light";

  return (
    <View style={styles.container}>
      {eventTitle != null && (
        <EventConfirmationDetail
          label={"Event"}
          lineContent={{
            content: eventTitle,
            icon: SECTIONS_ICONS.eventTitle,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const iconStyles = StyleSheet.create({});

const SECTIONS_ICONS = {
  eventTitle: <PresentationIcon width={24} height={24} />,
  organizerAlias: <UserIcon {...iconStyles} />,
  eventDate: <UserIcon {...iconStyles} />,
  reservationTime: <UserIcon {...iconStyles} />,
  totalCost: <AdaIcon {...iconStyles} />,
};
