import { ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import OrderList from '@/components/order/OrderList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Order History' });
  }, []);
  
  return (
    <SafeAreaView>
      <ScrollView>
        <OrderList />
      </ScrollView>
    </SafeAreaView>
  )
}