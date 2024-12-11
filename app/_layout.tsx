import AuthProvider, { useAuth } from "@/hooks/useAuth";
import { router, Slot } from "expo-router";
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import { View } from "react-native";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  let [fontsLoaded] = useFonts({
    'barcelona': require('./../assets/fonts/Barcelona.ttf'),
    'dynapuff-semi': require('./../assets/fonts/DynaPuff-SemiBold.ttf'),
    'nunito-medium': require('./../assets/fonts/NunitoSansMedium.ttf'),
    'nunito-bold': require('./../assets/fonts/NunitoSansBold.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf')
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const RootLayout = () => {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState.authenticated === null) {
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}><Text>Loading Now...</Text></View>
    }
    else {
      if (authState.authenticated) {
        router.replace('/store'); 
      }
      else {
        router.replace('/login');
      }
    }
  }, [authState.authenticated]);

  return (
    <Slot />
  );
}