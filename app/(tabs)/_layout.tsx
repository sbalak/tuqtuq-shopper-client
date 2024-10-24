import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name="store"
        options={{
          tabBarLabel: "Home"
        }}
      />
      <Tabs.Screen name="cart"
        options={{
          tabBarLabel: "Cart"
        }}
      />
      <Tabs.Screen name="order"
        options={{
          tabBarLabel: "History"
        }}
      />
    </Tabs>
  )
}