import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LOCATION_API =
  "https://bus-backend-3pi1.onrender.com/api/location/valid-users";

// =====================================================
// SETTINGS
// =====================================================

// User is considered OFFLINE after 90 seconds
// without sending a new location.
const INACTIVE_TIMEOUT = 90 * 1000;

// Backend refresh
const REFRESH_INTERVAL = 10 * 1000;

// Tracking window: 7:00 AM → 9:00 AM
const START_HOUR = 7;
const END_HOUR = 9;

// =====================================================
// MAP SCREEN
// =====================================================

export default function MapScreen({ navigation }) {
  const [locations, setLocations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // ===================================================
  // CURRENT TIME
  // ===================================================

  const getCurrentHour = () => {
    return new Date().getHours();
  };

  const hour = getCurrentHour();

  const isTrackingTime =
    hour >= START_HOUR && hour < END_HOUR;

  // ===================================================
  // FETCH LOCATIONS
  // ===================================================

  const fetchLocations = async () => {
    try {
      console.log("📡 Fetching valid users...");

      const token =
        await AsyncStorage.getItem("token");

      if (!token) {
        console.log("⛔ No token found");
        setLocations([]);
        return;
      }

      const res = await axios.get(
        LOCATION_API,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!Array.isArray(res.data)) {
        console.log(
          "⚠️ Invalid API response:",
          res.data
        );

        setLocations([]);
        return;
      }

      console.log(
        "📦 VALID USERS:",
        res.data
      );

      /*
       * IMPORTANT:
       *
       * Do NOT sort using `time`.
       *
       * `lastSeen` is the latest location
       * received from the user.
       */

      const sorted = [...res.data].sort(
        (a, b) =>
          new Date(b.lastSeen) -
          new Date(a.lastSeen)
      );

      setLocations(sorted);

    } catch (error) {
      console.log(
        "❌ Fetch location error:",
        error.message
      );
    }
  };

  // ===================================================
  // INITIAL FETCH + AUTO REFRESH
  // ===================================================

  useEffect(() => {
    fetchLocations();

    const interval = setInterval(() => {
      fetchLocations();
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ===================================================
  // UPDATE CURRENT TIME EVERY SECOND
  // ===================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // ===================================================
  // FIND ACTIVE USERS
  // ===================================================

  const activeLocations = locations.filter(
    (location) => {

      // Must have lastSeen
      if (!location.lastSeen) {
        return false;
      }

      const lastSeenTime =
        new Date(
          location.lastSeen
        ).getTime();

      if (Number.isNaN(lastSeenTime)) {
        return false;
      }

      const age =
        currentTime - lastSeenTime;

      /*
       * ACTIVE
       *
       * User sent location within
       * the last 90 seconds.
       */

      return (
        age >= 0 &&
        age <= INACTIVE_TIMEOUT
      );
    }
  );

  // ===================================================
  // SELECT ACTIVE USER
  // ===================================================

  useEffect(() => {

    // -----------------------------------------------
    // Outside tracking time
    // -----------------------------------------------

    if (!isTrackingTime) {
      setSelectedUserId(null);
      return;
    }

    // -----------------------------------------------
    // No active users
    // -----------------------------------------------

    if (activeLocations.length === 0) {
      setSelectedUserId(null);
      return;
    }

    // -----------------------------------------------
    // CHECK CURRENT USER
    // -----------------------------------------------

    const selectedStillActive =
      activeLocations.some(
        (location) => {

          const id =
            location.userId?._id ||
            location.userId;

          return (
            String(id) ===
            String(selectedUserId)
          );
        }
      );

    /*
     * IMPORTANT:
     *
     * A is still sending location.
     *
     * KEEP A.
     */

    if (
      selectedUserId &&
      selectedStillActive
    ) {
      return;
    }

    /*
     * A is no longer active.
     *
     * Select another active user.
     *
     * The first active user becomes
     * the new selected user.
     */

    const nextUser =
      activeLocations[0];

    const nextUserId =
      nextUser.userId?._id ||
      nextUser.userId;

    if (nextUserId) {

      console.log(
        "🔄 Switching to user:",
        nextUserId
      );

      setSelectedUserId(
        String(nextUserId)
      );
    }

  }, [
    activeLocations,
    selectedUserId,
    isTrackingTime,
    currentTime,
  ]);

  // ===================================================
  // CURRENT SELECTED LOCATION
  // ===================================================

  const currentLocation =
    activeLocations.find(
      (location) => {

        const id =
          location.userId?._id ||
          location.userId;

        return (
          String(id) ===
          String(selectedUserId)
        );
      }
    );

  // ===================================================
  // DEBUG
  // ===================================================

  console.log(
    "👥 TOTAL LOCATIONS:",
    locations.length
  );

  console.log(
    "🟢 ACTIVE USERS:",
    activeLocations.length
  );

  console.log(
    "🎯 SELECTED USER:",
    selectedUserId
  );

  console.log(
    "📍 CURRENT LOCATION:",
    currentLocation
  );

  // ===================================================
  // MAP REGION
  // ===================================================

  const mapRegion =
    currentLocation
      ? {
          latitude:
            Number(
              currentLocation.latitude
            ),

          longitude:
            Number(
              currentLocation.longitude
            ),

          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      : {
          latitude: 10.383559,
          longitude: 77.987687,

          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

  // ===================================================
  // LAST UPDATED
  // ===================================================

  const getLastUpdatedTime = () => {

    if (
      !currentLocation ||
      !currentLocation.lastSeen
    ) {
      return "--";
    }

    const date =
      new Date(
        currentLocation.lastSeen
      );

    if (Number.isNaN(date.getTime())) {
      return "--";
    }

    return date.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ===================================================
  // BACK BUTTON
  // ===================================================

  const handleBack = () => {

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  // ===================================================
  // SCREEN
  // ===================================================

  return (
    <View style={styles.container}>

      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.topBar}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backIcon}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Live Tracking
        </Text>

      </View>

      {/* =================================================
          MAP
      ================================================= */}

      <MapView
        style={styles.map}
        region={mapRegion}
      >

        {currentLocation && (
          <Marker
            coordinate={{
              latitude:
                Number(
                  currentLocation.latitude
                ),

              longitude:
                Number(
                  currentLocation.longitude
                ),
            }}
          >

            <View style={styles.marker}>

              <Text
                style={styles.markerEmoji}
              >
                🚌
              </Text>

            </View>

          </Marker>
        )}

      </MapView>

      {/* =================================================
          TRACK STATUS
      ================================================= */}

      <View style={styles.statusCard}>

        <View style={styles.statusRow}>

          <View style={styles.redDot} />

          <Text style={styles.statusText}>

            {isTrackingTime
              ? activeLocations.length > 0
                ? "Tracking Active"
                : "Waiting for live location"
              : "Tracking Inactive - Outside Time"}

          </Text>

        </View>

      </View>

      {/* =================================================
          BUS INFORMATION
      ================================================= */}

      <View style={styles.busCard}>

        {/* LEFT */}

        <View style={styles.busLeft}>

          <Text style={styles.busIcon}>
            🚌
          </Text>

          <View>

            <Text style={styles.busNumber}>

              Bus No.{" "}

              {currentLocation?.busNumber ??
                "--"}

            </Text>

            <View style={styles.liveRow}>

              <View
                style={
                  styles.smallRedDot
                }
              />

              <Text style={styles.liveText}>

                {currentLocation
                  ? "LIVE TRACKING"
                  : "NO LIVE LOCATION"}

              </Text>

            </View>

          </View>

        </View>

        {/* RIGHT */}

        <View>

          <Text
            style={
              styles.updatedLabel
            }
          >
            Last updated
          </Text>

          <Text
            style={
              styles.updatedTime
            }
          >
            {getLastUpdatedTime()}
          </Text>

        </View>

      </View>

    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F2",
  },

  // ===================================================
  // HEADER
  // ===================================================

  topBar: {
    height: 90,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 15,
  },

  backButton: {
    position: "absolute",
    left: 12,
    bottom: 8,

    width: 55,
    height: 55,

    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#000000",
    lineHeight: 48,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#007A14",
  },

  // ===================================================
  // MAP
  // ===================================================

  map: {
    flex: 1,
  },

  // ===================================================
  // MARKER
  // ===================================================

  marker: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#0B7A18",

    elevation: 5,
  },

  markerEmoji: {
    fontSize: 22,
  },

  // ===================================================
  // STATUS CARD
  // ===================================================

  statusCard: {
    position: "absolute",

    left: 15,
    right: 15,

    bottom: 130,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    paddingVertical: 14,
    paddingHorizontal: 16,

    elevation: 8,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  redDot: {
    width: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#FF3B30",

    marginRight: 10,
  },

  statusText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  // ===================================================
  // BUS CARD
  // ===================================================

  busCard: {
    position: "absolute",

    left: 15,
    right: 15,

    bottom: 15,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 16,

    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  busLeft: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
  },

  busIcon: {
    fontSize: 42,
    marginRight: 12,
  },

  busNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007A14",
  },

  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  smallRedDot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "red",

    marginRight: 6,
  },

  liveText: {
    fontSize: 13,
    color: "#222",
  },

  updatedLabel: {
    fontSize: 15,
    color: "#666",
    textAlign: "right",
  },

  updatedTime: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    textAlign: "right",
    marginTop: 2,
  },

});