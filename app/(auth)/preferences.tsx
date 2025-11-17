import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import images from "../../constants/images";
import SignPage, {
  NextButton,
  SignPageContent,
  SignPageFooter,
  SignPageHeader,
} from "../components/(auth)/signPage";
import { useMutation } from "@tanstack/react-query";
import { UpdatePreferencesSchema } from "@/schemas/client/client-schema";
import { SuccessSchema } from "@/schemas/standar-response-schema";
import safeFetch from "../../utils/safe-fetch";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@/config/api";

const Preferences = () => {
  const router = useRouter();
  const [preferences, setPreferences] = useState<string[]>([]);
  const [selectedOne, setSelectedOne] = useState<boolean>(false);
  const updatePreferences = useUpdatePreferences();

  async function handleSubmit() {
    updatePreferences.mutate(preferences);
  }

  return (
    <SignPage>
      <SignPageContent>
        <SignPageHeader>¿Cómo describirías tu estilo de moda?</SignPageHeader>
        <Text className="text-grey-lighter text-[15px] font-pregular pt-3">
          Selecciona al menos 1 para personalizar tu feed de inicio.
        </Text>
        <SelectionList
          setSelectedOne={setSelectedOne}
          setPreferences={setPreferences}
        />
        <SignPageFooter>
          <NextButton
            onPress={async () => {
              handleSubmit();
            }}
            isLoading={false}
            isDisabled={!selectedOne}
          />
        </SignPageFooter>
      </SignPageContent>
    </SignPage>
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

function useUpdatePreferences() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (preferences: string[]) => {
      const preferencesValidated = UpdatePreferencesSchema.parse({
        preferences: preferences,
      });

      const { data } = await safeFetch({
        url: `${BASE_URL}/client/preferences`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencesValidated),
        method: "PATCH",
      });
      if (data.error) {
        throw new Error(data.details);
      }
      SuccessSchema.parse(data);
    },
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: "Cuenta creada correctamente",
        visibilityTime: 4000,
      });
      router.replace("/home");
    },
    onError: error => {
      console.error("Error creating account:", error);
      Toast.show({
        type: "error",
        text1: "Error al crear la cuenta",
        text2: "Por favor, inténtalo de nuevo más tarde.",
        visibilityTime: 4000,
      });
      router.replace("/sign-in");
    },
  });

  return mutation;
}
