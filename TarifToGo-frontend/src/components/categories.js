import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { categoryData } from '../constants/'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';


export default function Categories({ categories,  activeCategory, handleChangeCategory }) {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginRight: 16 }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {categories.map((category, index) => {
                    let isActive = category.strCategory== activeCategory;
                    let activeButtonStyle = isActive ? { backgroundColor: '#FFC400' } : { backgroundColor: 'rgba(0, 0, 0, 0.1)' };
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleChangeCategory(category.strCategory)}
                            style={{ alignItems: 'center', marginTop: 4 }}
                        >
                            <View style={[{ borderRadius: 9999, overflow: 'hidden' }]}>
                                <View style={[activeButtonStyle, { padding: 4 }]}>
                                    <Image
                                        source={{ uri: category.strCategoryThumb }}
                                        style={{
                                            width: hp(7),
                                            height: hp(7),
                                            borderRadius: 9999,
                                            overflow: 'hidden', // Görüntüyü kapsayan View bileşeninin taşmasını engeller
                                        }}
                                    />
                                </View>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: hp(1.6), textAlign: 'center' }}>{category.strCategory}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </Animated.View>
    );
}
