import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs, router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import icons from "../../constants/icons";

const TabsLayout = () => {
  const { userType, user, loading } = useAuth();

  // Verificar que hay un usuario autenticado
  if (loading) {
    return null; // Mostrar loading o splash screen
  }

  if (!user) {
    return null; // El AuthContext ya maneja la redirección
  }

  return (
    <>
      <Tabs screenOptions={{ tabBarShowLabel: false }}>
        {Page({
          name: "home",
          title: "Home",
          icon: icons.home,
          iconName: "Home",
        })}
        {Page({
          name: "explore",
          title: "Explore",
          icon: icons.search,
          iconName: "Explore",
        })}
        {Page({
          name: "profile",
          title: "Profile",
          icon: icons.profile,
          iconName: "Profile",
        })}
      </Tabs>
    </>
  );
};

export default TabsLayout;

const Page = ({
  name,
  title,
  icon,
  iconName,
}: {
  name: string;
  title: string;
  icon: ImageSourcePropType;
  iconName: string;
}) => {
  return (
    <Tabs.Screen
      name={name}
      options={{
        title: title,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#301c11",
          height: 60,
          borderColor: "#301c11",
          paddingBottom: 12,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
            icon={icon}
            name={iconName}
            color={color}
            focused={focused}
          />
        ),
      }}
    />
  );
};

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }}
      />
    </View>
  );
};
