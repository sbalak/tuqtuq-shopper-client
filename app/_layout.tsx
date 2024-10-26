import CustomHeader from "@/components/CustomHeader";
import AuthProvider, { useAuth } from "@/hooks/useAuth";
import { router, Slot, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from 'expo-font';

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
    if (authState.authenticated) {
      router.replace('/store'); 
    }
    else{ 
      router.replace('/auth/login');
    }
  }, [authState.authenticated]);

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} /> 
      <Stack.Screen name="(tabs)" options={{ header: () => <CustomHeader /> }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="store" options={{ headerShown: false }} />
      <Stack.Screen name="order" options={{ headerShown: false }} />
    </Stack>
  );
}