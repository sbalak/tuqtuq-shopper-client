import CustomHeader from "@/components/CustomHeader";
import AuthProvider, { useAuth } from "@/hooks/useAuth";
import { router, Slot, Stack } from "expo-router";
import { useEffect } from "react";

export default function _layout() {
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
  });

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ header: () => <CustomHeader /> }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}