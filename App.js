import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import PlanetsScreen from "./screens/PlanetsScreen";
import SpaceshipsScreen from "./screens/SpaceshipsScreen";
import FilmsScreen from "./screens/FilmsScreen";
import SpaceshipDetailScreen from "./screens/SpaceshipDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Planets" component={PlanetsScreen} />
      <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
      <Tab.Screen name="Films" component={FilmsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeTabs" component={Tabs} />
          <Stack.Screen name="SpaceshipDetail" component={SpaceshipDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
