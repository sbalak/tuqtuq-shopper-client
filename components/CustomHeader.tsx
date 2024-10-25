import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'

const CustomHeader = () => {
  return (
    <View style={{ paddingTop: 150 }}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
            <Text>Settings</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CustomHeader