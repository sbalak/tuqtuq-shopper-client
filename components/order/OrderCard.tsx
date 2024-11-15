import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

export default function OrderCard({order}: {order: any}) {
  return (    
    <View style={styles.orderContainer}>
        <View style={styles.orderInfo}>
            <Text style={styles.orderTitle}>{order.restaurantName}</Text>
            <Text style={styles.orderSubtitle}>{order.restaurantLocality}</Text>
            <FlatList data={order.orderItems} scrollEnabled={false} renderItem={({item, index})=>(
                <Text style={styles.orderSubtitle}>{item.quantity} x {item.foodName}</Text>
            )} />
            <Text style={styles.orderSubtitle}>₹{order.totalPrice}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    orderContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',   
    },
    orderInfo: {
        marginTop: 7,
        marginLeft: 10
    },
    orderTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 18
    },
    orderSubtitle: {
        fontFamily: 'nunito-medium',
        fontSize: 14,
        color: Colors.LightGrey
    }
});