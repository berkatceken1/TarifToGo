import { React, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { log } from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function LoginScreen({props}) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        const userData = { 
            email: email,
            password, 
        };
        axios.post("http://192.168.1.167:5001/login", userData)
            .then(response => {
                console.log(response.data);
                if(response.data.status == 'ok') {
                    // Alert.alert('Giriş başarılı');
                    Toast.show({
                        type: 'success',
                        text1: 'Başarılı',
                        text2: 'Giriş Başarılı',
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                    
                    })
                    AsyncStorage.setItem('token', response.data.data);
                    AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                    navigation.navigate('Home');
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Hata',
                        text2: 'Kullanıcı bulunamadı',
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                    
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } 


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View className="bg-white h-full w-full">
                    <StatusBar style="light" />
                    <Image className="h-full w-full absolute" source={require('../../assets/images/background.png')} />

                    {/* Logo */}
                    <View className="flex-row justify-around w-full absolute">
                        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-24 w-24" source={require('../../assets/images/logo.png')} />
                    </View>

                    {/* Title and Form */}
                    <View className="h-full w-full flex justify-around pt-40 pb-10">
                        {/* Title */}
                        <View className="flex items-center">
                            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">Giriş Yap
                            </Animated.Text>
                        </View>

                        {/* Form */}
                        <View className="flex items-center mx-4 space-y-4">
                            <Animated.View entering={FadeInDown.duration(0).springify()} className="flex-row bg-black/5 p-5 rounded-2xl w-full">
                                <FontAwesome name="user" color="gray" style={styles.smallIcon} />
                                <View style={{ flex:1 }}>
                                    <TextInput 
                                        placeholder="Email veya Telefon" placeholderTextColor={'gray'}
                                        onChange={e => setEmail(e.nativeEvent.text)}
                                        keyboardType='email-address'
                                        />
                                </View>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="flex-row bg-black/5 p-5 rounded-2xl w-full mb-3">
                                <FontAwesome name="lock" color="gray" style={styles.smallIcon} />
                                <View style={{ flex:1 }}>
                                    <TextInput 
                                        placeholder="Şifre" placeholderTextColor={'gray'} secureTextEntry
                                        onChange={e => setPassword(e.nativeEvent.text)}
                                        keyboardType='default'
                                        />
                                </View>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8, marginLeft: 220}}>
                                <Text>Şifremi unuttum</Text>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full">
                                <TouchableOpacity 
                                    className="w-full bg-sky-400 p-3 rounded-2xl mb-3" onPress={() => handleSubmit()}>
                                        <Text className="text-xl text-white text-center font-bold">Giriş</Text>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="flex-row justify-center">
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}> Veya devam et </Text>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} style={styles.bottomButtonContainer}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={()=> {navigation.navigate('Home')}}
                                         style={styles.inBut2}>
                                        <FontAwesome 
                                            name="user-circle-o"
                                            color="white"
                                            style={[styles.smallIcon2, {fontSize: 30}]}
                                        /> 
                                    </TouchableOpacity>
                                    <Text style={styles.bottomText}>Misafir</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity 
                                        onPress={()=> {navigation.navigate('SignUp')}} 
                                        style={styles.inBut2}>
                                        <FontAwesome
                                            name="user-plus"
                                            color="white"
                                            style={[styles.smallIcon2, {fontSize: 30}]}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.bottomText}>Kayıt Ol</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity 
                                        style={styles.inBut2}
                                        onPress={()=> alert('Yakında..')}
                                    >
                                        <FontAwesome
                                            name="google"
                                            color="white"
                                            style={[styles.smallIcon2, {fontSize: 30}]}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.bottomText}>Google</Text>
                                </View>
                            </Animated.View>
                        </View>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        </ScrollView>
        
        
    );
}
