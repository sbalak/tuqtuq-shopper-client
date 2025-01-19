import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import RestaurantRecentCard from './RestaurantRecentCard'
import { router, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { useLocation } from '@/hooks/useLocation';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { common } from '@/constants/Styles';
import { useAuth } from '@/hooks/useAuth';

export default function RestaurantRecent() {
  const { authState } = useAuth();
  const { locationState } = useLocation();
  const [restaurants, setRestaurants] = useState([]);

  const loadRecentRestaurants = async() => {
    try {
      if (locationState.latitude && locationState.longitude) {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/restaurant/recentlyvisited?userId=${authState.userId}&latitude=${locationState.latitude}&longitude=${locationState.longitude}`);
        setRestaurants(response.data);
      }
    }
    catch(error) {
    } 
  }

  useFocusEffect(
    React.useCallback(() => {
      loadRecentRestaurants();
    }, [locationState.latitude, locationState.longitude])
  );

  return (
    restaurants.length > 0 ? 
    <View>
        <View style={styles.titleContainer}>
            <Ionicons name="star" size={24} color="#FFB300" />
            <Text style={common.title}>Your Recent Visits</Text>
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
    flexDirection: 'row', gap: 5
  }
})