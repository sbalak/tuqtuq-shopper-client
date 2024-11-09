import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import axios from 'axios'

export default function FoodItemWithoutPhoto({food}: {food: any}) {

  
    const handleAddItem = async(userId: string, restaurantId: string, foodId: string) => {
        try {
          const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/Cart/Add`,
            {
              params: {
                userId: '1',
                restaurantId: restaurantId,
                foodId: foodId
              },
            });
          //load();
        }
        catch(error) {
          console.log(error);
        } 
      }
      
      const handleRemoveItem = async(userId: string, restaurantId: string, foodId: string) => {
        try {
          const response = await axios.get(`https://shopper-development-api.azurewebsites.net/api/Cart/Remove`,
            {
              params: {
                userId: '1',
                restaurantId: restaurantId,
                foodId: foodId
              },
            });
          //load();
        }
        catch(error) {
          console.log(error);
        } 
      }
    

  return (
    <View style={styles.foodContainer}>
        <View style={styles.foodDetailsContainer}>
            <Text style={styles.foodTitle}>{food.name}</Text>
            <Text style={styles.foodSubtitle}>₹ {food.itemPrice}</Text>
        </View>
        <View>
            <View style={styles.cartButtonContainer}>
                <TouchableOpacity onPress={() => handleRemoveItem('1', '1', food.id)}>
                    <Text style={styles.cartButton}><Ionicons name="remove-sharp" size={24} color="{color}" /></Text>
                </TouchableOpacity>
                <Text style={styles.cartButtonText}>{food.quantity}</Text>
                <TouchableOpacity onPress={() => handleAddItem('1', '1', food.id)}>
                    <Text style={styles.cartButton}><Ionicons name="add-sharp" size={24} color="{color}" /></Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    foodContainer: {
      backgroundColor: Colors.White,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
      padding: 10,
      borderRadius: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    foodDetailsContainer: {
    },
    foodTitle: {
        fontFamily: 'outfit-medium',
        fontSize: 18
    },
    foodSubtitle: {
        fontFamily: 'outfit',
        fontSize: 16,
        color: Colors.LightGrey
    },
    cartButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 15, 
      backgroundColor: Colors.Primary, 
      width: 130,
      paddingLeft: 15, 
      paddingRight: 15,
      borderRadius: 15
  },
  cartButton: {
      fontFamily: 'outfit',
      fontSize: 20,
      color: Colors.LighterGrey
  },
  cartButtonText: {
      fontFamily: 'outfit',
      marginTop: 4,
      fontSize: 14,
      color: Colors.LighterGrey
  },
})