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
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Delivered</Text>
                <Text style={{ fontFamily: 'nunito-medium', color: Colors.LightGrey }}>Your order has been delivered</Text>
              </View>

              <View style={{ backgroundColor: Colors.White, padding: 10, borderRadius: 10, marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: 190, fontFamily: 'nunito-bold' }}>Order ID</Text>
                  <Text style={{ fontFamily: 'nunito-medium', color: Colors.LightGrey }}>PEEKY892732</Text>
                </View>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, marginVertical: 20 }}>PeeKay Coffee</Text>
                <View style={{marginBottom: 10, height: 1, backgroundColor: Colors.LighterGrey}}></View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: 190, fontFamily: 'nunito-medium' }}>Item</Text>
                  <Text style={{ width: 70, fontFamily: 'nunito-medium' }}>Qty.</Text>
                  <Text style={{ width: 110, fontFamily: 'nunito-medium' }}>Price</Text>
                </View>
                <View style={{marginVertical: 10, height: 1, backgroundColor: Colors.LighterGrey}}></View>
                <FlatList data={order.orderItems} scrollEnabled={false} renderItem={({item, index})=>(
                  <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                    <Text style={{ width: 190, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>{item.foodName}</Text>
                    <Text style={{ width: 70, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>x {item.quantity}</Text>
                    <Text style={{ width: 110, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>{item.amount}</Text>
                  </View>
                )} />
                
                <View style={{marginVertical: 10, height: 1, backgroundColor: Colors.LighterGrey}}></View>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={{ width: 260, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>Taxable Amount</Text>
                  <Text style={{ width: 110, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>{order.totalTaxableAmount}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={{ width: 260, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>Total Tax</Text>
                  <Text style={{ width: 110, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>{order.totalTaxAmount}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: 260, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>Total Bill</Text>
                  <Text style={{ width: 110, fontFamily: 'nunito-medium', color: Colors.LightGrey }}>{order.totalAmount}</Text>
                </View>
                <View style={{marginVertical: 10, height: 1, backgroundColor: Colors.LighterGrey}}></View>
              </View>

              <Text style={{ fontFamily: 'outfit-bold', paddingVertical: 10, fontSize: 20 }}>Payment Details</Text>
              <View style={{ backgroundColor: Colors.White, padding: 10, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={{ width: 190, fontFamily: 'nunito-bold' }}>Paid Via</Text>
                  <Text style={{ fontFamily: 'nunito-medium', color: Colors.LightGrey }}>Google Pay</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={{ width: 190, fontFamily: 'nunito-bold' }}>Amount Paid</Text>
                  <Text style={{ fontFamily: 'nunito-medium', color: Colors.LightGrey }}>{order.totalAmount}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={{ width: 190, fontFamily: 'nunito-bold' }}>Transaction ID</Text>
                  <Text style={{ fontFamily: 'nunito-medium', color: Colors.LightGrey }}>PEETR892732</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: 190, fontFamily: 'nunito-bold' }}>Status</Text>
                  <Text style={{ fontFamily: 'nunito-medium', color: Colors.White, paddingHorizontal:5, paddingVertical:2.5, borderRadius:5,backgroundColor: 'green' }}>Success</Text>
                </View>
              </View>
            </ScrollView>
        </SafeAreaView>
    )
}