import { Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import { common } from '@/constants/Styles';

export default function profile() {
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Edit Profile' });
  }, []); 
  
  return (
    <SafeAreaView style={common.safeArea}>
      <ScrollView style={common.container}>
        <Text>Profile Edit</Text>
      </ScrollView>
    </SafeAreaView>
  )
}