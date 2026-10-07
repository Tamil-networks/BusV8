import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// =====================================================
// 🌐 API URL
// =====================================================

const API_URL =
  "https://bus-backend-3pi1.onrender.com/api/location";

// =====================================================
// 📌 BACKGROUND TASK NAME
// =====================================================

export const LOCATION_TASK =
  "background-location-task";

// =====================================================
// ⏰ TRACKING WINDOW
// 7:00 AM → 9:00 AM
// =====================================================

const START_HOUR = 7;
const END_HOUR = 9;

// =====================================================
// 📡 SEND LOCATION TO BACKEND
// =====================================================

export const sendLocationToBackend = async ({
  latitude,
  longitude,
}) => {
  try {
    console.log("📍 Sending location to backend...");

    // =================================================
    // 👤 GET USER
    // =================================================

    const userData =
      await AsyncStorage.getItem("user");

    if (!userData) {
      console.log("⛔ No user data found");
      return;
    }

    // =================================================
    // 🔐 GET TOKEN
    // =================================================

    const token =
      await AsyncStorage.getItem("token");

    if (!token) {
      console.log("⛔ No authentication token found");
      return;
    }

    // =================================================
    // 👤 PARSE USER
    // =================================================

    let user;

    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.log("❌ Invalid user data in storage");
      return;
    }

    // =================================================
    // 🆔 GET USER ID
    // =================================================

    const userId =
      user?._id || user?.id;

    if (!userId) {
      console.log("⛔ User ID not found");
      return;
    }

    console.log("👤 User ID:", userId);

    // =================================================
    // 📍 VALIDATE GPS
    // =================================================

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      console.log(
        "⛔ Invalid latitude/longitude"
      );

      return;
    }

    console.log(
      "📍 GPS:",
      latitude,
      longitude
    );

    // =================================================
    // 🚀 SEND TO BACKEND
    // =================================================

    const response = await axios.post(
      API_URL,
      {
        userId,
        latitude,
        longitude,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        // Prevent an indefinitely hanging request
        timeout: 15000,
      }
    );

    console.log(
      "✅ LOCATION SENT"
    );

    console.log(
      "📡 SERVER RESPONSE:",
      response.data
    );

  } catch (error) {

    console.log(
      "❌ LOCATION SEND ERROR:",
      error.response?.status,
      error.response?.data ||
        error.message
    );
  }
};

// =====================================================
// 📍 DEFINE BACKGROUND LOCATION TASK
// =====================================================
// IMPORTANT:
// This is the ONLY place where
// "background-location-task" is defined.
// =====================================================

if (!TaskManager.isTaskDefined(LOCATION_TASK)) {

  TaskManager.defineTask(
    LOCATION_TASK,
    async ({ data, error }) => {

      try {

        // =================================================
        // ❌ TASK ERROR
        // =================================================

        if (error) {
          console.log(
            "❌ Background Task Error:",
            error
          );

          return;
        }

        console.log(
          "🚀 BACKGROUND LOCATION TASK RUNNING"
        );

        // =================================================
        // 📦 CHECK DATA
        // =================================================

        if (!data) {
          console.log(
            "❌ Background task received no data"
          );

          return;
        }

        const { locations } = data;

        if (
          !locations ||
          locations.length === 0
        ) {
          console.log(
            "❌ No location received"
          );

          return;
        }

        // =================================================
        // ⏰ INDIA TIME
        // =================================================
        // Use Asia/Kolkata instead of relying on the
        // phone's timezone.
        // =================================================

        const indiaTime =
          new Date().toLocaleString(
            "en-US",
            {
              timeZone: "Asia/Kolkata",
            }
          );

        const indiaDate =
          new Date(indiaTime);

        const hour =
          indiaDate.getHours();

        const minute =
          indiaDate.getMinutes();

        console.log(
          `🇮🇳 India Time: ${hour}:${String(
            minute
          ).padStart(2, "0")}`
        );

        // =================================================
        // ⛔ OUTSIDE 7AM → 9AM
        // =================================================

        if (
          hour < START_HOUR ||
          hour >= END_HOUR
        ) {

          console.log(
            "⛔ Outside tracking window"
          );

          return;
        }

        // =================================================
        // 📍 GET LATEST LOCATION
        // =================================================

        const latestLocation =
          locations[
            locations.length - 1
          ];

        if (!latestLocation?.coords) {

          console.log(
            "❌ Invalid location data"
          );

          return;
        }

        const {
          latitude,
          longitude,
        } = latestLocation.coords;

        console.log(
          "📍 BACKGROUND GPS:",
          latitude,
          longitude
        );

        // =================================================
        // 📡 SEND TO BACKEND
        // =================================================

        await sendLocationToBackend({
          latitude,
          longitude,
        });

      } catch (error) {

        console.log(
          "❌ BACKGROUND TASK CRASH:",
          error
        );
      }
    }
  );

  console.log(
    "✅ Background location task defined"
  );

} else {

  console.log(
    "ℹ️ Background location task already defined"
  );
}

// =====================================================
// 🚀 START BACKGROUND TRACKING
// =====================================================

export const startBackgroundTracking =
  async () => {

    try {

      console.log(
        "🚀 Starting background tracking..."
      );

      // =================================================
      // 📌 FOREGROUND PERMISSION
      // =================================================

      const {
        status: foregroundStatus,
      } =
        await Location.requestForegroundPermissionsAsync();

      console.log(
        "📌 Foreground permission:",
        foregroundStatus
      );

      if (
        foregroundStatus !== "granted"
      ) {

        console.log(
          "❌ Foreground location permission denied"
        );

        return false;
      }

      // =================================================
      // 📌 BACKGROUND PERMISSION
      // =================================================

      const {
        status: backgroundStatus,
      } =
        await Location.requestBackgroundPermissionsAsync();

      console.log(
        "📌 Background permission:",
        backgroundStatus
      );

      if (
        backgroundStatus !== "granted"
      ) {

        console.log(
          "❌ Background location permission denied"
        );

        return false;
      }

      // =================================================
      // 🔍 CHECK EXISTING TRACKING
      // =================================================

      const alreadyStarted =
        await Location.hasStartedLocationUpdatesAsync(
          LOCATION_TASK
        );

      console.log(
        "📌 Tracking already started:",
        alreadyStarted
      );

      // =================================================
      // 🚀 START LOCATION UPDATES
      // =================================================

      if (!alreadyStarted) {

        await Location.startLocationUpdatesAsync(
          LOCATION_TASK,
          {

            // High GPS accuracy
            accuracy:
              Location.Accuracy.High,

            // Request location approximately
            // every 15 seconds
            timeInterval: 15000,

            // Request update when moved 10 meters
            distanceInterval: 10,

            // Android foreground service
            foregroundService: {

              notificationTitle:
                "Bus Tracking Active",

              notificationBody:
                "Your live location is being used for bus tracking.",

            },

            // Android/iOS background indicator
            showsBackgroundLocationIndicator:
              false,

            // Keep app location tracking active
            pausesUpdatesAutomatically:
              false,

          }
        );

        console.log(
          "✅ Background location tracking STARTED"
        );

      } else {

        console.log(
          "⚡ Background tracking is already running"
        );
      }

      return true;

    } catch (error) {

      console.log(
        "❌ START TRACKING ERROR:",
        error.message || error
      );

      return false;
    }
  };

// =====================================================
// 🛑 STOP BACKGROUND TRACKING
// =====================================================

export const stopBackgroundTracking =
  async () => {

    try {

      const isStarted =
        await Location.hasStartedLocationUpdatesAsync(
          LOCATION_TASK
        );

      if (isStarted) {

        await Location.stopLocationUpdatesAsync(
          LOCATION_TASK
        );

        console.log(
          "🛑 Background tracking stopped"
        );

      } else {

        console.log(
          "ℹ️ Background tracking was not running"
        );
      }

    } catch (error) {

      console.log(
        "❌ STOP TRACKING ERROR:",
        error.message || error
      );
    }
  };