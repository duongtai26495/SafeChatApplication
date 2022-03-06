import React,{useEffect, useState} from "react";
import { View, Text, Image } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {getAuth, onAuthStateChanged } from "firebase/auth";
import HomeStack from '../navigation/HomeStack'
import FriendStack from '../navigation/FriendStack'
import ProfileStack from '../navigation/ProfileStack'
import SettingStack from '../navigation/SettingStack'
import ICONS from "../constants/Icons_Source_Url";
import Colors from "../assets/colors/Color";



const Tab = createMaterialBottomTabNavigator();

const MainTab = () => {
    const sizeIcon = 25

const [isLogin, setIsLogin] = useState(false)
const auth = getAuth()

useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
        if(user){
            setIsLogin(true)
            console.log("User logged in")
        }else{
            setIsLogin(false)
            console.log("User unlogin")
        }
    })
},[])

    return (
        <Tab.Navigator
            initialRouteName={isLogin ? "Home" : "Profile"}
            shifting={true}
            activeColor={Colors.DARK}
            inactiveColor={Colors.LIGHT}
            barStyle={{ backgroundColor: Colors.PRIMARY }}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    headerShown: false,
                    animation: true,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={ICONS.HOME}
                                resizeMode='contain'
                                style={{
                                    width: sizeIcon,
                                    height: sizeIcon,
                                    tintColor: focused ? null : Colors.BLACK_TRANSP_3
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Friends"
                component={FriendStack}
                options={{
                    headerShown: false,
                    animation: true,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={ICONS.FRIENDS}
                                resizeMode='contain'
                                style={{
                                    width: sizeIcon,
                                    height: sizeIcon,
                                    tintColor: focused ? Colors.DARK : null
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack} 
                options={{
                    headerShown: false,
                    animation: true,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={ICONS.PROFILE}
                                resizeMode='contain'
                                style={{
                                    width: sizeIcon,
                                    height: sizeIcon,
                                    tintColor: focused ? Colors.DARK : null

                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingStack}
                options={{
                    headerShown: false,
                    animation: true,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={ICONS.SETTINGS}
                                resizeMode='contain'
                                style={{
                                    width: sizeIcon,
                                    height: sizeIcon,
                                    tintColor: focused ? Colors.DARK : null

                                }}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTab