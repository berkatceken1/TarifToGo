import { React, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Fontisto  from 'react-native-vector-icons/Fontisto';
import Feather  from 'react-native-vector-icons/Feather';
import Error  from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

export default function SignupScreen({props}) {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [nameVerify, setNameVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [mobile, setMobile] = useState("");
    const [mobileVerify, setMobileVerify] = useState(false);
    const [gender, setGender] = useState("");
    const [genderVerify, setGenderVerify] = useState(false);
    const [profession, setProfession] = useState("");
    const [professionVerify, setProfessionVerify] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    function handleSubmit() {
        const userData ={
            name: name,
            email,
            mobile,
            gender,
            profession,
            password
        };
        if (nameVerify && emailVerify && mobileVerify && genderVerify && professionVerify && passwordVerify) {
        axios.post("http://10.80.7.1:5001/signup", userData)
        .then((res)=>{console.log(res.data)
            if (res.data.status === 'ok') {
                Toast.show({
                    type: 'success',
                    text1: 'Başarılı',
                    text2: 'Kayıt başarılı. Giriş yapabilirsiniz.',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                
                })
                navigation.push('Login');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata',
                    text2: JSON.stringify(res.data.data),
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                })
            }
        })
        .catch(err=> console.log(err));
        } else { 
            Toast.show({
                type: 'error',
                text1: 'Hata',
                text2: 'Lütfen tüm alanları doldurunuz ve doğru bilgileri giriniz.',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        }
    }

    function handleName(e) {
        const nameVar = e.nativeEvent.text;
        setName(nameVar);
        setNameVerify(false);

        if (nameVar.length > 1) {
            setNameVerify(true);
        }
    }
    function handleEmail(e) {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false);

        if (/^[\w.%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/
.test(emailVar)) {
            setEmail(emailVar)
            setEmailVerify(true);
        }
    }
    function handleMobile(e) {
        const mobileVar = e.nativeEvent.text;
        setMobile(mobileVar);
        setMobileVerify(false);

        if (/^[\d]{10}$/.test(mobileVar)) {
            setMobile(mobileVar)
            setMobileVerify(true);
        }
    }

    function handleGender(e) {
        setGender(e);
        setGenderVerify(true);
        setTimeout(() => {
        setModalVisible(false);
        }, 1000);
    }

    function handleProfession(e) {
        const professionVar = e.nativeEvent.text;
        setProfession(professionVar);
        setProfessionVerify(false);

        if (professionVar.length > 1) {
            setProfession(professionVar);
            setProfessionVerify(true);
        }
    }
    
    function handlePassword(e) {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        setPasswordVerify(false);

        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
            setPassword(passwordVar);
            setPasswordVerify(true);
        }
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
                            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">Kayıt Ol
                            </Animated.Text>
                        </View>

                        {/* Form */}
                        <View className="flex items-center mx-4 space-y-4">
                            <Animated.View entering={FadeInDown.duration(0).springify()} className="flex-row bg-black/5 p-5 rounded-2xl w-full">
                                <FontAwesome name="user" color="gray" style={styles.smallIcon} />
                                <View style={{ flex:1 }}>
                                    <TextInput 
                                        placeholder="İsim" 
                                        placeholderTextColor={'gray'}
                                        onChange={e=>handleName(e)}
                                        maxLength={40}
                                        keyboardType='default'
                                    />
                                </View>
                                {name.length < 1 ? null : (
                                    <View style={{ position: 'relative', right: 10 }}>
                                        {nameVerify ? (
                                            <Feather name="check-circle" color="green" size={20} /> 
                                        ) : (
                                            <Error name="error" color="red" size={20}  />
                                        )}
                                    </View>
                                )}
                            </Animated.View>
                            {
                                name.length<1?null :  nameVerify ? null : (<Text className="text-red-500">İsim en az 2 karakter olmalıdır.</Text>)
                            }
                            <Animated.View entering={FadeInDown.duration(200).springify()} className="flex-row bg-black/5 p-5 rounded-2xl w-full">
                                <Fontisto name="email" color="gray" style={styles.smallIcon} />
                                <View style={{ flex:1 }}>
                                    <TextInput 
                                        placeholder="E-posta" 
                                        placeholderTextColor={'gray'} 
                                        onChange={e => handleEmail(e)}
                                        maxLength={50}
                                        keyboardType='email-address'
                                        />
                                </View>
                                {email.length < 1 ? null : (
                                    <View style={{ position: 'relative', right: 10 }}>
                                        {emailVerify ? (
                                            <Feather name="check-circle" color="green" size={20} /> 
                                        ) : (
                                            <Error name="error" color="red" size={20}  />
                                        )}
                                    </View>
                                )}                               
                            </Animated.View>
                            {
                                email.length < 1 ? null :  nameVerify ? null : (<Text className="text-red-500">Geçerli bir e-posta giriniz.</Text>)
                            }
                            <Animated.View entering={FadeInDown.duration(400).springify()} className="flex-row bg-black/5 p-5 rounded-2xl w-full">
                                <Fontisto name="mobile" color="gray" style={styles.smallIcon} />
                                <View style={{ flex:1 }}>
                                    <TextInput 
                                        placeholder="Telefon(Lütfen başında 0 olmadan giriniz.)" 
                                        placeholderTextColor={'gray'} 
                                        onChange={(e) =>handleMobile(e)}
                                        maxLength={10}
                                        keyboardType='numeric'
                                    />
                                </View>
                                {mobile.length < 1 ? null : (
                                    <View style={{ position: 'relative', right: 10 }}>
                                        {mobileVerify ? (
                                            <Feather name="check-circle" color="green" size={20} /> 
                                        ) : (
                                            <Error name="error" color="red" size={20}  />
                                        )}
                                    </View>
                                )}
                            </Animated.View>
                            {
                                mobile.length < 1 ? null :  mobileVerify ? null : (<Text className="text-red-500">Geçerli bir telefon numarası giriniz.</Text>)
                            }

                            <Animated.View entering={FadeInDown.duration(600).springify()} className="flex-row bg-black/5 p-5 rounded-2xl w-full">
                                <FontAwesome name="venus-mars" color="gray" style={styles.smallIcon} />
                                <View style={{ flex:1 }}>
                                    <Text 
                                    style={{ color: 'gray' }}
                                    onPress={()=>setModalVisible(true)}
                                    >
                                        {gender ? <Text style={{color:'black'}}>
                                            Seçilen: {gender}
                                        </Text> : "Cinsiyet Seçiniz"}                                   
                                    </Text>
                                    {/* <Text style={{ color: 'gray' }}> Seçilen: {gender}</Text> */}
                                </View>
                                {
                                    gender ? (
                                        <View style={{ position: 'relative', right: 10 }}>
                                            <Feather name="check-circle" color="green" size={20} />
                                        </View>
                                    ) : null
                                }

                            </Animated.View>
                                {
                                    modalVisible && (
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible}
                                            onRequestClose={()=>setModalVisible(false)}
                                        >
                                            <View style={styles1.modalContainer}>
                                                <View style= {styles1.pickerContainer}>
                                                    <Picker
                                                        selectedValue={gender}
                                                        onValueChange={(itemValue) => handleGender(itemValue)}
                                                    >
                                                        <Picker.Item label="Erkek" value="Erkek" />
                                                        <Picker.Item label="Kadın" value="Kadın" />
                                                        <Picker.Item label="Diğer" value="Diğer" />
                                                    </Picker>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles1.closeButton}
                                                    onPress={()=>setModalVisible(false)}
                                                >
                                                    <Text style={styles1.closeButtonText}>Kapat</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Modal>
                                    )}
                        
                            <Animated.View entering={FadeInDown.duration(800).springify()} className="flex-row bg-black/5 p-5 rounded-2xl w-full">
                                <FontAwesome name="briefcase" color="gray" style={styles.smallIcon} />
                                <View style={{ flex:1 }}>
                                    <TextInput 
                                    placeholder='Meslek'
                                    placeholderTextColor={'gray'}
                                    onChange={(e) => handleProfession(e)}
                                    maxLength={50}
                                    keyboardType='default'
                                    />
                                </View>
                                {profession.length < 1 ? null : (
                                        <View style={{ position: 'relative', right: 10 }}>
                                            {professionVerify ? (
                                                <Feather name="check-circle" color="green" size={20} /> 
                                            ) : (
                                                <Error name="error" color="red" size={20}  />
                                            )}
                                        </View>
                                )}
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row bg-black/5 p-5 rounded-2xl w-full mb-3">
                                <FontAwesome name="lock" color="gray" style={styles.smallIcon} />
                                <View style={{ flex:1 }}>
                                    <TextInput 
                                        placeholder="Şifre" 
                                        placeholderTextColor={'gray'} 
                                        secureTextEntry={!showPassword}
                                        onChange={(e) => handlePassword(e)}
                                        maxLength={20}
                                    />
                                </View>    
                                    <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                                    <View style={{ position: 'relative', right: 10 }}>
                                        {password.length < 1 ? null : !showPassword ? 
                                        <Feather 
                                            name='eye'
                                            style={{marginRight: -10}}
                                            color={passwordVerify ? 'gray' : 'red'}
                                            size={20}
                                        />
                                        : <Feather
                                            name='eye-off'
                                            style={{marginRight: -10}}
                                            color={passwordVerify ? 'gray' : 'red'}
                                            size={20}
                                        />}    
                                    </View>         
                                    </TouchableOpacity>
                            </Animated.View>
                            {
                                password.length < 1 ? null :  passwordVerify ? null : (<Text className="text-red-500">Şifre en az 6 karakter olmalıdır ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.</Text>)
                            }
                            <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="w-full">
                                <TouchableOpacity 
                                    className="w-full bg-sky-400 p-3 rounded-2xl mb-3" onPress={()=>handleSubmit()}>
                                        <Text className="text-xl text-white text-center font-bold">Kayıt Ol</Text>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="flex-row justify-center">
                                <Text>Hesabınız var mı? </Text>
                                <TouchableOpacity onPress={()=>navigation.push('Login')}>
                                    <Text className="text-sky-600">Giriş Yap</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    animatedView: {
      flexDirection: 'row',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      padding: 15,
      borderRadius: 20,
      width: '100%',
      alignItems: 'center',
    },
    smallIcon: {
      marginRight: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    pickerContainer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    closeButton: {
      backgroundColor: 'gray',
      padding: 10,
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });