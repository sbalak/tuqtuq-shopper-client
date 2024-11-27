import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import OrderCard from './OrderCard'
import { useFocusEffect } from 'expo-router';
import axios from 'axios';
import {API_URL} from '@env';
import { useAuth } from '@/hooks/useAuth';

export default function OrderList() {
  const { authState } = useAuth();
    const [orders, setOrders] = useState([]);
  
    const load = async() => {
      try {
        const response = await axios.get(`${API_URL}/order/list?userId=${authState.userId}`);
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
    paddingVertical:10
  },
  title: {
    fontSize:20,
    fontFamily: 'outfit-bold'
    },
})
