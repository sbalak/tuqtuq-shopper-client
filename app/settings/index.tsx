import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/hooks/useAuth';

export default function index() {

  const { authState, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      const result = await logout();
    }
    catch (error) {
      console.log("line-14 -> settings/index.tsx: [EXCEPTION] ", error);
    }
  }

  return (
    <View style={{ paddingTop: 50 }}>
      <Text>Settings Landing Page</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}