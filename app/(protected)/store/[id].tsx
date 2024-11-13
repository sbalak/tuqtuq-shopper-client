import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    
  
    const handleAddItem = async(userId: string, restaurantId: string, foodId: string) => {
      try {
        const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/Cart/Add`,
          {
            params: {
              userId: '1',
              restaurantId: restaurantId,
              foodId: foodId
            },
          });
        loadRestaurantDetails();
      }
      catch(error) {
        console.log(error);
      } 
    }
    
    const handleRemoveItem = async(userId: string, restaurantId: string, foodId: string) => {
      try {
        const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/Cart/Remove`,
          {
            params: {
              userId: '1',
              restaurantId: restaurantId,
              foodId: foodId
            },
          });
          loadRestaurantDetails();
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
      <SafeAreaView>
        <ScrollView>
          <View style={styles.restaurantcontainer}>
              <View style={styles.restaurantCard} >
                  <Image source={{uri:restaurant.photo}} style={styles.restaurantImage} />
                  <View style={styles.restaurantInfo}>
                      <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                      <Text style={styles.restaurantSubtitle}>{restaurant.locality} • {restaurant.city}</Text>
                      <Text style={styles.restaurantSubtitle}>{restaurant.cuisine}</Text>
                  </View>
              </View>
          </View>
          <FlatList data={restaurant.foodItems} scrollEnabled={false} renderItem={({item, index}) => (
            (item.photo ? 
              (
                <View style={styles.foodContainer}>
                    <View style={styles.foodDetailsContainer}>
                        <Text style={styles.foodTitle}>{item.name}</Text>
                        <Text style={styles.foodSubtitle}>₹ {item.itemPrice}</Text>
                    </View>
                    <View>
                        <Image source={{uri:item.photo}} style={styles.foodImage} />
                        <View style={[styles.cartButtonContainer, styles.cartButtonWPContainer]}>
                            <TouchableOpacity onPress={() => handleRemoveItem('1', restaurant.id, item.id)}>
                                <Text style={styles.cartButton}><Ionicons name="remove-sharp" size={24} color="{color}" /></Text>
                            </TouchableOpacity>
                            <Text style={styles.cartButtonText}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => handleAddItem('1', restaurant.id, item.id)}>
                                <Text style={styles.cartButton}><Ionicons name="add-sharp" size={24} color="{color}" /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

              ) : (
                <View style={styles.foodContainer}>
                  <View>
                      <Text style={styles.foodTitle}>{item.name}</Text>
                      <Text style={styles.foodSubtitle}>₹ {item.itemPrice}</Text>
                  </View>
                  <View>
                      <View style={[styles.cartButtonContainer, styles.cartButtonWOPContainer]}>
                          <TouchableOpacity onPress={() => handleRemoveItem('1', restaurant.id, item.id)}>
                              <Text style={styles.cartButton}><Ionicons name="remove-sharp" size={24} color="{color}" /></Text>
                          </TouchableOpacity>
                          <Text style={styles.cartButtonText}>{item.quantity}</Text>
                          <TouchableOpacity onPress={() => handleAddItem('1', restaurant.id, item.id)}>
                              <Text style={styles.cartButton}><Ionicons name="add-sharp" size={24} color="{color}" /></Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                </View>
              )
            )
          )} />
          
          <View style={styles.checkoutButton}>
            <TouchableOpacity onPress={() => router.push('/cart')}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
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
    },
    foodContainer: {
      backgroundColor: Colors.White,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
      padding: 10,
      borderRadius: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    foodDetailsContainer: {
      paddingTop: 17,
    },
    foodTitle: {
        fontFamily: 'outfit-medium',
        fontSize: 18
    },
    foodSubtitle: {
        fontFamily: 'outfit',
        fontSize: 16,
        color: Colors.LightGrey
    },
    foodImage: {
        width: 130,
        height: 100,
        marginLeft:0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    cartButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 15, 
      backgroundColor: Colors.Tertiary, 
      paddingLeft: 15, 
      paddingRight: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15
  },
  cartButtonWOPContainer: {
    width: 130,
    borderRadius: 15
  },
  cartButtonWPContainer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  cartButton: {
      fontFamily: 'outfit',
      fontSize: 20,
      color: Colors.Primary
  },
  cartButtonText: {
      fontFamily: 'outfit',
      marginTop: 4,
      fontSize: 14,
      color: Colors.Primary
  },
  checkoutButton: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding:10,
    backgroundColor: Colors.Primary,
    flex: 1, justifyContent: "center", alignItems: "center"
  },
  checkoutButtonText: {
    fontFamily: 'outfit',
    color: Colors.Tertiary,
  }
})