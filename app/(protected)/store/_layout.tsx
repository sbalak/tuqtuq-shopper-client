import React from 'react'
import StoreHeader from '@/components/headers/StoreHeader'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

export default function _layout() {
  return (
    <Stack 
      screenOptions={({ route }) => ({
        title: 'Loading...',
        headerTitle: route.params.headerTitle,
        headerLeft: () => <Ionicons style={{paddingRight:20}} onPress={() => router.back()} name='chevron-back-outline' size={30} color={Colors.Primary} />,
        headerTitleStyle: {
          fontFamily: 'outfit-bold',
          fontSize: 20
        } 
      })} 
    >
      <Stack.Screen name="index" options={{ header: () => <StoreHeader /> }} />
      <Stack.Screen name="[id]" />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20
  },
  backButton: {
    paddingRight:20
  }
})