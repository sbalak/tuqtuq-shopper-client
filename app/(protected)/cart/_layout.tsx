import { View, Text } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Stack 
      screenOptions={({ route }) => ({
        headerTitle: route.params.headerTitle,
        headerLeft: () => <Ionicons style={{paddingRight:20}} onPress={() => router.back()} name='chevron-back-outline' size={30} color={Colors.Primary} />,
        headerTitleStyle: {
          fontFamily: 'outfit-bold',
          fontSize: 20
        } 
      })} 
    />
  )
}