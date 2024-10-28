import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

export default function _layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.Primary
    }}>
      <Tabs.Screen name="store"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color})=><Ionicons name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen name="cart"
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({color})=><Ionicons name="cart" size={24} color={color} />
        }}
      />
      <Tabs.Screen name="order"
        options={{
          tabBarLabel: "History",          
          tabBarIcon: ({color})=><Ionicons name="receipt" size={24} color={color} />
        }}
      />
    </Tabs>
  )
}