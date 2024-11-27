import React from 'react'
import StoreHeader from '@/components/headers/StoreHeader'
import { Stack } from 'expo-router'
import CommonHeader from '@/components/headers/CommonHeader'

export default function _layout() {
  return (
    <Stack 
      screenOptions={({ route }) => ({
        headerTitle: route.params.headerTitle,
        headerTitleStyle: {
          fontFamily: 'outfit-bold',
          fontSize: 20
        } 
      })} 
    >
      <Stack.Screen name="[id]" options={{ header: (props) => <CommonHeader props={props} {...props} /> }} />
      <Stack.Screen name="index" options={{ header: () => <StoreHeader /> }} />
      <Stack.Screen name="list" options={{ header: (props) => <CommonHeader props={props} {...props} /> }} />
    </Stack>
  )
}