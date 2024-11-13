import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import LocationProvider from '@/hooks/useLocation'
import StoreHeader from '@/components/headers/StoreHeader'

export default function _layout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="cart" options={{ headerShown: false }} />
        <Stack.Screen name="order" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="store" options={{ headerShown: false }} />
      </Stack>
    </LocationProvider>
  )
}