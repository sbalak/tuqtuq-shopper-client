import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import CartDetails from '@/components/cart/CartDetails'

export default function index() {
  return (
    <SafeAreaView>
      <ScrollView>
        <CartDetails />
      </ScrollView>
    </SafeAreaView>   
  )
}