import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import images from "../../constants/images";
import { CreateAccountSchemaRes } from "@/schemas/auth/preferences-schema";
import { BodyUserCreationPostSchema } from "@/schemas/auth/sign-up-schema";
import { safeFetch } from "@/utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";

const Preferences = () => {
  const router = useRouter();
  const { name, email, dateBirth } = useLocalSearchParams();
  console.log(
    "Proceeding with name in code-verification:",
    name,
    "and email:",
    email,
    "and date:",
    dateBirth
  );
  async function handleSubmit() {
    console.log("Creating an account");
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof dateBirth !== "string"
    ) {
      console.log("typeof name", typeof name);
      console.log("typeof email", typeof email);
      console.log("typeof dateBirth", typeof dateBirth);
      console.log("Invalid parameters");
      return;
    }
    try {
      const { success } = await createAccount(name, email, dateBirth);
      if (success) {
        console.log("Account created successfully");
        router.push("/home");
      } else {
        console.log("Error creating account"); //TODO HANDLEAR MEJOR
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      // router.push("/sign-in");
    }
  }
  const [selectedOne, setSelectedOne] = useState<boolean>(false);
  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <View className="flex flex-grow flex-col w-full justify-between px-14 pt-3">
        <View className="flex flex-col w-full">
          <LogoCircle classname="w-[60] h-[60] mb-1 self-center" />
          <Text className="text-white text-[27px] font-pbold pt-6">
            How would you describe your fashion style?
          </Text>
          <Text className="text-gray-400 text-[15px] font-pregular pt-3">
            Pick at least 1 to customize your home feed.
          </Text>
          <SelectionList setSelectedOne={setSelectedOne} />
        </View>
        <NextButton
          onPress={() => {
            handleSubmit();
          }}
          codeReady={selectedOne}
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
    title: "Sporty",
    image: images.sportyImage,
  },
  {
    title: "Old money",
    image: images.oldMoneyImage,
  },
  {
    title: "Minimalist",
    image: images.minimalistImage,
  },
  {
    title: "Coquette",
    image: images.coquetteImage,
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
          h-[160px]        
          aspect-[1]   
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

const SelectionList = ({
  setSelectedOne,
}: {
  setSelectedOne: (value: boolean) => void;
}) => {
  const [selectedIdxs, setSelectedIdxs] = useState<string[]>([]);

  function handleOnpress(title: string) {
    const updated = selectedIdxs.includes(title)
      ? selectedIdxs.filter((item) => item !== title)
      : [...selectedIdxs, title];

    setSelectedIdxs(updated);
    setSelectedOne(updated.length > 0);
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
    <View className="flex flex-row justify-end mb-4">
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

async function createAccount(
  name: string,
  email: string,
  dateString: string
): Promise<{ success: boolean }> {
  console.log(
    "Creating account with name:",
    name,
    "email:",
    email,
    "date:",
    dateString
  );
  try {
    const date_of_birth = dateString;
    const parsedReq = BodyUserCreationPostSchema.parse({
      name,
      email,
      date_of_birth,
    });
    console.log("Parsed request:", parsedReq);
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/create-account`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, date_of_birth }),
      schema: CreateAccountSchemaRes,
      method: "POST",
    });

    if (data.error) {
      console.log("Error:", data.details);
      throw new Error(data.details);
    }
    console.log("Account created successfully:", data);
    return {
      success: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
}
