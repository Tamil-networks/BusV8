import {
  DRIVER_TASK,
} from "../services/driverBackgroundLocation";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

import { colleges } from "../config/colleges";
import { busNumbers } from "../config/busNumbers";

export default function DriverHomeScreen() {

  const [driver, setDriver] = useState(null);

  const [college, setCollege] = useState("");
  const [busNumber, setBusNumber] = useState("");

  const [sharing, setSharing] = useState(false);

  

  useEffect(() => {
    loadDriver();
  }, []);
  useEffect(() => {

  checkTracking();

  }, []);

const checkTracking = async () => {
  try {
    const running =
      await Location.hasStartedLocationUpdatesAsync(
        DRIVER_TASK
      );

    setSharing(running);

  } catch (err) {
    console.log(
      "❌ Check Tracking Error:",
      err
    );
  }
};

const loadDriver = async () => {
  try {

    const data =
      await AsyncStorage.getItem("user");

    if (data) {

      const user =
        JSON.parse(data);

      setDriver(user);

      setCollege(
        user.college || ""
      );

      setBusNumber(
        user.busNumber || ""
      );
    }

  } catch (err) {

    console.log(
      "❌ Driver Load Error:",
      err
    );
  }
};

const startSharing = async () => {

  try {

    const fg =
      await Location.requestForegroundPermissionsAsync();

    if (
      fg.status !== "granted"
    ) {

      Alert.alert(
        "Permission Required",
        "Foreground Location Permission Needed"
      );

      return;
    }

    const bg =
      await Location.requestBackgroundPermissionsAsync();

    if (
      bg.status !== "granted"
    ) {

      Alert.alert(
        "Permission Required",
        "Background Location Permission Needed"
      );

      return;
    }

    const alreadyRunning =
      await Location.hasStartedLocationUpdatesAsync(
        DRIVER_TASK
      );

    if (alreadyRunning) {

      Alert.alert(
        "Location Sharing",
        "Already Running"
      );

      return;
    }

    await Location.startLocationUpdatesAsync(
      DRIVER_TASK,
      {
        accuracy:
          Location.Accuracy.High,

        timeInterval: 10000,

        distanceInterval: 10,

        foregroundService: {
          notificationTitle:
            "BusV8 Driver Tracking",

          notificationBody:
            "Sharing location in background",
        },

        pausesUpdatesAutomatically:
          false,

        showsBackgroundLocationIndicator:
          true,
      }
    );

    setSharing(true);

    Alert.alert(
      "Success",
      "Location Sharing Started"
    );

  } catch (err) {

    console.log(
      "❌ Start Sharing Error:",
      err
    );
  }
};

const stopSharing = async () => {

  try {

    const running =
      await Location.hasStartedLocationUpdatesAsync(
        DRIVER_TASK
      );

    if (running) {

      await Location.stopLocationUpdatesAsync(
        DRIVER_TASK
      );
    }

    setSharing(false);

    Alert.alert(
      "Stopped",
      "Location Sharing Stopped"
    );

  } catch (err) {

    console.log(
      "❌ Stop Sharing Error:",
      err
    );
  }
};
const handleSave = async () => {

  try {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        "https://bus-backend-3pi1.onrender.com/api/users/update",
        {
          college,
          busNumber,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const updatedUser =
      response.data.user;

    setDriver(
      updatedUser
    );

    await AsyncStorage.setItem(
      "user",
      JSON.stringify(
        updatedUser
      )
    );

    Alert.alert(
      "Success",
      "Changes Saved Successfully"
    );

  } catch (err) {

    console.log(
      "❌ Save Error:",
      err.response?.data || err
    );

    Alert.alert(
      "Error",
      "Failed To Save Changes"
    );
  }
};

  return (
   <ScrollView
     style={styles.container}
     contentContainerStyle={{
        paddingBottom: 40,
    }}
    showsVerticalScrollIndicator={false}
   >

  {/* HEADER */}
  <View style={styles.header}>
    <Text style={styles.appName}>BusV8</Text>

    <Image
      source={require("../../assets/bus.png")}
      style={styles.logo}
    />
  </View>

  {/* DRIVER CARD */}
  <View style={styles.driverCard}>

    <View style={styles.avatarCircle}>
      <Ionicons
        name="person-outline"
        size={32}
        color="#2E7D32"
      />
    </View>

    <View style={styles.driverInfo}>
      <Text style={styles.welcomeText}>
        Welcome back,
      </Text>

      <Text style={styles.driverName}>
        {driver?.name || "Driver"}
      </Text>
    </View>

    <View style={styles.statusBox}>
      <Text style={styles.statusLabel}>
        Current Status
      </Text>

      <Text style={styles.statusText}>
        {sharing
          ? "🟢 ACTIVE"
          : "⚪ INACTIVE"}
      </Text>
    </View>

  </View>

  {/* START SHARING */}
  <TouchableOpacity
    style={styles.startButton}
    onPress={startSharing}
  >
    <Ionicons
      name="radio-outline"
      size={38}
      color="#fff"
    />

    <Text style={styles.startText}>
      Start Location Sharing
    </Text>
  </TouchableOpacity>

  {/* STOP SHARING */}
  <TouchableOpacity
    style={styles.stopButton}
    onPress={stopSharing}
  >
    <Ionicons
      name="radio-outline"
      size={38}
      color="#D32F2F"
    />

    <Text style={styles.stopText}>
      Stop Location Sharing
    </Text>
  </TouchableOpacity>

  {/* SHIFT SETTINGS */}
  <Text style={styles.shiftTitle}>
    ⚙ Shift Settings
  </Text>

  {/* COLLEGE */}
  <Text style={styles.label}>
    Assigned College
  </Text>

  <View style={styles.pickerBox}>
    <Picker
      selectedValue={college}
      dropdownIconColor="black"
      style={{
       color: "black",
       height: 55,
      }}
      onValueChange={(value) =>
        setCollege(value)
      }
    >
      <Picker.Item
        label="Select College"
        value=""
      />

      {colleges.map((item) => (
        <Picker.Item
          key={item}
          label={item}
          value={item}
        />
      ))}
    </Picker>
  </View>

  {/* BUS NUMBER */}
  <Text style={styles.label}>
    Change Bus Number
  </Text>

  <View style={styles.pickerBox}>
    <Picker
      selectedValue={busNumber}
      dropdownIconColor="black"
      style={{
       color: "black",
       height: 55,
      }}
      onValueChange={(value) =>
        setBusNumber(value)
      }
    >
      <Picker.Item
        label="Change Bus Number"
        value=""
      />

      {(busNumbers[college] || []).map(
        (item) => (
          <Picker.Item
            key={item}
            label={item}
            value={item}
          />
        )
      )}
    </Picker>
  </View>

  {/* SAVE */}
  <TouchableOpacity
    style={styles.saveButton}
    onPress={handleSave}
  >
    <Text style={styles.saveText}>
      Save Changes
    </Text>
  </TouchableOpacity>

  {/* FOOTER */}
  <Text style={styles.footerText}>
    🛡 Authorized Transit Personnel Access Only
  </Text>

</ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7F9",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1B5E20",
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  driverCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DADADA",
    elevation: 4,
  },

  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#A5D6A7",
    justifyContent: "center",
    alignItems: "center",
  },

  driverInfo: {
    flex: 1,
    marginLeft: 15,
  },

  welcomeText: {
    color: "#666",
    fontSize: 16,
  },

  driverName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },

  statusBox: {
    alignItems: "center",
  },

  statusLabel: {
    fontSize: 13,
    color: "#555",
  },

  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },

  startButton: {
    marginTop: 18,
    backgroundColor: "#007A14",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    elevation: 3,
  },

  startText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },

  stopButton: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },

  stopText: {
    color: "#D32F2F",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },

  shiftTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 28,
    marginBottom: 18,
    color: "#212121",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#424242",
    marginBottom: 8,
    marginTop: 10,
  },

  pickerBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
    marginBottom: 14,
  },

  saveButton: {
    backgroundColor: "#007A14",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 25,
    elevation: 3,
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  footerText: {
    textAlign: "center",
    marginTop: 25,
    color: "#4B5B4B",
    fontWeight: "500",
    fontSize: 13,
    marginBottom: 20,
  },

});