import { FlatList, StyleSheet, View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import OrderCard from '@/components/order/OrderCard';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { common } from '@/constants/Styles';

export default function Index() {
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();

  const loadOrders = async() => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/order/list?userId=${authState.userId}&page=${currentPage}&pageSize=10`);
      if (response.data.length > 0) {
        setOrders((items) => items.concat(response.data));
        setCurrentPage(currentPage + 1);
      }
      setIsLoading(false);
    }
    catch(error) {
      console.log(error);
    } 
  }

  const onEndReached = async() => {
    if (!isLoading) {
      await loadOrders();
    }
  }

  const listFooterComponent = () => {
    return (
      <Text style={[common.text, styles.footer]}>You've reached the end</Text>
    );
  }
  
  useFocusEffect(
    React.useCallback(() => {
      loadOrders();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Order History' });
  }, []);
  
  return (
    <SafeAreaView style={common.safeArea}>
      <FlatList data={orders} 
                style={common.container}
                renderItem={({item, index})=>(
                  <OrderCard order={item} key={index} />
                )}
                keyExtractor={(item, index) => String(index)}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={            
                  <View style={styles.titleContainer}>
                    <Text style={common.heading}>Past Orders</Text>
                  </View>
                }
                ListFooterComponent={listFooterComponent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical:10
  },
  footer: {
    textAlign: "center",
    marginBottom:20
  }
})