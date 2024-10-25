import { View, TextInput, Button, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      if (result && result.error) {
        Alert.alert('Error', "Unauthorized, please check your email and password.");
      }
    } catch (error) {
      Alert.alert('Error', "Something went wrong, please try again later.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subTitle}>Hello there, welcome back!</Text>
      <View style={styles.textInputSection}>
        <Text style={styles.textInputTitle}>Email Address</Text>
        <View style={styles.textInputBox}>
          <TextInput style={styles.width_100} placeholderTextColor='#666' placeholder='Enter your email address' value={email} onChangeText={(text: string) => setEmail(text)}></TextInput>
        </View>
      </View>
      <View style={styles.textInputSection}>
        <Text style={styles.textInputTitle}>Password</Text>
        <View style={styles.textInputBox}>
          <TextInput style={styles.width_100} placeholderTextColor='#666' placeholder='Enter your password' value={password} onChangeText={(text: string) => setPassword(text)} secureTextEntry={true}></TextInput>
        </View>        
      </View>              
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>Don't have an account already? <Text style={styles.registerButton} onPress={() => router.navigate("/auth/register")}>Register</Text></Text>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20
  },
  textInputSection: {
    marginBottom: 20
  },
  textInputTitle: {
    fontSize: 16,  
    marginVertical: 10
  },
  textInputBox: { 
    width: "100%", 
    height: 50, 
    borderColor: '#e0e0e0', 
    borderWidth: 1, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingLeft: 20, 
    paddingRight: 20 
  },
  loginButton: {
    marginBottom: 20,
    height: 50,
    width: "100%",
    backgroundColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  registerText: {
    fontSize: 16, 
    textAlign: 'center'
  },
  registerButton: {
    color: Colors.Primary
  },
  width_100: {
    width: "100%"
  }
});