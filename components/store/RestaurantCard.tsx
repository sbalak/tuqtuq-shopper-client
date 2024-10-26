import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function RestaurantCard({business}: {business: any}) {
  return (    
    <View style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15

    }}>
        <Image source={{uri:business.photo}}
            style={{
                width: 200,
                height: 130,
                borderRadius:15
            }}
        />
        <View style={{marginTop:7,gap:5}}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>{business.name}</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 15,
                color: Colors.Gray
            }}>{business.locality}</Text>

            <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
                <View style={{display:'flex', flexDirection:'row', gap:5}}>
                    <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/2107/2107957.png'}}
                        style={{
                            height: 15,
                            width: 15
                        }}
                    />
                    <Text style={{fontFamily:'outfit'}}>4.5</Text>
                </View>
                <Text style={{
                    fontFamily:'outfit',
                    backgroundColor:Colors.PRIMARY,
                    color:'#fff',
                    padding:3,
                    fontSize:10,
                    borderRadius:5
                }}>{business.cuisine}</Text>
            </View>
        </View>
    </View>
  )
}