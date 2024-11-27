import { SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import OrderList from '@/components/order/OrderList';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Order History' });
  }, []);
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{paddingHorizontal: 10}}>
        <OrderList />
      </ScrollView>
    </SafeAreaView>
  )
}