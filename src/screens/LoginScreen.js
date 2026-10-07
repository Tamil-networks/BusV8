import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const BASE_URL =
  "https://bus-backend-3pi1.onrender.com/api/auth";

export default function LoginScreen({ navigation }) {

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        `${BASE_URL}/login`,
        form
      );

      await AsyncStorage.setItem(
        "token",
        res.data.token
      );

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (
        res.data.user.role === "driver"
      ) {

        navigation.replace(
          "DriverHome"
        );

      } else {

        navigation.replace(
          "Permission"
        );
      }

    } catch (err) {

      Alert.alert(
        "Login Failed",
        err.response?.data?.message ||
        "Invalid Credentials"
      );
    }
  };

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerContainer}>

        <Image
          source={require("../../assets/bus.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>
          BusV8
        </Text>

        <Text style={styles.subtitle}>
          Your reliable campus transit partner
        </Text>

      </View>

      {/* LOGIN CARD */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Email or Username
        </Text>

        <View style={styles.inputContainer}>

          <Feather
            name="user"
            size={20}
            color="#808080"
          />

          <TextInput
            placeholder="Enter email or username"
            placeholderTextColor="#808080"
            style={styles.input}
            value={form.email}
            onChangeText={(v) =>
              handleChange("email", v)
            }
            autoCapitalize="none"
          />

        </View>

        <Text style={styles.label}>
          Password
        </Text>

        <View style={styles.inputContainer}>

          <Feather
            name="lock"
            size={20}
            color="#808080"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#808080"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={form.password}
            onChangeText={(v) =>
              handleChange(
                "password",
                v
              )
            }
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            <Feather
              name={
                showPassword
                  ? "eye"
                  : "eye-off"
              }
              size={20}
              color="#AAB3A0"
            />
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "ForgotPassword"
            )
          }
        >
          <Text style={styles.forgot}>
            Forgot password ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>
            Login
          </Text>
        </TouchableOpacity>

      </View>

      {/* STUDENT REGISTER */}
      <TouchableOpacity
        style={styles.registerCard}
        onPress={() =>
          navigation.navigate(
            "Register"
          )
        }
      >

        <FontAwesome5
          name="user-graduate"
          size={30}
          color="#000"
        />

        <View style={styles.cardText}>

          <Text style={styles.cardTitle}>
            Register as Student
          </Text>

          <Text style={styles.cardSubTitle}>
            Join the commute
          </Text>

        </View>

      </TouchableOpacity>

      {/* DRIVER REGISTER */}
      <TouchableOpacity
        style={styles.registerCard}
        onPress={() =>
          navigation.navigate(
            "DriverCode"
          )
        }
      >

        <MaterialCommunityIcons
          name="bus"
          size={32}
          color="#000"
        />

        <View style={styles.cardText}>

          <Text style={styles.cardTitle}>
            Register as Driver
          </Text>

          <Text style={styles.cardSubTitle}>
            Manage your route
          </Text>

        </View>

      </TouchableOpacity>

      {/* FOOTER */}
      <View style={styles.footer}>

        <MaterialCommunityIcons
          name="shield-check"
          size={18}
          color="#008000"
        />

        <Text style={styles.footerText}>
          Authorized Transit Personnel Access Only
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F8F5",
    paddingHorizontal: 15,
    paddingTop: 35,
  },

  headerContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007D12",
    marginTop: 10,
  },

  subtitle: {
    marginTop: 5,
    color: "#555",
    fontSize: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },

  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 15,
    paddingHorizontal: 12,
    height: 55,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
  },

  forgot: {
    textAlign: "center",
    color: "#008A1B",
    marginBottom: 20,
    fontSize: 15,
  },

  loginButton: {
    backgroundColor: "#007D12",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  registerCard: {
    backgroundColor: "#DDE3DE",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  cardText: {
    marginLeft: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  cardSubTitle: {
    color: "#666",
    marginTop: 2,
  },

  footer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#444",
  },

});