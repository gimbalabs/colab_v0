import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";
import { Input } from "react-native-elements"
import { globalContext } from "contexts/profileContext";

export default function OrgCreateProfile() {
    const { alias , setAlias } = useContext(globalContext);
    const { aboutURL , setAboutURL } = useContext(globalContext);
    const { imageURL , setImageURL } = useContext(globalContext);
    const { timeBlockCostADA, setTimeBlockCostADA } = useContext(globalContext);
    const { timeBlockLengthMin , setTimeBlockLengthMin } = useContext(globalContext);


    return (
        <SafeAreaView style={styles.formBox}>
            <Text style={styles.inputLabel}>
                Alias
            </Text>
            <TextInput
            style={styles.input}
            onChangeText={setAlias}
            value={alias}
            placeholder={alias}
            />
            <Text style={styles.inputLabel}>
                Time block length
            </Text>
            <Input
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setTimeBlockLengthMin}
            />
            <Text style={styles.inputLabel}>
                Time block cost
            </Text>
            <Input
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setTimeBlockCostADA}
            />
            <Text style={styles.inputLabel}>
                Personal URL
            </Text>
            <TextInput
            style={styles.input}
            onChangeText={setAboutURL}
            value={aboutURL}
            placeholder="Share a personal URL here"
            />
            <Text style={styles.inputLabel}>
                Personal Image
            </Text>
            <TextInput
            style={styles.input}
            onChangeText={setImageURL}
            value={imageURL}
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
