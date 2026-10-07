import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Footer({
  navigation,
  active = "Home",
}) {
  return (
    <View style={styles.footer}>

      {/* HOME */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons
          name="home"
          size={28}
          color={active === "Home" ? "#007A14" : "#555"}
        />

        <Text
          style={[
            styles.label,
            active === "Home" && styles.activeLabel,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* MAP */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Map")}
      >
        <Ionicons
          name="map-outline"
          size={28}
          color={active === "Map" ? "#007A14" : "#555"}
        />

        <Text
          style={[
            styles.label,
            active === "Map" && styles.activeLabel,
          ]}
        >
          Map
        </Text>
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons
          name="person-outline"
          size={28}
          color={active === "Profile" ? "#007A14" : "#555"}
        />

        <Text
          style={[
            styles.label,
            active === "Profile" && styles.activeLabel,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>

      {/* SETTINGS */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          name="settings-outline"
          size={28}
          color={active === "Settings" ? "#007A14" : "#555"}
        />

        <Text
          style={[
            styles.label,
            active === "Settings" && styles.activeLabel,
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#D8D8D8",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    marginTop: 4,
    fontSize: 13,
    color: "#555",
  },

  activeLabel: {
    color: "#007A14",
    fontWeight: "700",
  },

});