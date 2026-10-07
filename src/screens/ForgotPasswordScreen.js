import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import axios from "axios";

const BASE_URL =
"https://bus-backend-3pi1.onrender.com/api/auth";

export default function ForgotPasswordScreen(
  { navigation }
) {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] =
    useState("");

  const handleReset = async () => {

    try {

      const res = await axios.post(
        `${BASE_URL}/reset-password`,
        {
          email,
          newPassword,
        }
      );

      Alert.alert(
        "Success",
        res.data.message
      );

      navigation.replace("Login");

    } catch (err) {

      Alert.alert(
        "Error",
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Forgot Password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#1f1e1e"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#1f1e1e"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleReset}
      >
        <Text style={styles.buttonText}>
          Update Password
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    justifyContent:"center",
  },
  title:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:20,
  },
  input:{
    borderWidth:1,
    marginBottom:15,
    padding:10,
    color:"black",
    borderRadius:10,
  },
  button:{
    backgroundColor:"#4CAF50",
    padding:15,
    borderRadius:10,
  },
  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold",
  },
});