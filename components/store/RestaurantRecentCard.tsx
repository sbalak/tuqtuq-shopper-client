import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function RestaurantRecentCard({restaurant}: {restaurant: any}) {
  return (    
    <TouchableOpacity style={styles.restaurantContainer} onPress={() => router.push('/store/'+restaurant.id)}>
        <Image source={{uri:restaurant.photo}} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
            <Text style={styles.restaurantSubtitle}>{restaurant.locality}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    restaurantContainer: {
        backgroundColor: Colors.White,
        marginRight: 10,
        padding: 10,
        borderRadius: 15
    },
    restaurantImage: {
        width: 180,
        height: 120,
        borderRadius:15
    },
    restaurantInfo: {
        marginTop:7
    },
    restaurantTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 14
    },
    restaurantSubtitle: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.LightGrey
    }
});