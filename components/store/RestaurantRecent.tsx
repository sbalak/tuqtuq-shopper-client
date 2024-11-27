import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import RestaurantRecentCard from './RestaurantRecentCard'
import { router, useFocusEffect } from 'expo-router';
import axios from 'axios';
import {API_URL} from '@env';
import { useLocation } from '@/hooks/useLocation';

export default function RestaurantRecent() {
  const { locationState } = useLocation();
  const [restaurants, setRestaurants] = useState([]);

  const loadRecentRestaurants = async() => {
    try {
      const response = await axios.get(`${API_URL}/restaurant/recentlyvisited`);
      setRestaurants(response.data);
    }
    catch(error) {
      console.log(error);
    } 
  }

  useFocusEffect(
    React.useCallback(() => {
      loadRecentRestaurants();
    }, [locationState.latitude, locationState.longitude])
  );

  return (
    restaurants ? 
    <View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Your Recent Visits</Text>
            <TouchableOpacity onPress={() => (router.navigate('/store/recent'))}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
        </View>
        <FlatList data={restaurants} 
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false} 
                  renderItem={({item, index})=>(<RestaurantRecentCard restaurant={item} key={index} />)}
                  keyExtractor={(item, index) => String(index)}
        />
    </View> 
    : null
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