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
      const response = await axios.get(`https://shoppingcart-sandbox.azurewebsites.net/api/restaurant/list`);
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
    <View style={styles.recentVisitContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Your Recent Visits</Text>
            <Text style={styles.viewAll}>View All</Text>
        </View>
        <FlatList data={restaurants} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({item, index})=>(<RestaurantRecentCard restaurant={item} key={index} />)} />
    </View>
  )
}

const styles = StyleSheet.create({
    recentVisitContainer: {
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
  