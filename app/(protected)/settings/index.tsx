import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/hooks/useAuth';
import { Link, router } from 'expo-router';

export default function index() {

  const { authState, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ paddingTop: 150 }}>
      <Text>Settings Landing Page</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <Text style={{ color: '#000', fontWeight: 'bold' }} onPress={() => router.navigate("/settings/profile")}>Profile Edit</Text>
    </View>
  )
}