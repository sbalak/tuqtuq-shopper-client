import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { router } from 'expo-router';

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