import { View, Text, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { router, useFocusEffect } from 'expo-router';
import axios from 'axios';

export default function store() {
  const load = async() => {
    const response = await axios.get(`https://shoppingcart-sandbox.azurewebsites.net/api/restaurant/list`);
    console.log(response);

  }

  
  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [])
  );

  return (
    <View>
      <Text>Store Dashboard</Text>
      <Text>Test Store - </Text>
      
      <TouchableOpacity style={{ marginBottom: 20 }}>
          <Button color='#000' title="Store Details" onPress={() => router.navigate("/store/2")} ></Button>
        </TouchableOpacity>
    </View>
  )
}