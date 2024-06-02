import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';


export default function WelcomeScreen() {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(()=> {
            ring1padding.value = withSpring(ring1padding.value+hp(5)) 
        },100);
        setTimeout(()=> {
            ring2padding.value = withSpring(ring2padding.value+hp(5.5))           
        } , 200);

        const navigationTimeout = setTimeout(()=> {
            navigation.navigate('Login')
        }, 2500)

        return () => {
            clearTimeout(navigationTimeout);
        }
    }, [navigation]);
    return (
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: '#FFC107' }}>
            <StatusBar style="light" />
        
            {/* Logo image with rings */}
            <Animated.View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 300, padding: ring2padding }}>
                <Animated.View style = {{ backgroundColor:'rgba(255,255,255,0.2)', borderRadius: 300, padding: ring1padding }}>
                    <Image 
                        source={require('../../assets/images/welcomeScreen.png')}
                        style={{ width: hp(20), height: hp(20), borderRadius: 100 }}
                        resizeMode="cover"
                    />
                </Animated.View>
            </Animated.View>

            {/* App Name  */}
            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 2, fontSize: hp(7) }}>
                    TarifToGo
                </Text>
                <Text style={{ color: 'white', fontWeight: 'normal', letterSpacing: 2, fontSize: hp(2) }}>
                    Anında Lezzet, Sınırsız İlham!
                </Text>
            </View>    
        </View>
    )
}
