import { View, Text, TouchableOpacity, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import { router, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import RestaurantCard from '@/components/store/RestaurantCard';

export default function store() {  
  const [businessList, setBusinessList] = useState([]);

  const load = async() => {
    try {
      const response = await axios.get(`https://shoppingcart-sandbox.azurewebsites.net/api/restaurant/list`);
      setBusinessList(response.data);
    }
    catch(err) {
      console.log(err)
    }
  }
    
  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [])
  );
  //{() => router.navigate("/store/2")}
  return (
    <View>
      <View style={{ 
            paddingLeft: 20,
            marginBottom:10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop:10
        }}>
            <Text style={{
                fontSize:20,
                fontFamily: 'outfit-bold'
                }}>Popular Business</Text>
            <Text style={{
                color: Colors.Primary, 
                fontFamily: 'outfit-medium'
            }}>View All</Text>
        </View>
        <FlatList
          data={businessList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index})=>(
            <RestaurantCard
              business={item} key={index}
            />
          )}
        />
    </View>
  )
}