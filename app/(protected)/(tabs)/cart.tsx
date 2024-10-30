import { ScrollView  } from 'react-native'
import React from 'react'
import CartDetails from '@/components/cart/CartDetails';

export default function cart() {  
  return (
    <ScrollView>
      <CartDetails />
    </ScrollView>    
  )
}