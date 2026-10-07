import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

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

  return (
  <View style={styles.container}>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          Profile
        </Text>

        <Image
          source={require("../../assets/bus.png")}
          style={styles.logo}
        />

      </View>

      {/* USER CARD */}
      <View style={styles.userCard}>

        <Ionicons
          name="person-circle"
          size={55}
          color="#000"
        />

        <Text style={styles.userName}>
          {user?.name || "Student"}
        </Text>

      </View>

      {/* COLLEGE */}
      <View style={styles.infoCard}>

       <View style={styles.greenIconBox}>   
         <Ionicons
           name="school-outline"
           size={26}
           color="#007A14"
         />
       </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>
           COLLEGE NAME
        </Text>

        <Text
           style={styles.infoValue}
           numberOfLines={2}
        >
          {user?.college || "--"}
       </Text>
     </View>

    </View>

      {/* BUS */}
      <View style={styles.infoCard}>

        <View style={styles.greenIconBox}>
          <Ionicons
            name="bus-outline"
            size={26}
            color="#007A14"
          />
        </View>

        <View>
          <Text style={styles.infoLabel}>
            BUS NUMBER
          </Text>

          <Text style={styles.infoValue}>
            {user?.busNumber || "--"}
          </Text>
        </View>

      </View>

      {/* BOARDING */}
      <View style={styles.infoCard}>

        <View style={styles.yellowIconBox}>
          <Ionicons
            name="location-outline"
            size={26}
            color="#A47A00"
          />
        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.infoLabel}>
            BOARDING POINT
          </Text>

          <Text style={styles.infoValue}>
            {user?.boardingPoint || "--"}
          </Text>

        </View>

      </View>

      {/* EDIT BUTTON */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("EditProfile")
        }
      >

        <Ionicons
          name="create-outline"
          size={20}
          color="#fff"
        />

        <Text style={styles.editButtonText}>
          Edit Profile
        </Text>

      </TouchableOpacity>

    </ScrollView>

    <Footer
      navigation={navigation}
      active="Profile"
    />

  </View>
);
}

const styles = StyleSheet.create({
  userCard: {
  backgroundColor: "#EEF2ED",
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "#C7D0C5",
  padding: 22,
  marginHorizontal: 16,
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 14,
},
logo: {
  width: 74,
  height: 74,
  resizeMode: "contain",
},
container: {
  flex: 1,
  backgroundColor: "#F3F4F2",
},
infoContent: {
  flex: 1,
  marginRight: 10,
},

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 40,
  marginHorizontal: 16,
  marginBottom: 20,
},

title: {
  fontSize: 24,
  fontWeight: "700",
  color: "#111",
},

userName: {
  fontSize: 20,
  fontWeight: "700",
  marginLeft: 15,
  color: "#222",
},

infoCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  borderWidth: 1,
  borderColor: "#DADADA",
  marginHorizontal: 16,
  marginTop: 18,
  padding: 16,
  flexDirection: "row",
  alignItems: "center",
},

greenIconBox: {
  width: 48,
  height: 48,
  borderRadius: 10,
  backgroundColor: "#E8F3E8",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 15,
},

yellowIconBox: {
  width: 48,
  height: 48,
  borderRadius: 10,
  backgroundColor: "#F3E7C8",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 15,
},

infoLabel: {
  fontSize: 12,
  color: "#8A8A8A",
  fontWeight: "600",
  letterSpacing: 0.5,
},

infoValue: {
  marginTop: 6,
  fontSize: 18,
  fontWeight: "700",
  color: "#222",
  flexShrink: 1,
},

editButton: {
  backgroundColor: "#007A14",
  height: 55,
  marginHorizontal: 16,
  marginTop: 70,
  borderRadius: 14,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
},

editButtonText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 18,
  marginLeft: 8,
},
});