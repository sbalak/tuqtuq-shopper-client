import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useLocation } from '@/hooks/useLocation'
import { SafeAreaView } from 'react-native-safe-area-context'

const StoreHeader = () => {
    const { locationState, setLocality} = useLocation();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => {}}>
                <Image style={styles.locator} source={require('@/assets/images/location.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleContainer} onPress={setLocality}>
                <Text style={styles.title}>Pickup • Now</Text>
                <View style={styles.locationName}>
                    <Text style={styles.subtitle}>{locationState.locality}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderButton} onPress={() => router.push('/order')}>
                <Ionicons name='receipt' size={20} color={Colors.Primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/search')}>
                <Ionicons name='search' size={20} color={Colors.Primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/settings')}>
                <Ionicons name='person' size={20} color={Colors.Primary} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default StoreHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  locator: {
      width: 30,
      height: 30
  },
  titleContainer: {
      flex: 1
  },
  title: {
      fontSize: 14,
      fontFamily: 'outfit',
      color: Colors.LightGrey
  },
  locationName: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  subtitle: {
      fontSize: 16,
      fontFamily: 'outfit-medium'
  },
  orderButton: {
      padding: 10
  },
  searchButton: {
      padding: 10
  },
  profileButton: {
      backgroundColor: Colors.Tertiary,
      padding: 10,
      borderRadius: 50
  },
})
