import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
          <Image style={styles.locator} source={require('@/assets/images/location.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.titleContainer} onPress={() => {}}>
          <Text style={styles.title}>Pickup • Now</Text>
          <View style={styles.locationName}>
              <Text style={styles.subtitle}>Syndicate Bank Colony</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/store/search')}>
          <Ionicons name='search' size={20} color={Colors.Primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/settings')}>
          <Ionicons name='person' size={20} color={Colors.Primary} />
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
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
  searchButton: {
      backgroundColor: Colors.LighterGrey,
      padding: 10,
      borderRadius: 50
  },
  profileButton: {
      backgroundColor: Colors.LighterGrey,
      padding: 10,
      borderRadius: 50
  },
})
