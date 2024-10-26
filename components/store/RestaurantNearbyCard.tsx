import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

export default function RestaurantNearbyCard({restaurant}: {restaurant: any}) {
  return (    
    <View style={styles.restaurantContainer}>
        <Image source={{uri:restaurant.photo}} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
            <Text style={styles.restaurantSubtitle}>{restaurant.locality}</Text>
            <Text style={styles.restaurantSubtitle}>{restaurant.cuisine} • 0.4 km</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    restaurantContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        
    },
    restaurantImage: {
        width: 130,
        height: 80,
        borderRadius:15
    },
    restaurantInfo: {
        marginTop: 7,
        marginLeft: 10
    },
    restaurantTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 18
    },
    restaurantSubtitle: {
        fontFamily: 'outfit',
        fontSize: 14,
        color: Colors.LightGrey
    }
});