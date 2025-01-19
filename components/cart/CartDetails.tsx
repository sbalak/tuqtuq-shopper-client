import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { common } from '@/constants/Styles';

export default function CartDetails() {
  const { authState } = useAuth();
    const [cart, setCart] = useState([]);
    
  const load = async() => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Cart/Details?userId=${authState.userId}`);
      setCart(response.data);
    }
    catch(error) {
    } 
  }
  
  const handleCheckout = async() => {
    try {
      await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Order/Confirm?userId=${authState.userId}`);
      router.replace('/order');
    }
    catch(error) {
    } 
  }
  
  const handleAddItem = async(restaurantId: string, foodId: string) => {
    try {
      await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Cart/Add?userId=${authState.userId}&restaurantId=${restaurantId}&foodId=${foodId}`);
      load();
    }
    catch(error) {
    } 
  }
  
  const handleRemoveItem = async(restaurantId: string, foodId: string) => {
    try {
      await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Cart/Remove?userId=${authState.userId}&restaurantId=${restaurantId}&foodId=${foodId}`);
      load();
    }
    catch(error) {
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
          <Text style={common.title}>{cart.restaurantName}</Text>
          <Text style={common.text}>{cart.restaurantLocality}</Text>
      </View>
      <View style={styles.detailsContainer}>
          <FlatList data={cart.cartItems} 
                    scrollEnabled={false} 
                    ItemSeparatorComponent={() => <View style={{ height:1, backgroundColor: Colors.LighterGrey, marginVertical: 10 }} />} 
                    renderItem={({item, index})=>( 
                      <View>
                          <View style={styles.dataRow}>
                              <Text style={common.defaultText}>{item.foodName}</Text>
                              <Text style={common.text}>{item.amount}</Text>
                          </View>
                          
                          <View style={cartStyles.cartItem}>
                              <Text style={[common.text, styles.itemPrice]}>{item.price}</Text>
                              <View style={cartStyles.cartButtonContainer}>
                                  <TouchableOpacity onPress={() => handleRemoveItem(cart.restaurantId, item.foodItemId)}>
                                      <Text style={cartStyles.cartButton}><Ionicons name="remove-circle" size={24} color="{color}" /></Text>
                                  </TouchableOpacity>
                                  <Text style={[common.defaultTitle, cartStyles.cartButtonText]}>{item.quantity}</Text>
                                  <TouchableOpacity onPress={() => handleAddItem(cart.restaurantId, item.foodItemId)}>
                                      <Text style={cartStyles.cartButton}><Ionicons name="add-circle" size={24} color="{color}" /></Text>
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                    )} 
          />
      </View>
      <View style={titleStyle.container}>
        <Text style={common.title}>Detailed Bill</Text>
      </View>
      <View style={styles.detailsContainer}>
          <View style={billStyles.billColumn}>
            <Text style={[common.defaultText, billStyles.billName]}>Total Tax</Text>
            <Text style={[common.defaultText, billStyles.billName]}>Total Bill</Text>
          </View>
          <View style={billStyles.billColumn}>
            <Text style={[common.text, billStyles.billValue]}>{cart.totalTaxAmount}</Text>
            <Text style={[common.text, billStyles.billValue]}>{cart.totalAmount}</Text>
          </View>
      </View>
      
      <View style={titleStyle.container}>
        <Text style={common.title}>Note</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={common.defaultText}>Please review your cart carefully to avoid any cancellations</Text>
      </View>
      
      <View style={checkoutStyle.checkoutButton}>
        <TouchableOpacity onPress={() => handleCheckout()}>
          <Text style={[common.defaultHeading, checkoutStyle.checkoutButtonText]}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    detailsContainer: {
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
    itemPrice: {
        marginTop: 7
    },
});

const titleStyle = StyleSheet.create({
  container: {
      marginVertical:10
  }
});

const cartStyles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartButtonContainer: {
      flexDirection: 'row', 
      gap: 20, 
      backgroundColor: Colors.Secondary, 
      marginTop:5, 
      borderRadius: 15
  },
  cartButton: {
      color: Colors.Primary
  },
  cartButtonText: {
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
      paddingBottom: 5,
  },
  billValue: {
      textAlign: 'right'
  }
});

const checkoutStyle = StyleSheet.create({
  checkoutButton: {
    marginTop: 10,
    borderRadius: 10,
    padding:10,
    height: 50,
    backgroundColor: Colors.Primary,
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  checkoutButtonText: {
    fontSize: 18,
    color: Colors.Secondary,
  }
});
