import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { common } from '@/constants/Styles';

export default function OrderCard({order}: {order: any}) {
  return (    
    <View style={styles.container}>
        <Text style={common.subTitle}>{order.restaurantName}</Text>
        <Text style={common.text}>{order.restaurantLocality}</Text>
        <FlatList data={order.orderItems} style={{paddingVertical:10}} scrollEnabled={false} renderItem={({item, index})=>(
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.foodType} source={require('@/assets/images/veg.png')} />
                <Text style={common.text}>{item.foodName} (x{item.quantity})</Text>
            </View>
        )} />
        <View style={styles.amountRow}>
            <Text style={[common.text, {paddingTop:2.5}]}>{order.totalAmount}</Text>
            <TouchableOpacity onPress={() => router.push('/order/'+ order.orderId)}>
                <Ionicons name="arrow-forward-circle" size={24} color={Colors.Primary} />
            </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>
        <View>
            <Text style={common.text}>{order.dateOrdered}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        padding:10,
        marginBottom:10, 
    },
    foodType: {
      height:20, 
      width:20,
      marginRight: 5
    },
    amountRow: {
        display: 'flex', 
        gap:15, 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    divider: {
        height:1,
        marginVertical: 10, 
        backgroundColor: Colors.LighterGrey, 
    }
});