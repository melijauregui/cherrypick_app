import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";
import { useRouter, useLocalSearchParams } from "expo-router";
import images from "../../constants/images";

const Preferences = () => {
  // const router = useRouter();
  // const { name, email, dateBirth } = useLocalSearchParams();
  // console.log(
  //   "Proceeding with name in code-verification:",
  //   name,
  //   "and email:",
  //   email,
  //   "and date:",
  //   dateBirth
  // );

  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <View className="flex flex-grow flex-col w-full justify-between px-14 py-3">
        <View className="flex flex-col w-full">
          <LogoCircle classname="w-[60] h-[60] mb-2 self-center" />
          <Text className="text-white text-[27px] font-pbold  pt-14">
            How would you describe your fashion style?
          </Text>
          <Text className="text-gray-400 text-[15px] font-pregular pt-5">
            Pick at least 1 to customize your home feed.
          </Text>
          <SelectionList />
        </View>
        <NextButton
          onPress={() => {
            // Your function logic here
            console.log("Button pressed");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Preferences;

type ItemData = {
  title: string;
  image: ImageSourcePropType;
};

const DATA: ItemData[] = [
  {
    title: "Boho-chic",
    image: images.bohoChicImage,
  },
  {
    title: "Streetwear",
    image: images.streetWearImage,
  },
  {
    title: "Old money",
    image: images.oldMoneyImage,
  },
  {
    title: "Boho-chic2",
    image: images.bohoChicImage,
  },
  {
    title: "Streetwear2",
    image: images.streetWearImage,
  },
  {
    title: "Old money2",
    image: images.oldMoneyImage,
  },
];

const Item = ({
  item,
  onPress,
  textColor,
  selectedIdxs,
}: {
  item: ItemData;
  onPress: () => void;
  textColor: string;
  selectedIdxs: string[];
}) => {
  // const [imageDimensions, setImageDimensions] = useState({
  //   width: 0,
  //   height: 0,
  // });
  // const { width, height } = Dimensions.get("window");
  // const widthDetermined = width / 2 - 10; //width hard coded
  const isSelected = selectedIdxs.includes(item.title);
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[50%] flex flex-col items-center justify-center mb-4 "
    >
      <Image
        source={item.image}
        className={`
          w-full  
          h-[170px]        
          aspect-[0.9]   
          rounded-2xl
          mb-1
          ${isSelected ? "border-2 border-white" : ""}
        `}
        resizeMode="cover"
      />
      <Text className="text-gray-400">{item.title}</Text>
    </TouchableOpacity>
  );
};

const SelectionList = () => {
  const [selectedIdxs, setSelectedIdxs] = useState<string[]>([]);

  function handleOnpress(title: string) {
    const updated = selectedIdxs.includes(title)
      ? selectedIdxs.filter((item) => item !== title)
      : [...selectedIdxs, title];

    setSelectedIdxs(updated);
    console.log("Selected items:", updated);
  }

  const renderItem = ({ item }: { item: ItemData }) => {
    const color = "black";

    return (
      <Item
        item={item}
        onPress={() => handleOnpress(item.title)}
        textColor={color}
        selectedIdxs={selectedIdxs}
      />
    );
  };

  return (
    <View className="w-full mt-6">
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        extraData={selectedIdxs}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
    </View>
  );
};

const NextButton = ({
  onPress,
  codeReady,
}: {
  onPress?: () => void;
  codeReady?: boolean;
}) => {
  const isDisabled = !codeReady;

  return (
    <View className="flex flex-row justify-end mb-2">
      <TouchableOpacity
        disabled={isDisabled}
        onPress={isDisabled ? undefined : onPress}
        className={`
          flex flex-row items-center px-5 py-2 rounded-3xl
          ${isDisabled ? "bg-gray-400 opacity-50" : "bg-white"}
        `}
      >
        <Text
          className={`
            text-[15px] font-psemibold
            ${isDisabled ? "text-gray-700" : "text-black"}
          `}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
