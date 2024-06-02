import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Drawer, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const DrawerList = [
    {icon: 'home-outline', label: 'Anasayfa', navigateTo: 'Home'},
    {icon: 'account-multiple', label: 'Profil', navigateTo: 'Profile'},    
];

const DrawerLayout = ({icon, label, navigateTo}) => {
    const navigation = useNavigation();
    // console.log(userData);
    return (
        <DrawerItem
            icon={({color, size}) => <Icon name={icon} color={color} size={size} />}
            label={label}
            onPress={() => {navigation.navigate(navigateTo);
            }}
        />    
    );
};

const DrawerItems = (props) => {
    return DrawerList.map((el, i) => {
        return (
            <DrawerLayout
                key={i}
                icon={el.icon}
                label={el.label}
                navigateTo={el.navigateTo}
            />
        );
    });
};

function DrawerContent(props) {
    const navigation = useNavigation();
    const [userData, setUserData] = useState('');

    async function getData() {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      axios
        .post('http://192.168.1.167:5001/userdetails', {token: token})
        .then(res => {
          console.log(res.data);
          setUserData(res.data.data);
        });
    }

    useEffect(() => {
      getData();
    }, []);

    function signOut() {
      AsyncStorage.setItem('isLoggedIn', '');
      AsyncStorage.setItem('token', '');
      navigation.navigate('Login');
    }
  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
            <View style ={styles.drawerContent}>
                <TouchableOpacity activeOpacity={0.8}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://avatars.githubusercontent.com/u/54769171?v=4',
                                }}
                                size={50}
                                style={{marginTop: 5}}
                            />
                            <View style={{marginLeft:10, marginTop:10, flexDirection:'column'}}>
                                <Title style={styles.title}>{userData.name}</Title>
                                {/* <Text style={styles.caption} numberOfLines={1}>{userData.email}</Text> bu alanı kullanıcı adı koymak istesen kullan */}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.drawerSection}>
                    <DrawerItems />
                </View>
            </View>
        </DrawerContentScrollView>
        <DrawerItem
            icon={({color, size}) => <Icon name="exit-to-app" color={color} size={size} />}
            label="Sign Out"
            onPress={() => signOut()}
        />
    </View>   
  );
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 13,
      lineHeight: 14,
      // color: '#6e6e6e',
      width: '100%',
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      borderBottomWidth: 0,
      borderBottomColor: '#dedede',
      borderBottomWidth: 1,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#dedede',
      borderTopWidth: 1,
      borderBottomColor: '#dedede',
      borderBottomWidth: 1,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });