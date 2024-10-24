import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name="index"
      options={{
        tabBarLabel: "Home"
      }}
      />
      <Tabs.Screen name="details"
      options={{
        tabBarLabel: "Details"
      }}
      />
    </Tabs>
  )
}