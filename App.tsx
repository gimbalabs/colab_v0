import * as React from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  {ContextProvider}  from './src/contexts/profileContext';

import { RegisterScreen } from './src/screens/Register';
import { BioScreen } from './src/screens/AddBio';
import { IdeasScreen } from './src/screens/AddIdea';
import { greaterThan } from 'react-native-reanimated';

function OrganizerScreen({ navigation }) {
  return (
    <ContextProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.primary}>Organizer</Text>
        <Text style={styles.primary}>Cºl⍺b</Text>

        <View style={[{ width: "50%", margin: 10 }]}>
          <Button
          title="1: Register as Organizer"
          onPress={() => navigation.navigate('Register Id')}
          color="#05269f"
          />
        </View>
        
        <View style={[{ width: "50%", margin: 10 }]}>
          <Button
          title="2: Add Profile"
          onPress={() => navigation.navigate('Add Bio')}
          color="#05269f"
          />
        </View>
        
        <View style={[{ width: "50%", margin: 10 }]}>
          <Button
          title="3: Add Ideas"
          onPress={() => navigation.navigate('Add Ideas')}
          color="#05269f"
          />
        </View>
      </View>
    </ContextProvider>  
  );
}
    
    const Stack = createStackNavigator();
    
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Organizer" component={OrganizerScreen} />
        <Stack.Screen name="Register Id" component={RegisterScreen} />
        <Stack.Screen name="Add Bio" component={BioScreen} />
        <Stack.Screen name="Add Ideas" component={IdeasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  primary: {
    fontSize: 30,
    margin: 20,
  },
});


export default App;