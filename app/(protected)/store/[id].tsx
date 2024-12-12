import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SectionList, ListRenderItem, Platform, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';

export default function StoreDetails() {
  const { authState } = useAuth();
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState([]);
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [cartValue, setCartValue] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const loadRestaurantDetails = async() => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/restaurant/details?userId=${authState.userId}&restaurantId=${id}`);
      setRestaurant(response.data);
    }
    catch(error) {
      console.log(error);
    } 
  }
  
  const loadRestaurantMenu = async (searchText: string) => {
    try {
      if (!searchText) {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/restaurant/fooditems?userId=${authState.userId}&restaurantId=${id}`);
        setRestaurantMenu(response.data);
      }
      else {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/restaurant/fooditems?userId=${authState.userId}&restaurantId=${id}&searchText=${searchText}`);
        setRestaurantMenu(response.data);
      }
    }
    catch(error) {
      console.log(error);
    } 
  }
  
  const loadCartValue = async() => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/cart/value?userId=${authState.userId}&restaurantId=${id}`);
      setCartValue(response.data);
    }
    catch(error) {
      console.log(error);
    } 
  }

  const handleAddItem = async(restaurantId: string, foodId: string) => {
    try {
      await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Cart/Add?userId=${authState.userId}&restaurantId=${restaurantId}&foodId=${foodId}`);
        
        loadRestaurantDetails();
        loadRestaurantMenu('');
        loadCartValue();
    }
    catch(error) {
      console.log(error);
    } 
  }
  
  const handleRemoveItem = async(restaurantId: string, foodId: string) => {
    try {
      await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Cart/Remove?userId=${authState.userId}&restaurantId=${restaurantId}&foodId=${foodId}`);

        loadRestaurantDetails();
        loadRestaurantMenu('');
        loadCartValue();
    }
    catch(error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    navigation.setOptions({ headerTitle: restaurant.name });
  }, [restaurant.name]);

  useFocusEffect(
    React.useCallback(() => {
      loadRestaurantDetails();
      loadRestaurantMenu('');
      loadCartValue();
    }, [])
  );

  const renderItem: ListRenderItem<any> = ({item, index}) => (
    <View style={{backgroundColor: Colors.White, padding: 10, flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <Text style={foodStyles.foodTitle}>{item.name}</Text>
        <Text style={foodStyles.foodSubtitle}>Flavourful biriyani with a twist of chilli and salty chicken fry</Text>
        <Text style={foodStyles.foodSubtitle}>₹{item.price}</Text>
        <Image style={foodStyles.foodType} source={require('@/assets/images/veg.png')} />
      </View>
      <View>
        {item.photo ? 
          (<Image source={{uri:item.photo}} style={foodStyles.foodImage} />) :
          (<View style={foodStyles.emptyImage}></View>)
        }
        <View style={[cartStyles.cartButtonContainer]}>
          <TouchableOpacity onPress={() => handleRemoveItem(restaurant.id, item.id)}>
              <Text style={cartStyles.cartButton}><Ionicons name="remove-sharp" size={24} color="{color}" /></Text>
          </TouchableOpacity>
          <Text style={cartStyles.cartButtonText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleAddItem(restaurant.id, item.id)}>
              <Text style={cartStyles.cartButton}><Ionicons name="add-sharp" size={24} color="{color}" /></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex:1}}>      
      <View style={searchStyles.searchContainer}>
        <View style={searchStyles.searchTextInputContainer}>
          <Ionicons name="search" size={20} style={searchStyles.searchIcon}  color={Colors.Primary} /> 
          <TextInput style={searchStyles.searchTextInput} 
              placeholderTextColor={Colors.LightGrey} 
              placeholder='Search' 
              value={search} 
              onChangeText={(text: string) => {
                setSearch(text); 
                loadRestaurantMenu(text);
              }}
          ></TextInput>
        </View>
      </View>
      <SectionList 
        keyExtractor={(item, index) => `${item.id + index}`} 
        showsVerticalScrollIndicator={false}
        sections={restaurantMenu}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: Colors.LighterGrey}} />}
        SectionSeparatorComponent={() => <View style={{height: 1, backgroundColor: Colors.LighterGrey}} />}
        renderSectionHeader={({section: {title, index}}) => (
          <Text style={sectionStyles.sectionHeader}>{title}</Text>
        )}
        ListHeaderComponent={() => (
          (search.length === 0 ?
          (<View style={restaurantStyles.restaurantcontainer}>
            <View style={restaurantStyles.restaurantCard} >
              <Text style={restaurantStyles.restaurantSubtitle}>{restaurant.locality} • {restaurant.city} • 0.22 kms</Text>
              <Text style={restaurantStyles.restaurantSubtitle}>{restaurant.cuisine}</Text>
            </View>
          </View>) : (<View></View>))
        )}
        stickySectionHeadersEnabled={true}
      />
      {cartValue.quantity > 0 ? (
        <View style={checkoutStyles.checkoutButton}>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Text style={checkoutStyles.checkoutButtonText}>{cartValue.quantity} item{cartValue.quantity > 1 ? 's': null} added</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Ionicons name="arrow-forward-circle" size={30} color={Colors.Secondary} />
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  )
}

const searchStyles = StyleSheet.create({
  searchContainer: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: 10,
  },
  searchTextInputContainer: { 
    ...Platform.select({
      ios: {
        paddingVertical: 10
      },
    }),
    paddingHorizontal: 10,
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

const restaurantStyles = StyleSheet.create({
  restaurantcontainer: {
    backgroundColor: Colors.Secondary,
    paddingVertical: 10,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  restaurantSubtitle: {
    fontFamily: 'nunito-medium',
    fontSize: 14,
    color: Colors.LightGrey
  }
});

const foodStyles = StyleSheet.create({
  foodContainer: {
    backgroundColor: Colors.White,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  foodTitle: {
      fontFamily: 'nunito-bold',
      fontSize: 16,
      width:250,
  },
  foodSubtitle: {
      fontFamily: 'nunito-medium',
      fontSize: 14,
      width:250,
      marginTop:5,
      color: Colors.LightGrey
  },
  foodType: {
    height:20, 
    width:20, 
    marginTop:10
  },
  foodImage: {
      width: 120,
      height: 120,
      borderTopLeftRadius:15,
      borderTopRightRadius:15
  },  
  emptyImage: {
    width: 120,
    height: 60,
    backgroundColor: Colors.LighterGrey,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  }
});

const sectionStyles = StyleSheet.create({
  sectionHeader: {
    fontFamily: 'outfit-bold',
    padding: 10,
    fontSize: 20,
    backgroundColor: Colors.LighterGrey,
    color: Colors.Primary
  }
});

const checkoutStyles = StyleSheet.create({
  checkoutButton: {
    padding:20,
    height: 70,
    gap: 15,
    backgroundColor: Colors.Primary, 
    flexDirection:'row',
    justifyContent: "space-between", 
    alignItems: "center"
  },
  checkoutButtonText: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: Colors.Secondary,
  }
});

const cartStyles = StyleSheet.create({
  cartButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15, 
    backgroundColor: Colors.Secondary, 
    paddingLeft: 15, 
    paddingRight: 15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  cartButton: {
    color: Colors.Primary
  },
  cartButtonText: {
    fontFamily: 'outfit-bold',
    marginTop: 4,
    color: Colors.Primary
  }
});