import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import axios from "axios";

import {
  Feather,
} from "@expo/vector-icons";

const BASE_URL =
  "https://bus-backend-3pi1.onrender.com/api/driver";

export default function DriverCodeScreen({
  navigation,
}) {

  const [code, setCode] =
    useState("");

  const handleVerify = async () => {

    try {

      const res =
        await axios.post(
          `${BASE_URL}/verify-code`,
          {
            code,
          }
        );

      if (res.data.success) {

        Alert.alert(
          "Success",
          "Driver Code Verified"
        );

        navigation.navigate(
          "DriverRegister"
        );

      }

    } catch (err) {

      console.log(
        err.response?.data || err
      );

      Alert.alert(
        "Invalid",
        "Invalid Driver Secret Code"
      );
    }
  };

  return (

    <View style={styles.container}>

      {/* LOGO */}
      <Image
        source={require("../../assets/bus.png")}
        style={styles.logo}
      />

      {/* CARD */}
      <View style={styles.card}>

        <Feather
          name="users"
          size={40}
          color="#000"
        />

        <Text style={styles.title}>
          Driver Registration
        </Text>

        <Text style={styles.description}>
          Please enter your unique driver
          secret code to verify your
          identity !
        </Text>

        <Text style={styles.label}>
          Driver Secret Code
        </Text>

        {/* INPUT */}
        <View style={styles.inputBox}>

          <TextInput
            style={styles.input}
            secureTextEntry
            value={code}
            onChangeText={setCode}
            placeholder="••••••••"
            placeholderTextColor="#666"
          />

        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerify}
        >

          <Text style={styles.buttonText}>
            Verify Code
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,

    backgroundColor: "#F5F7F5",
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 50,
  },

  card: {
    width: "92%",

    backgroundColor: "#fff",

    borderRadius: 35,

    paddingVertical: 35,
    paddingHorizontal: 30,

    alignItems: "center",

    elevation: 5,
  },

  title: {
    marginTop: 15,

    fontSize: 34,
    fontWeight: "bold",

    color: "#000",
  },

  description: {
    marginTop: 15,

    textAlign: "center",

    fontSize: 18,

    color: "#444",

    lineHeight: 28,
  },

  label: {
    marginTop: 40,

    fontSize: 22,

    color: "#000",

    fontWeight: "500",
  },

  inputBox: {
    marginTop: 20,

    width: "100%",

    height: 60,

    borderRadius: 18,

    backgroundColor: "#E8E8E8",

    justifyContent: "center",

    paddingHorizontal: 20,
  },

  input: {
    textAlign: "center",

    fontSize: 24,

    letterSpacing: 4,

    color: "#000",
  },

  button: {
    marginTop: 40,

    width: "100%",

    height: 60,

    backgroundColor: "#007A12",

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",

    fontSize: 22,

    fontWeight: "bold",
  },

});