import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetails() {
    const { id } = useLocalSearchParams();
    return (
        <SafeAreaView>
            <View>
                <Text>Order Details - {id}</Text>
            </View>
        </SafeAreaView>
    )
}