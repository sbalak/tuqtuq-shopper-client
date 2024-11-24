import React from 'react'
import StoreHeader from '@/components/headers/StoreHeader'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

export default function _layout() {
  return (
    <Stack 
      screenOptions={({ route }) => ({
        title: 'Loading...',
        headerTitle: route.params.headerTitle,
        headerTitleStyle: {
          fontFamily: 'outfit-bold',
          fontSize: 20
        } 
      })} 
    >
      <Stack.Screen name="index" options={{ header: () => <StoreHeader /> }} />
      <Stack.Screen name="[id]" />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20
  },
  backButton: {
    paddingRight:20
  }
})