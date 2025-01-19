import { View, Text, ScrollView, FlatList, SafeAreaView, StyleSheet } from 'react-native'
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

              <View style={styles.detailsContainer}>
                <Text style={common.title}>Delivered</Text>
                <Text style={common.text}>Your order has been delivered</Text>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.dataRow}>
                  <Text style={[common.defaultHeading, styles.dataName]}>Order ID</Text>
                  <Text style={common.text}>PEEKY892732</Text>
                </View>
                <Text style={[common.title, styles.titleContainer]}>PeeKay Coffee</Text>
                
                <View style={styles.divider}></View>

                <View style={styles.dataRow}>
                  <Text style={[common.defaultText, styles.dataName]}>Item</Text>
                  <Text style={[common.defaultText, styles.dataQty]}>Qty.</Text>
                  <Text style={[common.defaultText, styles.dataAmount]}>Price</Text>
                </View>
                
                <View style={styles.divider}></View>

                <FlatList data={order.orderItems} scrollEnabled={false} renderItem={({item, index})=>(
                  <View style={styles.dataRow}>
                    <Text style={[common.text, styles.dataName]}>{item.foodName}</Text>
                    <Text style={[common.text, styles.dataQty]}>x {item.quantity}</Text>
                    <Text style={[common.text, styles.dataAmount]}>{item.amount}</Text>
                  </View>
                )} />
                
                <View style={styles.divider}></View>

                <View style={styles.dataRow}>
                  <Text style={[common.text, styles.dataTitle]}>Taxable Amount</Text>
                  <Text style={[common.text, styles.dataAmount]}>{order.totalTaxableAmount}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={[common.text,styles.dataTitle]}>Total Tax</Text>
                  <Text style={[common.text, styles.dataAmount]}>{order.totalTaxAmount}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[common.text, styles.dataTitle]}>Total Bill</Text>
                  <Text style={[common.text, styles.dataAmount]}>{order.totalAmount}</Text>
                </View>
                <View style={styles.divider}></View>
              </View>

              <Text style={[common.title, styles.titleContainer]}>Payment Details</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.dataRow}>
                  <Text style={[common.defaultHeading, styles.dataName]}>Paid Via</Text>
                  <Text style={common.text}>Google Pay</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={[common.defaultHeading, styles.dataName]}>Amount Paid</Text>
                  <Text style={common.text}>{order.totalAmount}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={[common.defaultHeading, styles.dataName]}>Transaction ID</Text>
                  <Text style={common.text}>PEETR892732</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={[common.defaultHeading, styles.dataName]}>Status</Text>
                  <Text style={[common.defaultText, styles.success]}>Success</Text>
                </View>
              </View>
            </ScrollView>
        </SafeAreaView>
    )
}

 const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 10
  },
  divider: {
    marginVertical: 10, 
    height: 1, 
    backgroundColor: Colors.LighterGrey
  },
  detailsContainer: { 
    backgroundColor: Colors.White, 
    padding: 10, 
    borderRadius: 10,
    marginTop: 10 
  },
  dataRow: {
    flexDirection: 'row', 
    paddingBottom: 5 
  },
  dataTitle: {
    width: 260
  },
  dataName: {
    width: 190
  },
  dataQty: {
    width: 70
  },
  dataAmount: {
    width: 110
  },
  success: {
    color: Colors.White, 
    paddingHorizontal:5, 
    paddingVertical:2.5, 
    borderRadius:5,
    backgroundColor: 'green' 
  }
});