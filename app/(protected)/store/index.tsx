import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import RestaurantNearby from '@/components/store/RestaurantNearby';
import RestaurantRecent from '@/components/store/RestaurantRecent';
import { common } from '@/constants/Styles';

export default function store() {  
  return (
    <SafeAreaView style={common.safeArea}>
      <ScrollView style={common.container}>
        <RestaurantRecent />
        <RestaurantNearby />
      </ScrollView>
    </SafeAreaView>
  )
}