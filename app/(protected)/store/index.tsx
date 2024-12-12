import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import RestaurantNearby from '@/components/store/RestaurantNearby';
import RestaurantRecent from '@/components/store/RestaurantRecent';

export default function store() {  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{paddingHorizontal: 10}}>
        <RestaurantRecent />
        <RestaurantNearby />
      </ScrollView>
    </SafeAreaView>
  )
}