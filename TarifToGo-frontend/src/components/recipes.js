import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';


export default function Recipes({categories, meals}) {
    const navigation = useNavigation();
    return (
        <View style={{ marginHorizontal: 4, marginBottom: 12, marginTop: 20 }}>
            <Text style={{fontSize: hp(3), fontWeight: '600', color: '#4c4c4c'}}>Tarifler</Text>
            <View>
                {
                    categories.length==0 || meals.length==0? (
                        <Loading size="large" style={{marginTop:150}} />
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                            //refreshing={isLoadingNext}
                            //onRefresh={() => refetch({first: ITEM_CNT})}
                            onEndReachedThreshold={0.1}
                            //onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )
                }  

            </View>
        </View>
    );
}




const RecipeCard = ({item, index, navigation}) => {
    let isEven = index%2==0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)} style={{flex: 1, margin: 4, borderRadius: 8, overflow: 'hidden'}}>
            <Pressable
                style= {{width: '100%', flex: 1, justifyContent: 'center', marginBottom: 16, marginVertical: 4, paddingLeft: isEven? 0 : 8, paddingRight: isEven? 8 : 0, borderRadius: 8, overflow: 'hidden'}}
                onPress={() => navigation.navigate('RecipeDetails', {...item})}
            >
                <Image
                    source={{uri: item.strMealThumb}}
                    style={{width: '100%', height: index%3==0? hp(25) : hp(35), borderRadius: 35, marginBottom: 4, backgroundColor: '#f0f0f0'}}
                    sharedTransitionTag={item.strMeal}
                />
                <Text style={{fontSize: hp(2), fontWeight: '600', color: '#4c4c4c'}}>
                    {
                        item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
                    }
                </Text>
            </Pressable> 
        </Animated.View>
    );
}