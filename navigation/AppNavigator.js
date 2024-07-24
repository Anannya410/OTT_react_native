import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./Tabs.js";
import Details from "../screens/Details.js";
import Search from "../screens/Search.js";

const Stack = createStackNavigator();

const AppNavigator = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name = "Tabs" component={Tabs}/>
                <Stack.Screen name = "Details" component={Details}/>
                <Stack.Screen name = "Search" component={Search}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

