import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import LogoCircle from "@/app/components/LogoCircle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import images from "../../constants/images";
import {
  CreateAccountSchemaRes,
  CreateAccountSchema,
} from "@/schemas/auth/preferences-schema";
import safeFetch from "@/app/utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { authClient, useSession } from "@/lib/auth-client";
import Toast from "react-native-toast-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Preferences = () => {
  const createAccount = useCreateAccount();
  const [preferences, setPreferences] = useState<string[]>([]);
  const { name, email, dateBirth } = useLocalSearchParams();
  const [selectedOne, setSelectedOne] = useState<boolean>(false);

  async function handleSubmit() {
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof dateBirth !== "string"
    ) {
      console.log("Invalid parameters");
      return;
    }
    createAccount.mutate({
      username: name,
      email,
      dateOfBirth: dateBirth,
      preferences,
    });
  }

  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <View className="flex flex-grow flex-col w-full justify-between px-14 pt-3">
        <View className="flex-1 flex-col w-full">
          <LogoCircle classname="w-[60] h-[60] mb-1 self-center" />
          <Text className="text-white text-[27px] font-pbold pt-6">
            How would you describe your fashion style?
          </Text>
          <Text className="text-grey-lighter text-[15px] font-pregular pt-3">
            Pick at least 1 to customize your home feed.
          </Text>
          <SelectionList
            setSelectedOne={setSelectedOne}
            setPreferences={setPreferences}
          />
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
      className="w-[49%] aspect-[1] my-4 flex flex-col items-center justify-center "
    >
      {item.image ? (
        <Image
          source={item.image}
          className={`
          w-full  
          h-full
          rounded-2xl
          ${isSelected ? "border-2 border-white" : ""}
        `}
          resizeMode="cover"
        />
      ) : null}
      <Text className="mt-1 text-[#d7d7d7] font-pregular">{item.title}</Text>
    </TouchableOpacity>
  );
};

const SelectionList = ({
  setSelectedOne,
  setPreferences,
}: {
  setSelectedOne: (value: boolean) => void;
  setPreferences: (value: string[]) => void;
}) => {
  const [selectedIdxs, setSelectedIdxs] = useState<string[]>([]);

  function handleOnpress(title: string) {
    console.log("handleOnpress", title);
    const updated = selectedIdxs.includes(title)
      ? selectedIdxs.filter(item => item !== title)
      : [...selectedIdxs, title];

    setSelectedIdxs(updated);
    setSelectedOne(updated.length > 0);
    setPreferences(updated);
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
    <View className="w-full mt-6 flex-1">
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.title}
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

function useCreateAccount() {
  const router = useRouter();
  const { status } = useSession();
  const mutation = useMutation({
    mutationFn: async (user: {
      username: string;
      email: string;
      dateOfBirth: string;
      preferences: string[];
    }) => {
      console.log(
        "Creating account with name:",
        user.username,
        "email:",
        user.email,
        "date:",
        user.dateOfBirth,
        "preferences:",
        user.preferences
      );
      CreateAccountSchema.parse({
        name: user.username,
        email: user.email,
        dateString: user.dateOfBirth,
        preferences: user.preferences,
      });
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/create-account`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.username,
          email: user.email,
          dateString: user.dateOfBirth,
          preferences: user.preferences,
        }),
        schema: CreateAccountSchemaRes,
        method: "POST",
      });
      if (data.error) {
        throw new Error(data.details);
      }
    },
    onSuccess: async () => {
      await authClient.updateUser({
        new: false,
      });
      if (status === "authenticated") {
        router.replace("/home");
      } else {
        Toast.show({
          type: "success",
          text1:
            "Account created successfully!\nPlease sign in with Google to continue.",
          visibilityTime: 4000,
        });
        router.replace("/sign-in");
      }
    },
    onError: error => {
      // TODO PUSH TOAST
      console.error("Error creating account:", error);
      Toast.show({
        type: "error",
        text1: "Error creating account",
        text2: "Please try again later.",
        visibilityTime: 4000,
      });
      router.replace("/sign-in");
    },
  });

  return mutation;
}

// async function createAccount(
//   name: string,
//   email: string,
//   dateString: string,
//   preferences: string[]
// ): Promise<{ success: boolean }> {
//   console.log(
//     "Creating account with name:",
//     name,
//     "email:",
//     email,
//     "date:",
//     dateString,
//     "preferences:",
//     preferences
//   );
//   try {
//     CreateAccountSchema.parse({
//       name,
//       email,
//       dateString,
//       preferences,
//     });
//     const { data } = await safeFetch({
//       url: `http://${LOCAL_IP}:3000/create-account`,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         dateString: dateString,
//         preferences,
//       }),
//       schema: CreateAccountSchemaRes,
//       method: "POST",
//     });

//     if (data.error) {
//       throw new Error(data.details);
//     }
//     await authClient.updateUser({
//       new: false,
//     });
//     return {
//       success: true,
//     };
//   } catch (error: unknown) {
//     console.error("Error creating account:", error);
//     return {
//       success: false,
//     };
//   }
// }
