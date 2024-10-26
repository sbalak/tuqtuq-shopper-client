import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import RestaurantNearbyCard from './RestaurantNearbyCard';

export default function RestaurantNearby({restaurants}: {restaurants: any}) {
  return (
    <View>
      <View style={styles.titleContainer}>
          <Text style={styles.title}># Nearby Hotspots</Text>
          <Text style={styles.viewAll}>View All</Text>
      </View>
      <FlatList data={restaurants} renderItem={({item, index})=>(<RestaurantNearbyCard restaurant={item} key={index} />)} />
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom:10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10
  },
  title: {
    fontSize:20,
    fontFamily: 'outfit-bold'
    },
  viewAll: {
    color: Colors.Primary, 
    fontFamily: 'outfit-medium'
  }
})
