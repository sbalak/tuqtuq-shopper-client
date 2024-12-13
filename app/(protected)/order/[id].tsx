import { View, Text, ScrollView, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { common } from '@/constants/Styles';

export default function OrderDetails() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    
    useEffect(() => {
      navigation.setOptions({ headerTitle: 'Order Details' });
    }, []);
    
    const [order, setOrder] = useState([]);
  
    const load = async() => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/order/details?id=${id}`);
        setOrder(response.data);
      }
      catch(error) {
        console.log(error);
      } 
    }
  
    useFocusEffect(
      React.useCallback(() => {
        load();
      }, [])
    );
    
    return (
        <SafeAreaView style={common.safeArea}>
            <ScrollView style={common.container}>
              <View style={{ backgroundColor: Colors.White, padding: 10, borderRadius: 10, marginTop: 10 }}>
                <Text style={common.heading}>Delivered</Text>
                <Text style={common.text}>Your order has been delivered</Text>
              </View>

              <View style={{ backgroundColor: Colors.White, padding: 10, borderRadius: 10, marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[common.defaultTitle, {width: 190}]}>Order ID</Text>
                  <Text style={common.text}>PEEKY892732</Text>
                </View>
                <Text style={[common.heading, {marginVertical: 20}]}>PeeKay Coffee</Text>
                <View style={{marginBottom: 10, height: 1, backgroundColor: Colors.LighterGrey}}></View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[common.defaultText, {width: 190}]}>Item</Text>
                  <Text style={[common.defaultText, {width: 70}]}>Qty.</Text>
                  <Text style={[common.defaultText, {width: 110}]}>Price</Text>
                </View>
                <View style={{marginVertical: 10, height: 1, backgroundColor: Colors.LighterGrey}}></View>
                <FlatList data={order.orderItems} scrollEnabled={false} renderItem={({item, index})=>(
                  <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                    <Text style={[common.text, {width: 190}]}>{item.foodName}</Text>
                    <Text style={[common.text, {width: 70}]}>x {item.quantity}</Text>
                    <Text style={[common.text, {width: 110}]}>{item.amount}</Text>
                  </View>
                )} />
                
                <View style={{marginVertical: 10, height: 1, backgroundColor: Colors.LighterGrey}}></View>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={[common.text, {width: 260}]}>Taxable Amount</Text>
                  <Text style={[common.text, {width: 110}]}>{order.totalTaxableAmount}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={[common.text, {width: 260}]}>Total Tax</Text>
                  <Text style={[common.text, {width: 110}]}>{order.totalTaxAmount}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[common.text, {width: 260}]}>Total Bill</Text>
                  <Text style={[common.text, {width: 110}]}>{order.totalAmount}</Text>
                </View>
                <View style={{marginVertical: 10, height: 1, backgroundColor: Colors.LighterGrey}}></View>
              </View>

              <Text style={[common.heading, {paddingVertical: 10}]}>Payment Details</Text>
              <View style={{ backgroundColor: Colors.White, padding: 10, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={[common.defaultTitle, {width: 190}]}>Paid Via</Text>
                  <Text style={common.text}>Google Pay</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={[common.defaultTitle, {width: 190}]}>Amount Paid</Text>
                  <Text style={common.text}>{order.totalAmount}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={[common.defaultTitle, {width: 190}]}>Transaction ID</Text>
                  <Text style={common.text}>PEETR892732</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[common.defaultTitle, {width: 190}]}>Status</Text>
                  <Text style={[common.defaultText, {color: Colors.White, paddingHorizontal:5, paddingVertical:2.5, borderRadius:5,backgroundColor: 'green' }]}>Success</Text>
                </View>
              </View>
            </ScrollView>
        </SafeAreaView>
    )
}