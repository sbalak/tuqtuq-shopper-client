import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function RestaurantRecentCard({restaurant}: {restaurant: any}) {
  return (    
    <View style={styles.restaurantContainer}>
        <Image source={{uri:restaurant.photo}} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
            <Text style={styles.restaurantSubtitle}>{restaurant.locality}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    restaurantContainer: {
        marginLeft: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15
    },
    restaurantImage: {
        width: 130,
        height: 80,
        borderRadius:15
    },
    restaurantInfo: {
        marginTop:7
    },
    restaurantTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 16
    },
    restaurantSubtitle: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.Gray
    }
});