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
          userType: userType,
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
  userType,
}: {
  name: string;
  title: string;
  icon: ImageSourcePropType;
  iconName: string;
  userType?: "client" | "brand" | null;
}) => {
  return (
    <Tabs.Screen
      name={name}
      options={{
        title: title,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#301c11",
          height: 55,
          borderColor: "#301c11",
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
        ...(name === "profile" && {
          tabBarPress: (e: any) => {
            e.preventDefault();
            if (userType === "brand") {
              router.push("/(tabs)/brand-profile" as any);
            } else {
              router.push("/(tabs)/profile" as any);
            }
          },
        }),
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
    <View className="items-center top-[5]">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }}
      />
    </View>
  );
};
