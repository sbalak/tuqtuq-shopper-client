import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function OrderDetails() {
    const { id } = useLocalSearchParams();

    return (
        <View>
        <Text>Order Details - {id}</Text>
        </View>
    )
}