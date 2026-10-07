import { Ionicons , Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { colleges } from "../config/colleges";
import { busNumbers } from "../config/busNumbers";
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


const BASE_URL = "https://bus-backend-3pi1.onrender.com/api/auth";

export default function RegisterScreen({ navigation }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    busNumber: "",
    boardingPoint: "",
    arrivalTime: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // ====================================
  // 🚀 REGISTER
  // ====================================
  const handleRegister = async () => {

    try {

      console.log("📤 REGISTER DATA:", form);
      

      const res = await axios.post(
        `${BASE_URL}/register`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "✅ REGISTER SUCCESS:",
        res.data
      );

      alert("Registration Successful ✅");

      navigation.replace("Login");

    } catch (err) {

      console.log(
        "❌ REGISTER ERROR FULL:",
        err
      );

      console.log(
        "❌ REGISTER ERROR RESPONSE:",
        err.response?.data
      );

      console.log(
        "❌ REGISTER ERROR MESSAGE:",
        err.message
      );

      alert(
        JSON.stringify(
          err.response?.data ||
          err.message
        )
      );
    }
  };

  return (
  <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>
          Student{"\n"}Registration
        </Text>

        <Image
          source={require("../../assets/bus.png")}
          style={styles.logo}
        />
      </View>

      {/* FORM CARD */}
      <View style={styles.formCard}>

        {/* NAME */}
        <Text style={styles.label}>Name</Text>

        <View style={styles.inputBox}>
          <Ionicons
            name="person-outline"
            size={22}
            color="#6F7B6B"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#7A8390"
            value={form.name}
            onChangeText={(v) =>
              handleChange("name", v)
            }
          />
        </View>

        {/* EMAIL */}
        <Text style={styles.label}>Email or Username</Text>

        <View style={styles.inputBox}>
          <Ionicons
            name="mail-outline"
            size={22}
            color="#6F7B6B"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter email or username"
            placeholderTextColor="#7A8390"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) =>
              handleChange("email", v)
            }
          />
        </View>

        {/* PASSWORD */}
        <Text style={styles.label}>
          Password
        </Text>

        <View style={styles.inputBox}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#6F7B6B"
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

        {/* COLLEGE */}
        <Text style={styles.label}>
          College / University
        </Text>

        <View style={styles.pickerBox}>
          <Ionicons
            name="school-outline"
            size={22}
            color="#6F7B6B"
          />

          <Picker
            selectedValue={form.college}
            style={styles.picker}
            dropdownIconColor="#333"
            onValueChange={(value) =>
              handleChange("college", value)
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

        {/* BUS */}
        <Text style={styles.label}>
          Bus Number
        </Text>

        <View style={styles.pickerBox}>
          <Ionicons
            name="bus-outline"
            size={22}
            color="#6F7B6B"
          />

          <Picker
            selectedValue={form.busNumber}
            style={styles.picker}
            dropdownIconColor="#333"
            onValueChange={(value) =>
              handleChange("busNumber", value)
            }
          >
            <Picker.Item
              label="Select Bus Number"
              value=""
            />

            {(busNumbers[form.college] || []).map(
              (bus) => (
                <Picker.Item
                  key={bus}
                  label={bus}
                  value={bus}
                />
              )
            )}
          </Picker>
        </View>

        {/* BOARDING POINT */}
        <Text style={styles.label}>
          Boarding Point
        </Text>

        <View style={styles.inputBox}>
          <Ionicons
            name="location-outline"
            size={22}
            color="#6F7B6B"
          />

          <TextInput
            style={styles.input}
            placeholder="Your Stop"
            placeholderTextColor="#7A8390"
            value={form.boardingPoint}
            onChangeText={(v) =>
              handleChange("boardingPoint", v)
            }
          />
        </View>

        {/* ARRIVAL TIME */}
        <Text style={styles.label}>
          Arrival Time
        </Text>

        <View style={styles.inputBox}>
          <Ionicons
            name="time-outline"
            size={22}
            color="#6F7B6B"
          />

          <TextInput
            style={styles.input}
            placeholder="00:00 AM"
            placeholderTextColor="#7A8390"
            value={form.arrivalTime}
            onChangeText={(v) =>
              handleChange("arrivalTime", v)
            }
          />
        </View>

      </View>

      {/* REGISTER BUTTON */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.registerText}>
          Register Account
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        🛡 Authorized Transit Personnel Access Only
      </Text>

    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
  backgroundColor: "#F3F3F3",
  paddingHorizontal: 14,
},

header: {
  marginTop: 50,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

screenTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#222",
},

logo: {
  width: 80,
  height: 80,
  borderRadius: 40,
},

formCard: {
  backgroundColor: "#FFF",
  marginTop: 18,
  borderRadius: 30,
  padding: 16,
  borderWidth: 1,
  borderColor: "#D7D7D7",
},

label: {
  fontSize: 16,
  color: "#444",
  marginBottom: 8,
  marginTop: 10,
},

inputBox: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#ECECEC",
  borderRadius: 12,
  height: 54,
  paddingHorizontal: 12,
},

input: {
  flex: 1,
  marginLeft: 10,
  color: "#000",
},

pickerBox: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#ECECEC",
  borderRadius: 12,
  paddingHorizontal: 12,
  height: 54,
},

picker: {
  flex: 1,
  color: "#000",
},

registerButton: {
  backgroundColor: "#007A14",
  marginTop: 22,
  marginHorizontal: 24,
  borderRadius: 14,
  paddingVertical: 16,
  alignItems: "center",
},

registerText: {
  color: "#FFF",
  fontSize: 20,
  fontWeight: "700",
},

footerText: {
  textAlign: "center",
  marginTop: 22,
  marginBottom: 30,
  color: "#4B5B4B",
  fontWeight: "500",
},
});