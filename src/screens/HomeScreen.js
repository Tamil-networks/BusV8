import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import Footer from "../components/Footer";

export default function HomeScreen({ navigation }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ AUTO REFRESH
  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  // ======================================
  // 📥 LOAD USER
  // ======================================
  const loadUser = async () => {
    try {
      setLoading(true);

      const data = await AsyncStorage.getItem("user");

      console.log("📦 STORAGE USER:", data);

      if (data) {
        const parsedUser = JSON.parse(data);

        console.log("✅ HOME USER:", parsedUser);

        setUser(parsedUser);
      } else {
        console.log("❌ No user found in storage");
      }

    } catch (err) {
      console.log("❌ User load error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // ⏳ LOADING
  // ======================================
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
  <View style={styles.container}>

    {/* CONTENT */}
    <View style={{ flex: 1, paddingBottom: 80 }}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logoText}>
          BusV8
        </Text>

        <Image
          source={require("../../assets/bus.png")}
          style={styles.logo}
        />
      </View>

      {/* WELCOME */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>
          Welcome, {user?.name || "Student"}
        </Text>

        <Text style={styles.welcomeSub}>
          Ready for your commute?
        </Text>
      </View>

      {/* FROM TO */}
      <View style={styles.routeContainer}>

        <View style={styles.routeCard}>
          <Image
            source={require("../../assets/green-bg.jpg")}
            style={styles.routeBg}
          />

          <View style={styles.routeOverlay}>
            <Text style={styles.fromTitle}>
              From
            </Text>

            <Text style={styles.routeText}>
              {user?.boardingPoint || "Boarding Point"}
            </Text>
          </View>
        </View>

        <Text style={styles.arrow}>
          ➜
        </Text>

        <View style={styles.routeCard}>
          <Image
            source={require("../../assets/green-bg.jpg")}
            style={styles.routeBg}
          />

          <View style={styles.routeOverlay}>
            <Text style={styles.toTitle}>
              To
            </Text>

            <Text style={styles.routeText}>
              {user?.college || "College"}
            </Text>
          </View>
        </View>

      </View>

      {/* COLLEGE NAME */}
      <Text style={styles.collegeName}>
        {user?.college || "College Name"}
      </Text>

      {/* BUS CIRCLE */}
      <View style={styles.busCircle}>

        <Text style={styles.busLabel}>
          Bus No.
        </Text>

        <Text style={styles.busNumber}>
          {user?.busNumber || "--"}
        </Text>

      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.findButton}
        onPress={() => navigation.navigate("Map")}
      >
        <Text style={styles.findButtonText}>
          Find My Bus
        </Text>
      </TouchableOpacity>

    </View>

    {/* FOOTER */}
    <Footer
      navigation={navigation}
      active="Home"
    />

  </View>
);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F2",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
    paddingHorizontal: 10,
  },

  logoText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#007A14",
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  welcomeContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },

  welcomeTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  welcomeSub: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
  },

  routeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 45,
    paddingHorizontal: 4,
  },

  routeCard: {
    width: 160,
    height: 88,
    borderRadius: 14,
    overflow: "hidden",
  },

  routeBg: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  routeOverlay: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },

  fromTitle: {
    color: "#FFFF00",
    fontWeight: "700",
    fontSize: 24,
  },

  toTitle: {
    color: "#FFFF00",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "right",
  },

  routeText: {
    color: "#fff",
    fontSize: 14,
  },

  arrow: {
    fontSize: 34,
    fontWeight: "700",
  },

  collegeName: {
    textAlign: "center",
    marginTop: 55,
    fontSize: 22,
    fontWeight: "500",
    color: "#111",
    paddingHorizontal: 15,
  },

  busCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#007A14",
    alignSelf: "center",
    marginTop: 18,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1.5,
    borderColor: "#000",
  },

  busLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  busNumber: {
    color: "#E8FF00",
    fontSize: 48,
    fontWeight: "700",
    marginTop: 4,
  },

  findButton: {
    marginTop: 35,
    marginHorizontal: 16,

    backgroundColor: "#0B7B1B",

    borderRadius: 35,

    height: 66,

    justifyContent: "center",
    alignItems: "center",
  },

  findButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

});