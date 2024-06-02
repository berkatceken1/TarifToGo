import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon } from 'react-native-heroicons/outline';
import { FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YoutubeIFrame from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { mealData } from '../constants';




export default function RecipeDetailScreen(props) {
    //console.log(props.route.params);
    let item = props.route.params;
    const [isFav, setIsFav] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal);
    }, []);

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            // console.log('got meal data: ', response.data);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient'+i]) {
                indexes.push(i);
            }
        }

        return indexes;
     }

     {/* Youtube kısmında sorun çıkıyor koymak istersen bu yorum satırlarını aç */}
    //  const getYoutubeVideoId = url => {
    //     const regex = /[?&]v=([^&]+)/;
    //     const match = url.match(regex);
    //     if (match && match[1]) {
    //         return match[1];
    //     }
    //     return null;    
    //  }

    return (
        <ScrollView
            style={{flex: 1, backgroundColor: 'white'}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30}}
        >
            <StatusBar style={"light"} />

            {/* Recipe Image */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image
                    source={{uri: item.strMealThumb}}
                    style={{width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}
                    sharedTransitionTag={item.strMeal}
                />
            </View>

            {/* Back Button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{width:'100%', position: 'absolute', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', paddingTop:64}}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{ borderRadius: 999,padding: 2, backgroundColor: 'white', marginLeft:20 }}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFav(!isFav)} style={{ borderRadius: 999,padding: 2, backgroundColor: 'white', marginRight:20 }}>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFav? "red": "gray"} />
                </TouchableOpacity>              
            </Animated.View>   

            {/* Meal Description */}
            {
                loading? (
                    <Loading size = "large" style={{marginTop: 150}} />
                ):(
                    <View style={{paddingHorizontal: 16, justifyContent:'center', flex: 1, marginBottom: 16, paddingTop: 32 }}>
                        {/* name and area */}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={{ marginBottom: 8 }}>
                            <Text style={{ fontSize: hp(3), fontWeight: 'bold', flex: 1, color: '#4B5563'}}>
                                {meal?.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2), fontWeight: '500', flex: 1, color: '#6B7280'}}>
                                {meal?.strArea}
                            </Text>
                        </Animated.View>

                        {/* Misc */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={{ borderRadius: 999, backgroundColor: '#F59E0B', padding: 8 }}>
                                <View 
                                    style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 999, justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />   
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, marginVertical: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#4B5563' }}>
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: '#4B5563' }}>
                                        Dakika
                                    </Text>
                                </View>
                            </View>
                            <View style={{ borderRadius: 999, backgroundColor: '#F59E0B', padding: 8 }}>
                                <View 
                                    style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 999, justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />   
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, marginVertical: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#4B5563' }}>
                                        03
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: '#4B5563' }}>
                                        Porsiyon
                                    </Text>
                                </View>
                            </View>
                            <View style={{ borderRadius: 999, backgroundColor: '#F59E0B', padding: 8 }}>
                                <View 
                                    style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 999, justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />   
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, marginVertical: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#4B5563' }}>
                                        103
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: '#4B5563' }}>
                                        Kalori
                                    </Text>
                                </View>
                            </View>
                            <View style={{ borderRadius: 999, backgroundColor: '#F59E0B', padding: 8 }}>
                                <View 
                                    style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 999, justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />   
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, marginVertical: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#4B5563' }}>
                        
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: '#4B5563' }}>
                                        Kolay
                                    </Text>
                                </View>
                            </View>
                        </Animated.View>
                        {/* Ingredients */}
                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={{ marginVertical: 16 }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#4B5563'}}>
                                İçindekiler
                            </Text>
                            <View style={{ marginVertical: 8, marginLeft: 1}}>
                                {
                                    ingredientsIndexes(meal).map((index) => {
                                        return (
                                            <View key={index} style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 8 }}>
                                                <View style={{ height: hp(1.5), width: hp(1.5), backgroundColor: '#F6E05E', borderRadius: 999}} />
                                                <View style={{ flexDirection: 'row', marginHorizontal: 8}}>
                                                    <Text style={{ fontSize: hp(1.7), fontWeight: 'bold', color: '#4B5563'}}>{meal['strMeasure'+index]}</Text>
                                                    <Text style={{ fontSize: hp(1.7), marginLeft: 4, fontWeight: 'normal', color: '#4B5563'}}>{meal['strIngredient'+index]}</Text>
                                                </View>
                                            </View>
                                        )           
                                    })
                                }

                            </View>
                        </Animated.View>
                        {/* Instructions */}
                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={{ marginVertical: 16 }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#4B5563'}}>
                                Tarif
                            </Text>
                            <Text style={{ fontSize: hp(1.7), fontWeight: 'normal', color: '#718096', marginVertical: 8}}>
                                {
                                    meal?.strInstructions
                                }
                            </Text>
                        </Animated.View>
                        {/* Youtube kısmında sorun çıkıyor koymak istersen bu yorum satırlarını aç */}
                        {/* Recipe Video */}
                        {/* {
                            meal.strYoutube && (
                                <View style={{ marginVertical: 16 }}>
                                    <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#4B5563'}}>
                                        Tarif Videosu
                                    </Text>
                                    <View>
                                        <YoutubeIFrame
                                            videoId={getYoutubeVideoId(meal.strYoutube)}
                                            height={hp(30)}
                                            play={false}
                                        />
                                    </View>
                                </View>
                            )
                        } */}
                        
                    </View>
                        
                )
            }   

        </ScrollView>
    )
}