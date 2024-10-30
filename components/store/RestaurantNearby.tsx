import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import RestaurantNearbyCard from './RestaurantNearbyCard';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';

export default function RestaurantNearby() {
  const [restaurants, setRestaurants] = useState([]);

  const loadNearbyRestaurants = async() => {
    try {
      const response = await axios.get(`https://shoppingcart-sandbox.azurewebsites.net/api/restaurant/list`);
      setRestaurants(response.data);
    }
    catch(error) {
      console.log(error);
    } 
  }

  useFocusEffect(
    React.useCallback(() => {
      loadNearbyRestaurants();
    }, [])
  );

  return (
    <View style={styles.restaurantNearbyContainer}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}># Nearby Hotspots</Text>
          <Text style={styles.viewAll}>View All</Text>
      </View>
      <FlatList data={restaurants} scrollEnabled={false} renderItem={({item, index})=>(<RestaurantNearbyCard restaurant={item} key={index} />)} />
    </View>
  )
}

const styles = StyleSheet.create({
  restaurantNearbyContainer: {
    marginTop: 10,
    marginBottom: 10
  },
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
