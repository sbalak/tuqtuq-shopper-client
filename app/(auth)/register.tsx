import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      const result = await register(email, password);
      if (!email || !password) {
        Alert.alert('Error!', "Please enter your email and password.");
      }
      else{
        if (result && result.error) {
          Alert.alert('Error!', "Unauthorized, please check your email and password.");
        }
      }      
    } catch (error) {
      Alert.alert('Error!', "Something went wrong, please try again later.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        <Text style={styles.brandTitle}>Takku</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subTitle}>Please enter your details!</Text>
        <View style={styles.textInputSection}>
          <Text style={styles.textInputTitle}>Email Address</Text>
          <View style={styles.textInput}>
            <TextInput style={styles.textInputBox} placeholderTextColor={Colors.LightGrey} placeholder='Enter your email address' value={email} onChangeText={(text: string) => setEmail(text)}></TextInput>
          </View>
        </View>
        <View style={styles.textInputSection}>
          <Text style={styles.textInputTitle}>Password</Text>
          <View style={styles.textInput}>
            <TextInput style={styles.textInputBox} placeholderTextColor={Colors.LightGrey} placeholder='Enter your password' value={password} onChangeText={(text: string) => setPassword(text)} secureTextEntry={true}></TextInput>
          </View>        
        </View>              
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Ionicons name="rocket-sharp" size={24} color={Colors.White} />
          <Text style={styles.registerButtonText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: Colors.White
  },
  brandContainer: {
    alignItems: "center",
    backgroundColor: Colors.Primary,
    paddingTop: 70,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  brandTitle: {
    color: Colors.White,
    fontFamily: 'dynapuff-semi',
    fontSize: 40,
  },
  loginContainer: {
    fontFamily: 'nunito-medium',
    backgroundColor: Colors.White,
    padding: 20
  },
  title: { 
    fontFamily: 'outfit-bold',
    fontSize: 28, 
    marginVertical: 10,
  },
  subTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 20,
    marginBottom: 20
  },
  textInputSection: {
    marginBottom: 20
  },
  textInputTitle: {
    fontFamily: 'nunito-medium',
    fontSize: 16,  
    marginVertical: 10
  },
  textInput: {
    width: "100%", 
    height: 50, 
    borderColor: Colors.Tertiary, 
    borderWidth: 1, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingLeft: 20, 
    paddingRight: 20 
  },
  textInputBox: {
    fontFamily: 'nunito-medium',
    width: "100%"
  },
  registerButton: {
    marginBottom: 20,
    height: 50,
    width: "100%",
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerButtonText: {
    fontFamily: 'nunito-medium',
    color: Colors.White,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
  },
});