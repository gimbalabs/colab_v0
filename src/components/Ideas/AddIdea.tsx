import React, { useState } from "react";
import {View, TextInput, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";


export default function AddIdea({ submitHandler }) {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} placeholder="Add an Idea..." onChangeText= 
         {onChangeText} />
      </View>
      <TouchableOpacity
        onPress={() => {
          setValue(submitHandler(value));
        }}
      >
        <Text style={styles.inputButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 2,
    },
    inputText: {
        fontSize: 20,
        margin: "auto",
        padding: 10,
        borderRadius: 10,
    },
    inputButton: {
        backgroundColor: "#05269f",
        color: "white",
        padding: 10,
        margin: 5,
    }
  });