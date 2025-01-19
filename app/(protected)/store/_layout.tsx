import React from 'react'
import StoreHeader from '@/components/headers/StoreHeader'
import { Stack } from 'expo-router'
import CommonHeader from '@/components/headers/CommonHeader'
import { common } from '@/constants/Styles'

export default function _layout() {
  return (
    <Stack 
      screenOptions={({ route }) => ({
        headerTitle: route.params.headerTitle
      })} 
    >
      <Stack.Screen name="[id]" options={{ header: (props) => <CommonHeader props={props} {...props} /> }} />
      <Stack.Screen name="index" options={{ header: () => <StoreHeader /> }} />
      <Stack.Screen name="list" options={{ header: (props) => <CommonHeader props={props} {...props} /> }} />
    </Stack>
  )
}