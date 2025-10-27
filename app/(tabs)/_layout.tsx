import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Tabs, router, useSegments } from "expo-router";
import { OnlyAuthenticated } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { Octicons, Foundation } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <OnlyAuthenticated>
      <Tabs screenOptions={{ tabBarShowLabel: false }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarStyle: tabBarStyle.container,
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#a3a3a3",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Foundation name="home" size={27} color={color} />
              ) : (
                <Octicons name="home" size={24} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            headerShown: false,
            tabBarStyle: tabBarStyle.container,
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#a3a3a3",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={28}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="likes-favorites"
          options={{
            title: "Likes & Favorites",
            headerShown: false,
            tabBarStyle: tabBarStyle.container,
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#a3a3a3",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarStyle: tabBarStyle.container,
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#a3a3a3",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={26}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </OnlyAuthenticated>
  );
};

export default TabsLayout;

// Custom Tab Bar component for (items) and (brand) routes
const CustomTabBar = () => {
  const tabs = [
    {
      name: "home",
      title: "Home",
      Icon: ({ color, focused }: { color: string; focused: boolean }) =>
        focused ? (
          <Foundation name="home" size={27} color={color} />
        ) : (
          <Octicons name="home" size={24} color={color} />
        ),
    },
    {
      name: "explore",
      title: "Explore",
      Icon: ({ color, focused }: { color: string; focused: boolean }) => (
        <Ionicons
          name={focused ? "search" : "search-outline"}
          size={28}
          color={color}
        />
      ),
    },
    {
      name: "likes-favorites",
      title: "Likes & Favorites",
      Icon: ({ color, focused }: { color: string; focused: boolean }) => (
        <Ionicons
          name={focused ? "heart" : "heart-outline"}
          size={24}
          color={color}
        />
      ),
    },
    {
      name: "profile",
      title: "Profile",
      Icon: ({ color, focused }: { color: string; focused: boolean }) => (
        <Ionicons
          name={focused ? "person" : "person-outline"}
          size={26}
          color={color}
        />
      ),
    },
  ];

  return (
    <View
      style={{
        ...tabBarStyle.container,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => {
            router.push(`/(tabs)/${tab.name}`);
          }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <tab.Icon color="#a3a3a3" focused={false} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export { CustomTabBar };

const tabBarStyle = StyleSheet.create({
  container: {
    backgroundColor: "#301c11",
    height: 60,
    borderColor: "#301c11",
    paddingBottom: 12,
    paddingTop: 6,
  },
});
