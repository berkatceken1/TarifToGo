import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import { DrawerActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './ProfileScreen';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const navigation = useNavigation();
    const [userData, setUserData] = useState('');

    // Kullanıcı verilerini almak için API isteği yapar
    async function fetchUserData() {
        const token = await AsyncStorage.getItem('token');
        axios.post('http://192.168.1.167:5001/userdetails', { token })
            .then(res => {
                setUserData(res.data.data);
            })
            .catch(error => {
                console.error("Kullanıcı verileri alınamadı: ", error);
            });
    }

    // Kategorileri getirmek için API isteği yapar
    async function fetchCategories() {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Kategoriler alınamadı: ", error);
        }
    }

    // Seçilen kategoriye göre yemekleri getirir
    async function fetchRecipes(category = "Beef") {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            setMeals(response.data.meals);
        } catch (error) {
            console.error("Yemekler alınamadı: ", error);
        }
    }


    useEffect(() => {
        fetchUserData(); // Kullanıcı verilerini alır
        fetchCategories(); // Kategorileri alır
        fetchRecipes(); // Yemekleri alır    
        
        setTimeout(() => {
            Toast.show({
                type: 'success',
                text1: 'Hoşgeldin!',
                text2: 'TarifToGo uygulamasına hoşgeldin!',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        })
    }, []);

    // Kategori değişikliğinde yeni yemekleri getirir
    const handleChangeCategory = (category) => {
        fetchRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {/* Avatar ve foodbot */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4, marginTop: 20, marginBottom: 2 }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('../../assets/images/avatar.png')} style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('FoodBot')}>
                        <Image source={require('./1.png')} style={{ height: 100, width: 100 }} />
                    </TouchableOpacity>
                </View>

                {/* Greetings ve punchline */}
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'gray' }}>Merhaba, {userData.name}</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Bugün ne yemek istersin?</Text>
                </View>

                {/* Search bar */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 30, padding: 10, marginTop: 20 }}>
                    <TextInput style={{ flex: 1, fontSize: 16, color: 'black', marginBottom: 4, paddingLeft: 8 }} placeholder="Ara..." placeholderTextColor={'gray'} />
                    <View style={{ backgroundColor: 'white', padding: 8, borderRadius: 30 }}>
                        <MagnifyingGlassIcon size={24} strokeWidth={3} color="black" />
                    </View>
                </View>

                {/* Categories */}
                <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />

                {/* Recipes */}
                <Recipes meals={meals} categories={categories} />
            </ScrollView>
        </View>
    );
}
