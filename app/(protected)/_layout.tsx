import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import LocationProvider from '@/hooks/useLocation'
import TabHeader from '@/components/headers/TabHeader'

export default function _layout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ header: () => <TabHeader /> }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="store" options={{ headerShown: false }} />
        <Stack.Screen name="order" options={{ headerShown: false }} />
      </Stack>
    </LocationProvider>
  )
}