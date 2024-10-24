import { View, Text } from 'react-native'
import React from 'react'
import { useFocusEffect } from 'expo-router';
import axios from 'axios';

export default function index() {
  
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
      <Text>index</Text>
    </View>
  )
}