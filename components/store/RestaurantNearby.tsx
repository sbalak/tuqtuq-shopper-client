import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import RestaurantNearbyCard from './RestaurantNearbyCard';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';

export default function RestaurantNearby() {
  const [restaurants, setRestaurants] = useState([]);

  const loadNearbyRestaurants = async() => {
    try {
      const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/restaurant/list`);
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
    <View>
      <View style={styles.titleContainer}>
          <Text style={styles.title}># Nearby Hotspots</Text>
          <TouchableOpacity onPress={() => (router.navigate('/store/list'))}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
      </View>
      <FlatList data={restaurants} 
                scrollEnabled={false} 
                renderItem={({item, index})=>(<RestaurantNearbyCard restaurant={item} key={index} />)}
                keyExtractor={(item, index) => String(index)} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize:20,
    fontFamily: 'outfit-bold'
    },
  viewAll: {
    color: Colors.Primary, 
    fontFamily: 'nunito-bold'
  }
})
