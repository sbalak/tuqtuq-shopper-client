import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import RestaurantNearbyCard from '@/components/store/RestaurantNearbyCard';
import {API_URL} from '@env';
import { useNavigation } from 'expo-router';

export default function list() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Restaurants' });
  }, []);

  const loadRecentRestaurants = async() => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/restaurant/list?page=${currentPage}&pageSize=10`);
      if (response.data.length > 0) {
        setRestaurants((items) => items.concat(response.data));
        setCurrentPage(currentPage + 1);
      }
      setIsLoading(false);
    }
    catch(error) {
      console.log(error);
    } 
  }

  const onEndReached = async() => {
    if (!isLoading) {
      await loadRecentRestaurants();
    }
  }

  const listHeaderComponent = () => {
      return (        
        <View style={styles.titleContainer}>
          <Text style={styles.title}># Nearby Hotspots</Text>
        </View>
      );
  }

  const listFooterComponent = () => {
      return (
        <Text style={styles.footer}>You've reached the end</Text>
      );
  }

  useEffect(() => {
      loadRecentRestaurants();
  }, []);

  return (
    <View style={{paddingHorizontal:10}}>
      <FlatList data={restaurants}
                renderItem={({item, index})=>(<RestaurantNearbyCard restaurant={item} key={index} />)}
                keyExtractor={(item, index) => String(index)}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={listHeaderComponent}
                ListFooterComponent={listFooterComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize:20,
    fontFamily: 'outfit-bold'
  },
  footer: {
    fontFamily: 'nunito-medium', 
    color: Colors.LightGrey, 
    textAlign: "center",
    marginBottom:20
  }
})