import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth';
import { router, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/build/Ionicons';

export default function index() {

  const { authState, logout } = useAuth();
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Settings' });
  }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex:1, paddingHorizontal: 10 }}>      
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Profile</Text>
      </View>
      <View style={profile.container}>
        <Ionicons name="person-circle" size={80} color={Colors.Primary}/> 
        <View style={profile.info}>
            <Text style={profile.title}>Sidharth Balakrishnan</Text>
            <Text style={profile.subtitle} onPress={() => router.navigate("/settings/profile")}>Edit Profile</Text>
        </View>        
      </View>
      <View style={{ marginVertical: 10, backgroundColor: '#fff', borderRadius: 10 }}>
        <TouchableOpacity style={{ padding: 10, marginVertical:10, gap: 15, flexDirection: 'row' }} onPress={() => router.navigate('/order')}>
          <Ionicons name="briefcase-outline" size={20} color={Colors.LightGrey} />
          <Text style={{ fontFamily: 'nunito-medium', color: Colors.LightGrey }}>Orders</Text>
        </TouchableOpacity>        
        <View style={styles.divider}></View>
        <TouchableOpacity style={{ padding: 10, marginVertical:10, gap: 15, flexDirection: 'row' }} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.LightGrey} />
          <Text style={{ fontFamily: 'nunito-medium', color: Colors.LightGrey }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
  },
  title: {
    fontSize:20,
    fontFamily: 'outfit-bold'
  },
  divider: {
      height:1,
      backgroundColor: Colors.LighterGrey, 
  }
})

const profile = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row'
  },
  info: {
      marginTop: 15,
      marginLeft: 10
  },
  title: {
      fontFamily: 'nunito-bold',
      fontSize: 18
  },
  subtitle: {
      fontFamily: 'nunito-medium',
      color: Colors.LightGrey
  }
})