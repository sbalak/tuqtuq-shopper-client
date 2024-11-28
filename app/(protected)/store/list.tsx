import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import RestaurantNearbyCard from '@/components/store/RestaurantNearbyCard';
import {API_URL} from '@env';
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/build/Ionicons';

export default function list() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Restaurants' });
  }, []);

  const loadRecentRestaurants = async() => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/restaurant/list?page=${currentPage}&pageSize=10&query=${search}`);
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

  
  const searchRecentRestaurants = async(searchText: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/restaurant/list?page=1&pageSize=10&query=${searchText}`);
      setRestaurants(response.data);
      setCurrentPage(2);
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

  const listFooterComponent = () => {
    return (
      <Text style={styles.footer}>You've reached the end</Text>
    );
  }

  useEffect(() => {
    loadRecentRestaurants();
  }, []);

  return (
    <View style={{flex:1}}>
      <FlatList data={restaurants}
                stickyHeaderIndices={[0]}
                renderItem={({item, index})=>(
                  <View style={{paddingHorizontal: 10}}>
                    <RestaurantNearbyCard restaurant={item} key={index} />
                  </View>
                )}
                keyExtractor={(item, index) => String(index)}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={
                  <View>        
                    <View style={searchStyles.searchContainer}>
                      <View style={searchStyles.searchTextInputContainer}>
                        <Ionicons name="search" size={20} style={{paddingTop:13}} color={Colors.LightGrey} /> 
                        <TextInput style={searchStyles.searchTextInput} 
                                  placeholderTextColor={Colors.LightGrey} 
                                  placeholder='Search' 
                                  value={search} 
                                  onChangeText={(text: string) => {
                                    setSearch(text); 
                                    searchRecentRestaurants(text);
                                  }}
                        />
                      </View>
                    </View>
                    <View style={styles.titleContainer}>
                      <Ionicons name="location-sharp" size={24} color={Colors.Primary} /> 
                      <Text style={styles.title}>Nearby Hotspots</Text>
                    </View>
                  </View> 
                }
                ListFooterComponent={listFooterComponent}
      />
    </View>
  )
}

const searchStyles = StyleSheet.create({
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
    flex:1,
    fontSize: 20,
    paddingRight:40
  }  
});

const styles = StyleSheet.create({
  titleContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.White,
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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