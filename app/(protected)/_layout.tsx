import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import CustomHeader from '@/components/CustomHeader'
import LocationProvider from '@/hooks/useLocation'

export default function _layout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ header: () => <CustomHeader /> }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="store" options={{ headerShown: false }} />
        <Stack.Screen name="order" options={{ headerShown: false }} />
      </Stack>
    </LocationProvider>
  )
}