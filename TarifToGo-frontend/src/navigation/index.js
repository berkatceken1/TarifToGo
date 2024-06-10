import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerActions } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

// Ekranlarınızı import edin
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DrawerContent from '../DrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import FoodBot from '../screens/FoodBot';
import UpdateProfile from '../screens/UpdateProfile/UpdateProfile';


const StackNav = () => {
    const navigation = useNavigation();
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                statusBarColor: '#0163d2',
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#0163d2',
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    // headerLeft: () => (
                    //     <Icon
                    //         name="menu"
                    //         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    //         size={30}
                    //         color="#fff"
                    //     />
                    // ),
                }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="RecipeDetails" component={RecipeDetailScreen} />
            <Stack.Screen name="Login" component={LoginNav} />
            <Stack.Screen name="FoodBot" component={FoodBot} />
            <Stack.Screen 
            name="UpdateProfile" 
            component={UpdateProfile}
            options={{
                headerShown: false,
            }}
            />
        </Stack.Navigator>
    );
};

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
            }}>
            <Drawer.Screen name="ProfileStack" component={StackNav} />
        </Drawer.Navigator>
    );
};

const LoginNav = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
            <Stack.Screen name="Home" component={DrawerNav} />
        </Stack.Navigator>
    );
};

export default function AppNavigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    async function getData() {
        const data = await AsyncStorage.getItem('isLoggedIn');
        console.log(data, 'index.js');
        setIsLoggedIn(data);
    }

    useEffect(() => {
        getData();
        setTimeout(getData, 2500); // 2.5 saniye bekledikten sonra veriyi al
    }, []);

    return (
        <NavigationContainer>
            {isLoggedIn ? <DrawerNav /> : <LoginNav />}
            <Toast />
        </NavigationContainer>
    );
}

