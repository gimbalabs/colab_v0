import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.primary}>Register</Text>
      <Text style={styles.detail}>
        On this page, ORGANIZER will engage with AUTH MECHANISM to create REGISTRATION TOKEN
      </Text>
      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="Create Organizer Profile"
          // onPress={() => navigation.navigate('Home')} // currently points back to homescreen
          color="#05269f"
        />
      </View>
      
      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="Go back to home"
          onPress={() => navigation.popToTop()}
          color="#05269f"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  primary: {
    fontSize: 30,
    margin: 20,
  },
  detail: {
    fontSize: 15,
    margin: 25,
  }
});