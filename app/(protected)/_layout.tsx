import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import CustomHeader from '@/components/CustomHeader'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ header: () => <CustomHeader /> }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="store" options={{ headerShown: false }} />
      <Stack.Screen name="order" options={{ headerShown: false }} />
    </Stack>
  )
}