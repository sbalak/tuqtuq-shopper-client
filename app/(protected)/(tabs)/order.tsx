import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function order() {
  return (
    <View>
      <Text>Order List</Text>
      <TouchableOpacity style={{ marginBottom: 20 }}>
          <Button color='#000' title="Order Details" onPress={() => router.navigate("/order/2")} ></Button>
        </TouchableOpacity>
    </View>
  )
}