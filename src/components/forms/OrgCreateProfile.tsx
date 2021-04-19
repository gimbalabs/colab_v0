import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";

export default function OrgCreateProfile() {

    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState(null);

    return (
        <SafeAreaView style={styles.formBox}>
            <Text style={styles.inputLabel}>
                Alias
            </Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="What should we call you?"
            />
            <Text style={styles.inputLabel}>
                Time block length
            </Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="minutes"
            keyboardType="numeric"
            />
            <Text style={styles.inputLabel}>
                Time block cost
            </Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="ADA"
            keyboardType="numeric"
            />
            <Text style={styles.inputLabel}>
                Personal URL
            </Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Share a personal URL here"
            />
            <Text style={styles.inputLabel}>
                Personal Image
            </Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Share an image here"
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    formBox: {
        borderWidth: 1,
        backgroundColor: "#fff0d2",
        marginTop: 20,
        padding: 20,
        width: "80%",
    },
    input: {
      height: 40,
      width: "90%",
      marginHorizontal: "auto",
      borderWidth: 1,
      padding: 5,
    },
    inputLabel: {
        paddingVertical: 10,
    }
});
