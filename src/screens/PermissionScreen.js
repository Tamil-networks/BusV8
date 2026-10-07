import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { startBackgroundTracking } from "../services/locationService";

export default function PermissionScreen({ navigation }) {

  const handlePermission = async () => {
    try {
      // 📍 Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow location access to continue."
        );
        return;
      }

      // ✅ Save flag
      await AsyncStorage.setItem("permissionDone", "true");

      // 🚀 Start tracking
      await startBackgroundTracking();

      // 🔁 Navigate
      navigation.replace("Home");

    } catch (err) {
      console.log("❌ Permission Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Title */}
      <Text style={styles.title}>Enable Location</Text>

      {/* Description */}
      <Text style={styles.subtitle}>
        This app needs your location to track the bus in real-time.
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handlePermission}>
        <Text style={styles.buttonText}>Allow Location</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Light theme
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});