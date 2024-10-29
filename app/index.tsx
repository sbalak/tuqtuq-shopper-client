import { useAuth } from "@/hooks/useAuth";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Index() {
      
  const { authState } = useAuth();  

  return (  
    authState.authenticated === null ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}><Text>Loading...</Text></View>) : ((authState.authenticated) ?  <Redirect href="/store" /> : <Redirect href="/login" />)
  );
}