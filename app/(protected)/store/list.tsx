import { View, Text, FlatList, StyleSheet, TextInput, Platform, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import RestaurantNearbyCard from '@/components/store/RestaurantNearbyCard';
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useLocation } from '@/hooks/useLocation';
import { common } from '@/constants/Styles';

export default function list() {
  const { locationState } = useLocation();
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
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/restaurant/list?latitude=${locationState.latitude}&longitude=${locationState.longitude}&page=${currentPage}&pageSize=10&query=${search}`);
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
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/restaurant/list?latitude=${locationState.latitude}&longitude=${locationState.longitude}&page=1&pageSize=10&query=${searchText}`);
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
    <SafeAreaView style={common.safeArea}>
      <FlatList data={restaurants}
                stickyHeaderIndices={[0]}
                renderItem={({item, index})=>(
                  <View style={common.container}>
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
                        <Ionicons name="search" size={20} style={searchStyles.searchIcon} color={Colors.LightGrey} /> 
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
    </SafeAreaView>
  )
}

const searchStyles = StyleSheet.create({
  searchContainer: {
    backgroundColor: Colors.Secondary,
    paddingHorizontal: 10,
  },
  searchTextInputContainer: { 
    ...Platform.select({
      ios: {
        paddingVertical: 10
      },
    }),
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    gap:10,
    borderRadius: 10,
    backgroundColor: Colors.LighterGrey,
  },
  searchTextInput: {
    flex:1,
    fontSize: 20,
    paddingRight:40
  },
  searchIcon: {
    ...Platform.select({
      ios: {
        paddingTop:2
      },
      android: {
        paddingTop:13
      }
    })
  }  
});

const styles = StyleSheet.create({
  titleContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.Secondary,
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