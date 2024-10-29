import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from 'expo-router';
import axios from 'axios';
import RestaurantNearby from '@/components/store/RestaurantNearby';
import RestaurantRecent from '@/components/store/RestaurantRecent';

export default function store() {  
  return (
    <ScrollView>
      <RestaurantRecent />
      <RestaurantNearby />
    </ScrollView>
  )
}