import { useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {

    const token = await AsyncStorage.getItem("token");
    const permissionDone = await AsyncStorage.getItem("permissionDone");

    console.log("Token:", token);
    console.log("Permission:", permissionDone);

    // ❌ No user
    if (!token) {
      navigation.replace("Login");
      return;
    }

    // 🆕 First time permission
    if (!permissionDone) {
      navigation.replace("Permission");
      return;
    }

    // ✅ Normal user
    navigation.replace("Home");
  };

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>Loading...</Text>
    </View>
  );
}