import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import OrderCard from './OrderCard'
import { useFocusEffect } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
  
    const load = async() => {
      try {
        const response = await axios.get(`https://shoppingcart-sandbox.azurewebsites.net/api/order/list?userId=1`);
        setOrders(response.data);
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
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Past Orders</Text>
      </View>
      <FlatList data={orders} scrollEnabled={false} renderItem={({item, index})=>(<OrderCard order={item} key={index} />)} />
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom:10,
    marginTop:10
  },
  title: {
    fontSize:20,
    fontFamily: 'outfit-bold'
    },
})
