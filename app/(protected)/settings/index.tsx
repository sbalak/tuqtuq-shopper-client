import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth';
import { router, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { common } from '@/constants/Styles';

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
    }
  }

  return (
    <SafeAreaView style={common.safeArea}>
      <ScrollView style={common.container}>
        <View style={styles.titleContainer}>
            <Text style={common.heading}>Your Profile</Text>
        </View>
        <View style={profile.container}>
          <Ionicons name="person-circle" size={80} color={Colors.Primary}/> 
          <View style={profile.info}>
              <Text style={[common.defaultTitle, profile.title]}>Sidharth Balakrishnan</Text>
              <Text style={common.text} onPress={() => router.navigate("/settings/profile")}>Edit Profile</Text>
          </View>        
        </View>
        <View style={{ marginVertical: 10, backgroundColor: '#fff', borderRadius: 10 }}>
          <TouchableOpacity style={{ padding: 10, marginVertical:10, gap: 15, flexDirection: 'row' }} onPress={() => router.navigate('/order')}>
            <Ionicons name="briefcase-outline" size={20} color={Colors.LightGrey} />
            <Text style={common.text}>Orders</Text>
          </TouchableOpacity>        
          <View style={styles.divider}></View>
          <TouchableOpacity style={{ padding: 10, marginVertical:10, gap: 15, flexDirection: 'row' }} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={Colors.LightGrey} />
            <Text style={common.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
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
      fontSize: 18
  }
})