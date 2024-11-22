import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import RestaurantRecentCard from './RestaurantRecentCard'
import { useFocusEffect } from 'expo-router';
import axios from 'axios';

export default function RestaurantRecent() {
  const [restaurants, setRestaurants] = useState([]);

  const loadRecentRestaurants = async() => {
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
      loadRecentRestaurants();
    }, [])
  );

  return (
    <View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Your Recent Visits</Text>
            <Text style={styles.viewAll}>View All</Text>
        </View>
        <FlatList data={restaurants} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({item, index})=>(<RestaurantRecentCard restaurant={item} key={index} />)} />
    </View>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
      marginVertical: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
  