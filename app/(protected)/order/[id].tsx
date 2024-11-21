import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetails() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    
    useEffect(() => {
      navigation.setOptions({ headerTitle: 'Order History' });
    }, []);
    
    return (
        <SafeAreaView>
            <View>
                <Text>Order Details - {id}</Text>
            </View>
        </SafeAreaView>
    )
}