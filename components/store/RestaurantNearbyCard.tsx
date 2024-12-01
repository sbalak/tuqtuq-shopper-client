import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function RestaurantNearbyCard({restaurant}: {restaurant: any}) {
  return (    
    <TouchableOpacity style={styles.restaurantContainer} onPress={() => router.push('/store/'+restaurant.id)}>
        <Image source={{uri:restaurant.photo}} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
            <Text style={styles.restaurantSubtitle}>{restaurant.locality}</Text>
            <Text style={styles.restaurantSubtitle}>{restaurant.cuisine} • {restaurant.distance} kms</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    restaurantContainer: {
        backgroundColor: Colors.White,
        marginBottom: 10,
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
    },
    restaurantImage: {
        width: 125,
        height: 125,
        borderRadius:15
    },
    restaurantInfo: {
        marginTop: 7,
        marginLeft: 10,
        width:240,
    },
    restaurantTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 18
    },
    restaurantSubtitle: {
        fontFamily: 'nunito-medium',
        color: Colors.LightGrey
    }
});