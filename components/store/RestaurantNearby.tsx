import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import RestaurantNearbyCard from './RestaurantNearbyCard';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { useLocation } from '@/hooks/useLocation';
import Ionicons from '@expo/vector-icons/build/Ionicons';

export default function RestaurantNearby() {
  const { locationState } = useLocation();
  const [restaurants, setRestaurants] = useState([]);

  const loadNearbyRestaurants = async() => {
    try {
      if (locationState.latitude && locationState.longitude) {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/restaurant/list?latitude=${locationState.latitude}&longitude=${locationState.longitude}`);
        setRestaurants(response.data);
      }
    }
    catch(error) {
      console.log(error);
    } 
  }

  useFocusEffect(
    React.useCallback(() => {
      loadNearbyRestaurants();
    }, [locationState.latitude, locationState.longitude])
  );

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Ionicons name="location-sharp" size={24} color={Colors.Primary} /> 
          <Text style={styles.title}>Nearby Hotspots</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => (router.navigate('/store/list'))}>
          <Text style={styles.viewAll}>more</Text>
          <Ionicons name="arrow-forward-outline" size={24} color={Colors.Primary} />
        </TouchableOpacity>
      </View>
      <FlatList data={restaurants} 
                scrollEnabled={false} 
                renderItem={({item, index})=>(<RestaurantNearbyCard restaurant={item} key={index} />)}
                keyExtractor={(item, index) => String(index)} 
      />
      <TouchableOpacity onPress={() => (router.navigate('/store/list'))}>
        <Text style={styles.footer}>view more</Text>
      </TouchableOpacity>
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
  },
  footer: {
    fontFamily: 'nunito-bold', 
    color: Colors.Primary, 
    textAlign: "center",
    marginBottom:20
  }
})
