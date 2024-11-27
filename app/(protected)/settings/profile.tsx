import { Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';

export default function profile() {
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Edit Profile' });
  }, []); 
  
  return (
    <SafeAreaView>
      <Text>Profile Edit</Text>
    </SafeAreaView>
  )
}