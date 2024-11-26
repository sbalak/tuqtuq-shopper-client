import { View, Text } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'

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
    />
  )
}