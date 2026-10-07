import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import axios from "axios";

import { Picker } from "@react-native-picker/picker";

import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { colleges } from "../config/colleges";
import { busNumbers } from "../config/busNumbers";

const BASE_URL =
  "https://bus-backend-3pi1.onrender.com/api/auth";

export default function DriverRegisterScreen({
  navigation,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    busNumber: "",
  });

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleRegister = async () => {
    try {
      const data = {
        ...form,
        role: "driver",
      };

      await axios.post(
        `${BASE_URL}/register`,
        data
      );

      alert(
        "Driver Registered Successfully ✅"
      );

      navigation.replace("Login");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Driver Registration
          </Text>

          <Image
            source={require("../../assets/bus.png")}
            style={styles.logo}
          />
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>
          {/* NAME */}
          <Text style={styles.label}>
            Driver Name
          </Text>

          <View style={styles.inputContainer}>
            <Feather
              name="user"
              size={20}
              color="#7D8772"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter driver name"
              placeholderTextColor="#000000"
              value={form.name}
              onChangeText={(v) =>
                handleChange("name", v)
              }
            />
          </View>

          {/* EMAIL */}
          <Text style={styles.label}>
            Email / Username
          </Text>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#7D8772"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter email or username"
              placeholderTextColor="#808080"
              value={form.email}
              autoCapitalize="none"
              onChangeText={(v) =>
                handleChange("email", v)
              }
            />
          </View>

          {/* PASSWORD */}
          <Text style={styles.label}>
            Password
          </Text>

          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={20}
              color="#7D8772"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#808080"
              secureTextEntry={!showPassword}
              value={form.password}
              onChangeText={(v) =>
                handleChange("password", v)
              }
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* COLLEGE */}
          <Text style={styles.label}>
            College / University
          </Text>

          <View style={styles.pickerContainer}>
            <MaterialCommunityIcons
              name="school-outline"
              size={22}
              color="#7D8772"
            />

            <Picker
              style={styles.picker}
              dropdownIconColor="#333"
              selectedValue={form.college}
              onValueChange={(value) =>
                handleChange(
                  "college",
                  value
                )
              }
            >
              <Picker.Item
                label="Select College"
                value=""
              />

              {colleges.map(
                (college) => (
                  <Picker.Item
                    key={college}
                    label={college}
                    value={college}
                  />
                )
              )}
            </Picker>
          </View>

          {/* BUS NUMBER */}
          <Text style={styles.label}>
            Bus Number
          </Text>

          <View style={styles.pickerContainer}>
            <MaterialCommunityIcons
              name="bus"
              size={22}
              color="#7D8772"
            />

            <Picker
              style={styles.picker}
              dropdownIconColor="#333"
              selectedValue={
                form.busNumber
              }
              onValueChange={(value) =>
                handleChange(
                  "busNumber",
                  value
                )
              }
            >
              <Picker.Item
                label="Select Bus Number"
                value=""
              />

              {(
                busNumbers[
                  form.college
                ] || []
              ).map((bus) => (
                <Picker.Item
                  key={bus}
                  label={bus}
                  value={bus}
                />
              ))}
            </Picker>
          </View>

          {/* REGISTER BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text
              style={styles.buttonText}
            >
              Register Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <Text style={styles.footerText}>
          Join our fleet of professional
          transit operators.
        </Text>

        <Text
          style={styles.securityText}
        >
          🛡 Authorized Transit Personnel
          Access Only
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faf6",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    width: "70%",
  },

  logo: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    padding: 20,
    marginTop: 25,
    elevation: 5,
  },

  label: {
    fontSize: 17,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },

  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingLeft: 15,
    marginBottom: 18,
  },

  picker: {
    flex: 1,
    color: "#000",
  },

  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  footerText: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 15,
    color: "#444",
  },

  securityText: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
    color: "#2E7D32",
    fontWeight: "600",
    fontSize: 14,
  },
});