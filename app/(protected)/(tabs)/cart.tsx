import { ScrollView  } from 'react-native'
import React from 'react'
import CartDetails from '@/components/cart/CartDetails';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function cart() {  
  return (
    <SafeAreaView>
      <ScrollView>
        <CartDetails />
      </ScrollView>
    </SafeAreaView>   
  )
}