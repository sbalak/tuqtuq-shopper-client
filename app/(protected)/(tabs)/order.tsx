import { ScrollView } from 'react-native'
import React from 'react'
import OrderList from '@/components/order/OrderList';

export default function history() {
  
  return (
    <ScrollView>
      <OrderList />
    </ScrollView>
  )
}