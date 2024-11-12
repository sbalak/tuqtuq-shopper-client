import { ScrollView } from 'react-native'
import React from 'react'
import RestaurantNearby from '@/components/store/RestaurantNearby';
import RestaurantRecent from '@/components/store/RestaurantRecent';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function store() {  
  return (
    <SafeAreaView>
      <ScrollView>
        <RestaurantRecent />
        <RestaurantNearby />
      </ScrollView>
    </SafeAreaView>
  )
}