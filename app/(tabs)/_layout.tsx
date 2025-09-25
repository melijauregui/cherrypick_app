import { View, Image, ImageSourcePropType, StyleSheet } from "react-native";
import React from "react";
import { Stack, Tabs, router, useSegments } from "expo-router";
import icons from "../../constants/icons";
import { OnlyAuthenticated } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { Octicons, Foundation } from "@expo/vector-icons";

const TabsLayout = () => {
  const segment = useSegments();
  // get the current page from the segment
  const page = segment[segment.length - 1] || "";
  const pagesToHideTabBar = ["camera"];

  return (
    <OnlyAuthenticated>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarStyle: tabBarStyle.container,
            tabBarActiveTintColor: "#FFFFFF",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Foundation name="home" size={27} color={color} />
              ) : (
                <Octicons name="home" size={24} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="(search)"
          options={{
            title: "Explore",
            headerShown: false,
            popToTopOnBlur: true,
            tabBarStyle: {
              ...tabBarStyle.container,
              bottom: pagesToHideTabBar.includes(page) ? -100 : 0,
              display: pagesToHideTabBar.includes(page) ? "none" : "flex",
            },
            tabBarActiveTintColor: "#FFFFFF",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={28}
                color={color}
              />
            ),
          }}
          // listeners={{
          //   tabPress: e => {
          //     const canDismiss = router.canDismiss();
          //     if (canDismiss) router.dismissAll();
          //   },
          // }}
        />

        <Tabs.Screen
          name="likes-favorites"
          options={{
            title: "Likes & Favorites",
            headerShown: false,
            tabBarStyle: tabBarStyle.container,
            tabBarActiveTintColor: "#FFFFFF",
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
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(items)"
          options={{
            headerShown: false,
            href: null, // Esto oculta el tab del tab bar pero mantiene la funcionalidad
            tabBarStyle: tabBarStyle.container,
            tabBarActiveTintColor: "#FFFFFF",
          }}
        />
        <Tabs.Screen
          name="(brand)"
          options={{
            headerShown: false,
            href: null, // Esto oculta el tab del tab bar pero mantiene la funcionalidad
          }}
        />
      </Tabs>
    </OnlyAuthenticated>
  );
};

export default TabsLayout;

const tabBarStyle = StyleSheet.create({
  container: {
    backgroundColor: "#301c11",
    height: 60,
    borderColor: "#301c11",
    paddingBottom: 12,
    paddingTop: 6,
    position: "absolute",
  },
});
