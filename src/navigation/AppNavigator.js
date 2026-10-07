import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import DriverCodeScreen from "../screens/DriverCodeScreen";
import DriverRegisterScreen from "../screens/DriverRegisterScreen";
import DriverHomeScreen from "../screens/DriverHomeScreen";
import Permission from "../screens/PermissionScreen";
import Home from "../screens/HomeScreen";
import Map from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const permission = await AsyncStorage.getItem("permissionDone");

      if (!userData) {
        // New user
        setInitialRoute("Login");
      } else {
        const user = JSON.parse(userData);

        if (user.role === "driver") {
          // Existing driver
          setInitialRoute("DriverHome");
        } else if (!permission) {
          // Student but permission not completed
          setInitialRoute("Permission");
        } else {
          // Existing student with permission completed
          setInitialRoute("Home");
        }
      }
    } catch (err) {
      console.log("❌ Navigator Error:", err);
      setInitialRoute("Login");
    }
  };

  // Wait until AsyncStorage check is completed
  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen
          name="Register"
          component={Register}
        />

        <Stack.Screen
          name="DriverCode"
          component={DriverCodeScreen}
        />

        <Stack.Screen
          name="DriverRegister"
          component={DriverRegisterScreen}
        />

        <Stack.Screen
          name="DriverHome"
          component={DriverHomeScreen}
        />

        <Stack.Screen
          name="Permission"
          component={Permission}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="Map"
          component={Map}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}