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
    <Slot />
  );
}