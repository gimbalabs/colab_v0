import { getDate, getMonthName } from "lib/utils";
import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { applyOpacity } from "../../styles/colors";

export interface EventsListCardProps {
  title: string;
  fromDate: number;
  toDate: number;
  image: any;
  color: string;
}

export const EventsListCard = ({
  title,
  fromDate,
  toDate,
  image,
  color,
}: EventsListCardProps) => {
  const getEventDate = () => {
    let dateString = "";

    // if the events happens in the same month
    if (getMonthName(fromDate) === getMonthName(toDate)) {
      dateString +=
        getDate(fromDate) +
        "-" +
        getDate(toDate) +
        " " +
        getMonthName(fromDate).slice(0, 3);

      return dateString;
    }

    // if it's first day - only attach the month name (first 3 letters)
    if (getDate(fromDate) === 1) {
      dateString += getMonthName(fromDate).slice(0, 3);
    } else {
      dateString +=
        getMonthName(fromDate).slice(0, 3) + " " + getDate(fromDate);
    }

    // if it's first day - only attach the month name (first 3 letters)
    if (getDate(toDate) === 1) {
      dateString += " - " + getMonthName(toDate).slice(0, 3);
    } else {
      dateString +=
        " - " + getMonthName(toDate).slice(0, 3) + " " + getDate(toDate);
    }

    return dateString;
  };

  return (
    <ImageBackground
      imageStyle={styles.image}
      resizeMode="cover"
      source={image}
      style={styles.backgroundImage}>
      <View
        style={[
          styles.container,
          { backgroundColor: applyOpacity(color, 0.5) },
        ]}>
        <View
          style={[
            styles.dateCard,
            { backgroundColor: applyOpacity(color, 0.8) },
          ]}>
          <Text style={styles.dateCardText}>{getEventDate()}</Text>
        </View>
        <Text style={styles.eventTitle}>{title}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: Sizing.x120,
    marginVertical: Sizing.x10,
    ...Outlines.shadow.base,
  },
  image: {
    borderRadius: Outlines.borderRadius.base,
  },
  container: {
    width: "100%",
    height: "100%",
    padding: Sizing.x15,
    borderRadius: Outlines.borderRadius.base,
  },
  dateCard: {
    maxWidth: Sizing.x80,
    height: "auto",
    marginLeft: "auto",
    borderRadius: Outlines.borderRadius.small,
    ...Outlines.shadow.lifted,
  },
  dateCardText: {
    textAlign: "center",
    padding: Sizing.x5,
    ...Typography.header.x40,
    color: Colors.primary.neutral,
  },
  eventTitle: {
    maxWidth: "85%",
    marginTop: "auto",
    ...Typography.header.x50,
    color: Colors.primary.neutral,
  },
});
