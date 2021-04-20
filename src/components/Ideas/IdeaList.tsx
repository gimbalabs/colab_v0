import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IdeaList({ item }) {
    return (
        <View>
            <Text style={styles.ideaItem}>{item.value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    ideaItem: {
        backgroundColor: "#05269f",
        width: 300,
        padding: 10,
        margin: 10,
        color: "white",
    }
  });