import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";

export default function SettingsScreen({ navigation }) {

  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
     loadUser();
    }, [])
  );

  const loadUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");

      if (data) {
        setUser(JSON.parse(data));
      }
  } catch (err) {
    console.log("User load error:", err);
  }
};

  // ================================
  // 🔐 LOGOUT FUNCTION
  // ================================
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("user");

              console.log("✅ Logged out");

              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });

            } catch (err) {
              console.log("Logout error:", err);
            }
          },
        },
      ]
    );
  };

  return (
  <View style={styles.container}>

    {/* HEADER */}
    <View style={styles.header}>
      <Text style={styles.title}>
        Settings
      </Text>

      <Image
        source={require("../../assets/bus.png")}
        style={styles.logo}
      />
    </View>

    <Text style={styles.subtitle}>
      Manage your account
    </Text>

    {/* PROFILE CARD */}
    <View style={styles.profileCard}>

      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>
          👤
        </Text>
      </View>

      <Text style={styles.userName}>
        {user?.name || "Student"}
      </Text>

    </View>

    {/* LOGOUT CARD */}
    <TouchableOpacity
      style={styles.logoutCard}
      onPress={handleLogout}
    >
      <Text style={styles.logoutText}>
        ↪ Logout
      </Text>
    </TouchableOpacity>

    {/* FOOTER */}
    <Footer
      navigation={navigation}
      active="Settings"
    />

  </View>
);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F2",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  subtitle: {
    marginLeft: 22,
    marginTop: 10,
    fontSize: 15,
    color: "#4E564E",
  },

  profileCard: {
    marginTop: 35,
    marginHorizontal: 18,
    height: 102,

    backgroundColor: "#E8EEE7",

    borderWidth: 1,
    borderColor: "#B7C2B6",

    borderRadius: 20,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,
  },

  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#FFF",

    borderWidth: 3,
    borderColor: "#000",

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 22,
  },

  userName: {
    marginLeft: 18,
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  logoutCard: {
    marginTop: 60,
    marginHorizontal: 18,

    height: 56,

    borderWidth: 1,
    borderColor: "#F1B9B9",

    backgroundColor: "#FFF",

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#D92C20",
    fontSize: 18,
    fontWeight: "700",
  },
});