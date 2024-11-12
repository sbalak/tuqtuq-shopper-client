import { ScrollView } from 'react-native'
import React from 'react'
import OrderList from '@/components/order/OrderList';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function history() {
  
  return (
    <SafeAreaView>
      <ScrollView>
        <OrderList />
      </ScrollView>
    </SafeAreaView>
  )
}