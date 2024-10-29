import CustomHeader from "@/components/CustomHeader";
import AuthProvider, { useAuth } from "@/hooks/useAuth";
import { router, Slot, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import { View } from "react-native";
import { Text } from "react-native";

export default function _layout() {
  let [fontsLoaded] = useFonts({
    'dynapuff-semi': require('./../assets/fonts/DynaPuff-SemiBold.ttf'),
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf')
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
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
      else{
        router.replace('/login');
      }
    }
  }, [authState.authenticated]);

  return (
    <Slot />
  );
}