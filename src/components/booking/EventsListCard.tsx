import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { applyOpacity } from "../../styles/colors";
import { getEventCardDate } from "lib/utils";

export interface EventsListCardProps {
  title: string;
  description: string;
  fromDate: number;
  toDate: number;
  image: any;
  color: string;
}

export const EventsListCard = ({
  title,
  description,
  fromDate,
  toDate,
  image,
  color,
}: EventsListCardProps) => {
  const navigation = useNavigation();
  const getEventDate = () => {};

  const onCardPress = () => {
    return navigation.navigate("Event Description", {
      title,
      description,
      fromDate,
      toDate,
      image,
      color,
    });
  };

  return (
    <Pressable onPress={onCardPress} style={{ flex: 1 }}>
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
            <Text style={styles.dateCardText}>
              {getEventCardDate(fromDate, toDate)}
            </Text>
          </View>
          <Text style={styles.eventTitle}>{title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
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
