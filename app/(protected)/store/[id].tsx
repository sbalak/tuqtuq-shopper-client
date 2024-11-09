import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FoodItemWithPhoto from '@/components/store/FoodItemWithPhoto';
import FoodItemWithoutPhoto from '@/components/store/FoodItemWithoutPhoto';

export default function StoreDetails() {
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
  
    useFocusEffect(
      React.useCallback(() => {
        loadRestaurantDetails();
      }, [])
    );

    return (
        <ScrollView>
          <View style={styles.restaurantcontainer}>
              <View style={styles.restaurantCard} >
                  <Image source={{uri:restaurant.photo}} style={styles.restaurantImage} />
                  <View style={styles.restaurantInfo}>
                      <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                      <Text style={styles.restaurantSubtitle}>{restaurant.locality} • {restaurant.city}</Text>
                      <Text style={styles.restaurantSubtitle}>{restaurant.cuisine} • 0.4 km</Text>
                  </View>
              </View>
          </View>
          <FlatList data={restaurant.foodItems} scrollEnabled={false} renderItem={({item, index}) => (
            (item.photo ? <FoodItemWithPhoto food={item} key={index} /> : <FoodItemWithoutPhoto food={item} key={index} />)
          )} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    restaurantcontainer: {
      backgroundColor: Colors.Primary,
      paddingTop: 50,
      paddingBottom: 10,
      marginBottom:20
    },
    restaurantCard: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
    },
    restaurantImage: {
        width: 80,
        height: 80,
        borderRadius:15
    },
    restaurantInfo: {
        marginTop: 7,
        marginLeft: 10
    },
    restaurantTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 18
    },
    restaurantSubtitle: {
        fontFamily: 'outfit',
        fontSize: 14,
        color: Colors.LightGrey
    }
})