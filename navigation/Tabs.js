import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

import Home from "../screens/Home.js";
import Search from "../screens/Search.js";
import Categories from "../screens/Categories.js";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          elevation: 0,
          backgroundColor: "#000000",
          height: 60,
          borderTopWidth: 0,
          ...styles.shadow,
        },
        tabBarLabelStyle: {
          display: "none",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AntDesign
                name="home"
                size={25}
                color={focused ? "#ffffff" : "#404040"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Entypo
                name="magnifying-glass"
                size={25}
                color={focused ? "#ffffff" : "#404040"}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Entypo
                name="magnifying-glass"
                size={25}
                color={focused ? "#ffffff" : "#888888"}
              />
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
