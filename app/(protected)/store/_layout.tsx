import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import StoreHeader from '@/components/headers/StoreHeader'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <StoreHeader /> }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  )
}