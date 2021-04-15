import * as React from 'react';
import {useContext} from 'react';

import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalContext } from '../contexts/profileContext';

export function BioScreen({ navigation }) {
    // use the state in context
    const { 
      alias, setAlias,
    } = useContext(globalContext);
  
    // set the context state wth Hooks  
    // setAlias(_____)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.primary}>Create Profile</Text>
      <Text style={styles.detail}>
        My alias is {alias} and this will be a form that collects alias, time-block-size, time-block-cost, and optional URLs to more info and profile image.
      </Text>
      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="Profile"
          color="#05269f"
          // onPress={() => navigation.navigate('Home')} // currently points back to homescreen
        />
      </View>
      
      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="Back to Home"
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