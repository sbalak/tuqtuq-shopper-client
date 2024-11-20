import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect, router, useLocalSearchParams } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useLocation } from '@/hooks/useLocation'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

const StoreDetailsHeader = () => {
    const { id } = useLocalSearchParams();
    const [restaurant, setRestaurant] = useState([]);

    const loadRestaurantDetails = async() => {
        try {
            const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/restaurant/details?userId=1&restaurantId=`+id);
            setRestaurant(response.data);
        }
        catch(error) {
            console.log(error);
        } 
    }    
    
    useEffect(() => {
        loadRestaurantDetails();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons style={{}} name='chevron-back-outline' size={30} color={Colors.Primary} />
            </TouchableOpacity>                
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </SafeAreaView>
    )
}

export default StoreDetailsHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',    
    shadowColor: Colors.Primary,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  restaurantName:{
    fontFamily: 'outfit-bold',
    fontSize: 20
  }
});
