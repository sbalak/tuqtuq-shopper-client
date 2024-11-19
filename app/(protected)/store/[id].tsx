import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, SectionList, ListRenderItem, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoreDetails() {
    const { id } = useLocalSearchParams();
    const [restaurant, setRestaurant] = useState([]);
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [cartValue, setCartValue] = useState([]);
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
    
    const loadRestaurantMenu = async (searchText: string) => {
      try {
        if (!searchText) {
          const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/restaurant/fooditems?userId=1&restaurantId=`+id);
          setRestaurantMenu(response.data);
        }
        else {
          const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/restaurant/fooditems?userId=1&restaurantId=`+id+`&searchText=`+searchText);
          setRestaurantMenu(response.data);
        }
      }
      catch(error) {
        console.log(error);
      } 
    }
    
    const loadCartValue = async() => {
      try {
        const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/cart/value?userId=1&restaurantId=`+id);
        setCartValue(response.data);
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
         //search ? filterRestaurantDetails(search) :  loadRestaurantDetails();
         
         loadRestaurantDetails();
         loadRestaurantMenu();
         loadCartValue();
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
          //search ? filterRestaurantDetails(search) :  loadRestaurantDetails();
          
         loadRestaurantDetails();
         loadRestaurantMenu();
         loadCartValue();
      }
      catch(error) {
        console.log(error);
      } 
    }
  
    useFocusEffect(
      React.useCallback(() => {
        loadRestaurantDetails();
        loadRestaurantMenu();
        loadCartValue();
      }, [])
    );

    const renderItem: ListRenderItem<any> = ({item, index}) => (
      <View style={{backgroundColor: Colors.White, padding: 10, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'nunito-bold'}}>{item.name}</Text>
            <Text style={{fontFamily: 'nunito-medium', color: Colors.LightGrey}}>Flavourful biriyani with a twist of chilli and salty chicken fry</Text>
            <Text style={{fontFamily: 'nunito-medium', color: Colors.LightGrey}}>₹{item.price}</Text>
          </View>
          <View>
            <Image source={{uri:item.photo}} style={styles.foodImage} />
            <View style={[styles.cartButtonContainer]}>
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
    );

    return (
      <SafeAreaView style={{flex:1}}>
          <SectionList 
            keyExtractor={(item, index) => `${item.id + index}`} 
            showsVerticalScrollIndicator={false}
            sections={restaurantMenu}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: Colors.LighterGrey}} />}
            SectionSeparatorComponent={() => <View style={{height: 1, backgroundColor: Colors.LighterGrey}} />}
            renderSectionHeader={({section: {title, index}}) => (
              <Text style={{
                fontFamily: 'outfit-bold',
                padding: 10,
                fontSize: 18,
                backgroundColor: 'white'
              }}>{title}</Text>
            )}
            ListHeaderComponent={() => (
              <View style={styles.restaurantcontainer}>
                <View style={styles.restaurantCard} >
                  <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                  <Text style={styles.restaurantSubtitle}>{restaurant.locality} • {restaurant.city} • 0.22 kms</Text>
                  <Text style={styles.restaurantSubtitle}>{restaurant.cuisine}</Text>
                </View>
              </View>
            )}
            stickySectionHeadersEnabled={true}
          />
          <View style={styles.searchContainer}>
            <View style={styles.searchTextInputContainer}>
              <Ionicons name="search" size={30} color={Colors.Primary} /> 
              <TextInput style={styles.searchTextInput} placeholderTextColor={Colors.LightGrey} placeholder='Search' value={search} onChangeText={(text: string) => {setSearch(text); loadRestaurantMenu(text);}} ></TextInput>
            </View>
          </View>
          {cartValue.quantity > 0 ? (
            <View style={styles.checkoutButton}>
              <TouchableOpacity onPress={() => router.push('/cart')}>
                <Text style={styles.checkoutButtonText}>{cartValue.quantity} item{cartValue.quantity > 1 ? 's': null} added</Text>
              </TouchableOpacity>
            </View>
          ) : null}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  restaurantcontainer: {
    backgroundColor: Colors.Tertiary,
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
    fontFamily: 'nunito-medium',
    fontSize: 14,
    color: Colors.LightGrey
  },
  searchContainer: {
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
  },
  searchTextInputContainer: { 
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    gap:10,
    borderRadius: 10,
    backgroundColor: Colors.LighterGrey,
  },
  searchTextInput: {
    fontFamily: 'nunito-medium',
    fontSize: 18,
    paddingRight:40
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
      fontFamily: 'nunito-bold',
      width:225,
      fontSize: 17
  },
  foodSubtitle: {
      fontFamily: 'nunito-medium',
      fontSize: 14,
      width:225,
      marginTop:5,
      color: Colors.LightGrey
  },
  foodImage: {
      width: 120,
      height: 120,
      borderTopLeftRadius:15,
      borderTopRightRadius:15
  },
  checkoutButton: {
    padding:20,
    height: 70,
    backgroundColor: Colors.Primary, justifyContent: "center", alignItems: "center"
  },
  checkoutButtonText: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: Colors.Tertiary,
  },


  
  cartButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15, 
    backgroundColor: Colors.Tertiary, 
    paddingLeft: 15, 
    paddingRight: 15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  cartButton: {
    fontFamily: 'nunito-medium',
    fontSize: 20,
    color: Colors.Primary
  },
  cartButtonText: {
    fontFamily: 'nunito-medium',
    marginTop: 4,
    fontSize: 14,
    color: Colors.Primary
  },
})