import { Picker } from "@react-native-picker/picker";
import { colleges } from "../config/colleges";
import { busNumbers } from "../config/busNumbers";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://bus-backend-3pi1.onrender.com/api/users"; // ✅ FIXED

export default function EditProfileScreen({ navigation }) {
  const [form, setForm] = useState({
    college: "",
    busNumber: "",
    boardingPoint: "",
    arrivalTime: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  // ======================================
  // 📥 LOAD PROFILE
  // ======================================
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("⛔ No token found");
        return;
      }

      console.log("📡 Fetching profile...");

      const res = await axios.get(`${BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ PROFILE DATA:", res.data);

      setForm({
        college: res.data.college || "",
        busNumber: String(res.data.busNumber || ""),
        boardingPoint: res.data.boardingPoint || "",
        arrivalTime: res.data.arrivalTime || "",
      });

    } catch (err) {
      console.log("❌ PROFILE LOAD ERROR:", err.message);
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // ======================================
  // 💾 SAVE PROFILE
  // ======================================
  const saveProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      console.log("⛔ No token");
      return;
    }

    console.log("📡 Sending update to:", `${BASE_URL}/update`);

    const res = await axios.put(
      `${BASE_URL}/update`,
      form,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("✅ UPDATED:", res.data);

    // 🔥 IMPORTANT: UPDATE LOCAL STORAGE
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

    navigation.goBack();

  } catch (err) {
    console.log("❌ UPDATE ERROR:", err.message);
  }
};

  return (
  <View style={styles.container}>
    <ScrollView
        contentContainerStyle={{
            paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
    <View style={styles.header}>
      <Text style={styles.title}>
        Edit Profile
      </Text>

      <View style={styles.logoContainer}>
       <Image
          source={require("../../assets/bus.png")}
          style={styles.logo}
       />
      </View>
    </View>

    {/* FORM CARD */}
    <View style={styles.card}>

      <Text style={styles.label}>
        College / University
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          dropdownIconColor="#333"
          selectedValue={form.college}
          onValueChange={(value) =>
            setForm({
              ...form,
              college: value,
              busNumber: "",
            })
          }
        >
          <Picker.Item
            label="Select College"
            value=""
          />

          {colleges.map((college) => (
            <Picker.Item
              key={college}
              label={college}
              value={college}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>
        Bus Number
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
        style={styles.picker}
        dropdownIconColor="#333"
          selectedValue={form.busNumber}
          onValueChange={(value) =>
            setForm({
              ...form,
              busNumber: value,
            })
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

      <Text style={styles.label}>
        Boarding Point
      </Text>

      <TextInput
        style={styles.input}
        value={form.boardingPoint}
        onChangeText={(v) =>
          handleChange(
            "boardingPoint",
            v
          )
        }
      />

      <Text style={styles.label}>
        Arrival Time
      </Text>

      <TextInput
        style={styles.input}
        value={form.arrivalTime}
        onChangeText={(v) =>
          handleChange(
            "arrivalTime",
            v
          )
        }
      />
     

    </View>

    {/* SAVE BUTTON */}
    <TouchableOpacity
      style={styles.saveButton}
      onPress={saveProfile}
    >
      <Text style={styles.saveButtonText}>
        Save Changes
      </Text>
    </TouchableOpacity>

    {/* INFO BOX */}
    <View style={styles.infoBox}>
      <Text style={styles.infoText}>
        ⓘ Updating these details helps BusV8
        provide precise route information.
      </Text>
    </View>
    <Footer
            navigation={navigation}
            active="Profile"
    />
    </ScrollView>
    
  </View>
);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F2",
    paddingHorizontal: 8,
  },
  picker: {
    color: "#333",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 15,
    paddingHorizontal: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  logoContainer:{
    width:74,
    height:74,
    justifyContent:"center",
    alignItems:"center",
},

logo:{
    width:74,
    height:74,
    resizeMode:"contain",
},

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    padding: 14,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
    marginTop: 10,
  },

  pickerContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#C5C5C5",
    borderRadius: 12,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#C5C5C5",
    borderRadius: 12,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },

  saveButton: {
    marginTop: 55,
    alignSelf: "center",
    width: "80%",
    height: 48,
    backgroundColor: "#007A14",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  infoBox: {
    marginTop: 55,
    alignSelf: "center",
    width: "86%",
    backgroundColor: "#DDF0D8",
    borderRadius: 18,
    padding: 16,
  },

  infoText: {
    color: "#2F6F33",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },

});