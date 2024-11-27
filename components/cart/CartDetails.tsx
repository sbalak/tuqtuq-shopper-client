import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {API_URL} from '@env';
import { useAuth } from '@/hooks/useAuth';

export default function CartDetails() {
  const { authState } = useAuth();
    const [cart, setCart] = useState([]);
    
  const load = async() => {
    try {
      const response = await axios.get(`${API_URL}/Cart/Details?userId=${authState.userId}`);
      setCart(response.data);
    }
    catch(error) {
      console.log(error);
    } 
  }
  
  const handleCheckout = async() => {
    try {
      await axios.get(`${API_URL}/Order/Confirm?userId=${authState.userId}`);
      router.replace('/order');
    }
    catch(error) {
      console.log(error);
    } 
  }
  
  const handleAddItem = async(restaurantId: string, foodId: string) => {
    try {
      await axios.get(`${API_URL}/Cart/Add?userId=${authState.userId}&restaurantId=${restaurantId}&foodId=${foodId}`);
      load();
    }
    catch(error) {
      console.log(error);
    } 
  }
  
  const handleRemoveItem = async(restaurantId: string, foodId: string) => {
    try {
      await axios.get(`${API_URL}/Cart/Remove?userId=${authState.userId}&restaurantId=${restaurantId}&foodId=${foodId}`);
      load();
    }
    catch(error) {
      console.log(error);
    } 
  }

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [])
  );
  
  return (
    <View>
      <View style={titleStyle.container}>
          <Text style={titleStyle.title}>{cart.restaurantName}</Text>
          <Text style={titleStyle.subTitle}>{cart.restaurantLocality}</Text>
      </View>
      <View style={styles.detailsContainer}>
          <FlatList data={cart.cartItems} 
                    scrollEnabled={false} 
                    ItemSeparatorComponent={() => <View style={{ height:1, backgroundColor: Colors.LighterGrey, marginVertical: 10 }} />} 
                    renderItem={({item, index})=>( 
                      <View>
                          <View style={styles.dataRow}>
                              <Text style={styles.dataName}>{item.foodName}</Text>
                              <Text style={styles.dataValue}>{item.amount}</Text>
                          </View>
                          
                          <View style={cartStyles.cartItem}>
                              <Text style={styles.itemPrice}>{item.price}</Text>
                              <View style={cartStyles.cartButtonContainer}>
                                  <TouchableOpacity onPress={() => handleRemoveItem(cart.restaurantId, item.foodItemId)}>
                                      <Text style={cartStyles.cartButton}><Ionicons name="remove-sharp" size={24} color="{color}" /></Text>
                                  </TouchableOpacity>
                                  <Text style={cartStyles.cartButtonText}>{item.quantity}</Text>
                                  <TouchableOpacity onPress={() => handleAddItem(cart.restaurantId, item.foodItemId)}>
                                      <Text style={cartStyles.cartButton}><Ionicons name="add-sharp" size={24} color="{color}" /></Text>
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                    )} 
          />
      </View>
      <View style={titleStyle.container}>
        <Text style={titleStyle.title}>Detailed Bill</Text>
      </View>
      <View style={styles.detailsContainer}>
          <View style={billStyles.billColumn}>
            <Text style={billStyles.billName}>Total Tax</Text>
            <Text style={billStyles.billName}>Total Bill</Text>
          </View>
          <View style={billStyles.billColumn}>
            <Text style={billStyles.billValue}>{cart.totalTaxAmount}</Text>
            <Text style={billStyles.billValue}>{cart.totalAmount}</Text>
          </View>
      </View>
      
      <View style={titleStyle.container}>
        <Text style={titleStyle.title}>Note</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={{ fontFamily:'nunito-medium' }}>Please review your cart carefully to avoid any cancellations</Text>
      </View>
      
      <View style={checkoutStyle.checkoutButton}>
        <TouchableOpacity onPress={() => handleCheckout()}>
          <Text style={checkoutStyle.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    detailsContainer: {
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',   
    },
    dataRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dataName: {
        fontFamily: 'nunito-medium',
    },
    dataValue: {
        fontFamily: 'nunito-medium',
        color: Colors.LightGrey
    },
    itemPrice: {
        marginTop: 7,
        fontFamily: 'nunito-medium',
        color: Colors.LightGrey
    },
});

const titleStyle = StyleSheet.create({
  container: {
      paddingHorizontal: 10,
      marginVertical:10
  },
  title: {
      fontSize:20,
      fontFamily: 'outfit-bold'
  },
  subTitle: {
      color: Colors.LightGrey, 
      fontFamily: 'nunito-medium'
  }
});

const cartStyles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartButtonContainer: {
      flexDirection: 'row', 
      gap: 15, 
      backgroundColor: Colors.Tertiary, 
      paddingHorizontal: 15,
      marginTop:5, 
      borderRadius: 15
  },
  cartButton: {
      fontFamily: 'nunito-medium',
      color: Colors.Primary
  },
  cartButtonText: {
      fontFamily: 'nunito-medium',
      marginTop: 4,
      color: Colors.Primary
  }
});

const billStyles = StyleSheet.create({
  billColumn: {
    width:100,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  billName: {
      fontFamily: 'nunito-medium',
      paddingBottom: 5,
  },
  billValue: {
      fontFamily: 'nunito-medium',
      color: Colors.LightGrey,
      textAlign: 'right'
  }
});

const checkoutStyle = StyleSheet.create({
  checkoutButton: {
    margin: 10,
    borderRadius: 15,
    padding:10,
    backgroundColor: Colors.Primary,
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  checkoutButtonText: {
    fontFamily: 'nunito-bold',
    color: Colors.Tertiary,
  }
});
