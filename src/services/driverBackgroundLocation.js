import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// =======================================
// 📌 DRIVER BACKGROUND TASK NAME
// =======================================
export const DRIVER_TASK =
  "driver-background-location-task";

// =======================================
// 🌐 API URL
// =======================================
const API_URL =
  "https://bus-backend-3pi1.onrender.com/api/location";

// =======================================
// 📍 DRIVER BACKGROUND LOCATION TASK
// =======================================
TaskManager.defineTask(
  DRIVER_TASK,
  async ({ data, error }) => {
    try {
      // ===================================
      // ❌ TASK ERROR
      // ===================================
      if (error) {
        console.log(
          "❌ Background Task Error:",
          error
        );
        return;
      }

      // ===================================
      // ❌ NO DATA
      // ===================================
      if (!data) {
        console.log(
          "❌ Background Task: No data"
        );
        return;
      }

      // ===================================
      // 📍 GET LOCATIONS
      // ===================================
      const { locations } = data;

      if (
        !locations ||
        locations.length === 0
      ) {
        console.log(
          "❌ Background Task: No location received"
        );
        return;
      }

      // ===================================
      // 📍 CURRENT LOCATION
      // ===================================
      const location = locations[0];

      const {
        latitude,
        longitude,
      } = location.coords;

      if (
        latitude == null ||
        longitude == null
      ) {
        console.log(
          "❌ Invalid coordinates"
        );
        return;
      }

      console.log(
        "📍 Driver Location:",
        latitude,
        longitude
      );

      // ===================================
      // 👤 GET USER
      // ===================================
      const userData =
        await AsyncStorage.getItem(
          "user"
        );

      if (!userData) {
        console.log(
          "⛔ No driver user found"
        );
        return;
      }

      // ===================================
      // 🔐 GET TOKEN
      // ===================================
      const token =
        await AsyncStorage.getItem(
          "token"
        );

      if (!token) {
        console.log(
          "⛔ No authentication token found"
        );
        return;
      }

      // ===================================
      // 🧠 PARSE USER
      // ===================================
      const user =
        JSON.parse(userData);

      console.log(
        "👤 Driver:",
        user.name
      );

      // ===================================
      // 🆔 USER ID
      // ===================================
      const userId =
        user._id || user.id;

      if (!userId) {
        console.log(
          "❌ Driver user ID not found"
        );
        return;
      }

      // ===================================
      // 📡 SEND LOCATION TO BACKEND
      // ===================================
      console.log(
        "📡 Sending driver location..."
      );

      const response =
        await axios.post(
          API_URL,
          {
            userId: userId,
            latitude: latitude,
            longitude: longitude,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",
            },

            timeout: 15000,
          }
        );

      // ===================================
      // ✅ SUCCESS
      // ===================================
      console.log(
        "✅ Driver Location Sent"
      );

      console.log(
        "📡 Server Response:",
        response.data
      );

    } catch (err) {

      // ===================================
      // ❌ BACKGROUND UPLOAD ERROR
      // ===================================
      console.log(
        "❌ Background Upload Error:",
        err.message
      );

      // ===================================
      // 🌐 SERVER ERROR
      // ===================================
      if (err.response) {

        console.log(
          "❌ Server Status:",
          err.response.status
        );

        console.log(
          "❌ Server Response:",
          err.response.data
        );
      }

      // ===================================
      // ⏱️ TIMEOUT
      // ===================================
      if (
        err.code ===
        "ECONNABORTED"
      ) {
        console.log(
          "⏱️ Location upload timeout"
        );
      }
    }
  }
);