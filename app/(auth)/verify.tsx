import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { OtpInput } from "react-native-otp-entry";
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const verify = () => {
  const { username } = useLocalSearchParams();
  const [ code, setCode ] = useState('');
  const [ key, setKey ] = useState(1);
  const [ expired, setExpired ] = useState(false);
  const { verify } = useAuth();

  const handleVerify = async () => {
    try {
      console.log('called handleVerify')
      const result = await verify(username.toString(), code);
      console.log('Result' + JSON.stringify(result));
    } catch (error) {

    }
  }

  const handleResend = async () => {
    try {
      setKey(prevKey => prevKey + 1)
      setExpired(false);
    } catch (error) {

    }
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0){ 
      return <Text style={{fontFamily: 'nunito-bold', fontSize: 24, color: Colors.Primary }}>Too late...</Text>
    }

    return <Text style={{fontFamily: 'nunito-bold', fontSize: 24, color: Colors.Primary }}>{remainingTime}</Text>
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <View style={brand.container}>
        <Text style={brand.title}>{"{ "}takku{" }"}</Text>
      </View>
      <Text style={styles.text}>We have sent a verification code to +91 {username}</Text>
      <OtpInput
        numberOfDigits={6}
        focusColor={Colors.Primary}
        focusStickBlinkingDuration={500}
        onTextChange={(text) => setCode(text)}
        onFilled={(text) => {
          console.log(text);
          handleVerify();
        }}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: otp.container,
          pinCodeTextStyle: otp.pinCodeText
        }}
        disabled={expired}
      />
      <View style={{justifyContent: 'center', alignContent: 'center', flexDirection:'row', marginBottom: 30}}>
        <CountdownCircleTimer
          key={key}
          isPlaying
          duration={60}         
          colors={Colors.Primary}
          onComplete={() => {
            setExpired(true)
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </View>
      { expired ?
      (
        <View>
          <TouchableOpacity onPress={() => handleResend()}>
            <Text style={styles.text}>Didn't get OTP? Resend SMS</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity disabled>
            <Text style={styles.text}>Please enter your OTP to continue</Text>
          </TouchableOpacity>
        </View>
      ) }
      <View style={goback.container}>
        <TouchableOpacity style={goback.button} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.White} /> 
          <Text style={goback.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default verify

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-medium', 
    textAlign: 'center', 
    color: Colors.LightGrey
  }
});

const brand = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
    paddingVertical: 30
  },
  title: {
    color: Colors.Black,
    fontFamily: 'barcelona',
    fontSize: 80,
  }
});

const otp = StyleSheet.create({
  container: {
    padding: 40
  },
  pinCodeContainer: {

  },
  pinCodeText: {
    fontFamily: 'outfit-bold',
    color: Colors.Primary
  },
  focusStick: {

  },
  activePinCodeContainer: { 

  }
})

const goback = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    marginTop:30,
  },
  button: {
    marginBottom: 20,
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.Black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'nunito-medium',
    color: Colors.White,
    fontSize: 18,
    marginLeft: 10
  }
});