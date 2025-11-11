import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// --- Screens ---
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi! Welcome to Adam's Star Wars App!</Text>
      <Text style={styles.subText}>
        Click the tabs below to explore the Planets, Films, and Spaceships featured in the starwars movies.
      </Text>
    </View>
  );
}
//Plan on seperating these out into diff tabs
function PlanetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🌍 Planets Screen</Text>
    </View>
  );
}
//Plan on seperating these out into diff tabs
function FilmsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎬 Films Screen</Text>
    </View>
  );
}
//Plan on seperating these out into diff tabs
function SpaceshipsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚀 Spaceships Screen</Text>
    </View>
  );
}

// --- NAV ---
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  if (Platform.OS === 'web' || Platform.OS === 'ios') {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#FFE81F',
          tabBarStyle: { backgroundColor: '#000' },
          tabBarActiveTintColor: '#FFE81F',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Planets" component={PlanetsScreen} />
        <Tab.Screen name="Films" component={FilmsScreen} />
        <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
      </Tab.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#FFE81F',
          drawerStyle: { backgroundColor: '#000' },
          drawerActiveTintColor: '#FFE81F',
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Planets" component={PlanetsScreen} />
        <Drawer.Screen name="Films" component={FilmsScreen} />
        <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
      </Drawer.Navigator>
    );
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // vertical center
    alignItems: 'center',      // horizontal center
    backgroundColor: '#000',
    padding: 16,
  },
  text: {
    fontSize: 24,
    color: '#FFE81F', // Star Wars yellow
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#FFE81F',
    textAlign: 'center',
  },
});
