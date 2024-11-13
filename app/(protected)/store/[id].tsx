import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoreDetails() {
    const { id } = useLocalSearchParams();
    const [restaurant, setRestaurant] = useState([]);
    const [search, setSearch] = useState('');
  
    const loadRestaurantDetails = async() => {
      try {
        const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/restaurant/details?userId=1&restaurantId=`+id);
        setRestaurant(response.data);
      }
      catch(error) {
        console.log(error);
      } 
    }

    const filterRestaurantDetails = async(searchText: string) => {
      try {
        const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/restaurant/filter?userId=1&restaurantId=`+id+`&searchText=`+searchText);
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
         search ? filterRestaurantDetails(search) :  loadRestaurantDetails();
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
          search ? filterRestaurantDetails(search) :  loadRestaurantDetails();
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
      <SafeAreaView style={{flex:1}}>
        <ScrollView stickyHeaderIndices={[1]}>
          <View style={styles.restaurantcontainer}>
              <View style={styles.restaurantCard} >
                <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                <Text style={styles.restaurantSubtitle}>{restaurant.locality} • {restaurant.city} • 0.22 kms</Text>
                <Text style={styles.restaurantSubtitle}>{restaurant.cuisine}</Text>
              </View>
          </View>
          <View>
            <View style={{
                backgroundColor: Colors.White,
                paddingHorizontal: 10,
                marginBottom: 10,
            }}>
              <View style={{ 
                padding: 10,
                marginVertical: 10,
                flexDirection: 'row',
                gap:10,
                borderRadius: 10,
                backgroundColor: Colors.LighterGrey,
              }}>
                <Ionicons name="search" size={30} color={Colors.Primary} /> 
                <TextInput style={{
                  fontFamily: 'outfit',
                  fontSize: 18,
                  paddingRight:40
                }} placeholderTextColor={Colors.LightGrey} placeholder='Search' value={search} onChangeText={(text: string) => {setSearch(text); filterRestaurantDetails(text)}} ></TextInput>
              </View>
            </View>
          </View>
          <FlatList data={restaurant.foodItems} scrollEnabled={false} renderItem={({item, index})  => (
            (item.photo ? 
              (
                <View style={styles.foodContainer}>
                    <View>
                        <Text style={styles.foodTitle}>{item.name}</Text>
                        <Text style={styles.foodSubtitle}>Flavourful biriyani with a twist of chilli and salty chicken fry</Text>
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
                      <Text style={styles.foodSubtitle}>Flavourful biriyani with a twist of chilli and salty chicken fry</Text>
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
        </ScrollView>
        {restaurant.totalQuantity > 0 ? (
          <View style={styles.checkoutButton}>
            <TouchableOpacity onPress={() => router.push('/cart')}>
              <Text style={styles.checkoutButtonText}>{restaurant.totalQuantity} item{restaurant.totalQuantity > 1 ? 's': null} added</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  restaurantcontainer: {
    backgroundColor: Colors.Primary,
    paddingVertical: 10,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
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
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  foodTitle: {
      fontFamily: 'outfit-medium',
      width:225,
      fontSize: 17
  },
  foodSubtitle: {
      fontFamily: 'outfit',
      fontSize: 14,
      width:225,
      marginTop:5,
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
    padding:20,
    height: 70,
    backgroundColor: Colors.Primary, justifyContent: "center", alignItems: "center"
  },
  checkoutButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: Colors.Tertiary,
  }
})