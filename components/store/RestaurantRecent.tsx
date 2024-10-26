import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import RestaurantRecentCard from './RestaurantRecentCard'

export default function RestaurantRecent({restaurants}: {restaurants: any}) {
  return (
    <View style={styles.recentVisitContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Your Recent Visits</Text>
            <Text style={styles.viewAll}>View All</Text>
        </View>
        <FlatList data={restaurants} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({item, index})=>(<RestaurantRecentCard restaurant={item} key={index} />)} />
    </View>
  )
}

const styles = StyleSheet.create({
    recentVisitContainer: {
      marginTop: 10,
      marginBottom: 10
    },
    titleContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom:10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop:10
    },
    title: {
      fontSize:20,
      fontFamily: 'outfit-bold'
      },
    viewAll: {
      color: Colors.Primary, 
      fontFamily: 'outfit-medium'
    }
  })
  