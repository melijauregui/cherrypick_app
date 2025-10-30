import ErrorPage from "../(auth)/error";
import LoadingPage from "../components/LoadingPage";
import { router } from "expo-router";
import { getSelfBrandProfile } from "../../utils/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StandardPageBottomSheet, {
  StandardDescription,
} from "../components/standar-page/standarPage";
import { useState } from "react";
import { Keyboard, ScrollView, Text, View } from "react-native";
import { useSession } from "@/lib/auth-client";
import { BrandSchema, BrandSchemaType } from "@/schemas/brand/brand-schema";
import z from "zod";
import InputBoxWithName from "../components/profile/inputBox";
import safeFetch from "../../utils/safe-fetch";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@/config/api";
import { usePostItemImage } from "./item-insert";
import ImageComplete from "../components/ImageComplete";
import { imageDefault } from "@/lib/constants";
import ImagePickerButton from "../components/imagePicker";

type BrandEditFormDataSchema = Omit<BrandSchemaType, "id" | "name">;
type BrandEditSchema = Omit<BrandEditFormDataSchema, "logo"> & {
  logoId: string;
};

export default function EditBrandPage() {
  const { user } = useSession();
  const {
    data: brand,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["self-brand-profile", user?.email],
    queryFn: () => getSelfBrandProfile(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !brand) {
    return <ErrorPage />;
  }

  console.log("brand", brand);

  return <EditBrandProfile brand={brand} />;
}

// URL validation schema with Zod
const urlSchema = z.string().url("Por favor ingresa una URL válida");
export type FormErrors = Partial<Record<keyof BrandSchemaType, string>>;

function EditBrandProfile({ brand }: { brand: BrandSchemaType }) {
  const [formData, setFormData] = useState<BrandEditFormDataSchema>({
    ...brand,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mutation = useUpdateBrand(brand.name, brand);

  const onSave = async (data: BrandEditFormDataSchema) => {
    const result = BrandSchema.safeParse(data);
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(error => {
        const field = error.path[0] as keyof BrandSchemaType;
        newErrors[field] = error.message;
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      setIsSubmitting(true);
      await mutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
    router.back();
  };

  const isFormValid =
    formData.url &&
    formData.description &&
    formData.logo.url &&
    (formData.url !== brand.url ||
      formData.description !== brand.description ||
      formData.logo.url !== brand.logo.url);

  return (
    <StandardPageBottomSheet
      disableSave={!isFormValid}
      onSave={() => onSave(formData)}
      onCancel={() => {
        Keyboard.dismiss();
        router.back();
      }}
      onLoading={isSubmitting}
      section="Editar marca"
    >
      <StandardDescription description="Completa la información de tu marca para que los clientes puedan conocerte mejor. Una descripción atractiva y una página web oficial ayudarán a generar más confianza y ventas." />

      <ScrollView>
        <View className="flex flex-col justify-center items-center px-5 gap-5">
          <View>
            <ImageComplete
              imageUrl={formData.logo.url ?? imageDefault}
              imageUrlUpdatedAt={undefined}
              maxHeight={600}
              imageWidth={formData.logo.width}
              imageHeight={formData.logo.height}
            />
            <View className="flex justify-center items-center">
              <ImagePickerButton
                setImage={image =>
                  setFormData({
                    ...formData,
                    logo: {
                      url: image,
                      updatedAt: new Date().toISOString(),
                      width: formData.logo.width,
                      height: formData.logo.height,
                    },
                  })
                }
              >
                <View className=" bg-beige rounded-2xl px-4 py-2 mt-3 items-center justify-center">
                  <Text className="text-black text-base font-pmedium">
                    Editar imagen
                  </Text>
                </View>
              </ImagePickerButton>
            </View>
          </View>
          <View className="gap-4 w-full">
            <InputBoxWithName
              name="página oficial url"
              value={formData.url}
              setValue={text => {
                setFormData({ ...formData, url: text });
              }}
              lastValue={brand.url}
              isScrollable={false}
              placeholder="Escribe la url de la página oficial de la marca"
              error={errors.url}
              autoCapitalize="none"
              keyboardType="url"
            />

            <InputBoxWithName
              name="descripción"
              value={formData.description}
              setValue={text => {
                setFormData({ ...formData, description: text });
              }}
              lastValue={brand.description}
              isScrollable={true}
              length={200}
              placeholder="Escribe una descripción de tu marca"
              height={120}
            />
          </View>
        </View>
      </ScrollView>
    </StandardPageBottomSheet>
  );
}

function useUpdateBrand(
  brandName: string,
  lastValueBrand: BrandEditFormDataSchema
) {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const postImageMutation = usePostItemImage();
  const mutation = useMutation({
    mutationFn: async (brand: BrandEditFormDataSchema) => {
      const brandUpdated: BrandEditSchema = {
        description: brand.description,
        url: brand.url,
        logoId: "",
      };
      if (brand.logo.url !== lastValueBrand.logo.url) {
        //subir imagen
        const imageId = await postImageMutation.mutateAsync({
          fileUrl: brand.logo.url,
          fileName: brandName,
        });
        brandUpdated.logoId = imageId;
      }
      brandUpdated.description = brand.description;
      brandUpdated.url = brand.url;

      const { data } = await safeFetch({
        url: `${BASE_URL}/brand`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandUpdated),
      });
      if (data.error) {
        throw new Error(data.details);
      }
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: `Marca actualizada correctamente`,
        visibilityTime: 4000,
      });
    },
    onError: error => {
      Toast.show({
        type: "error",
        text1: `No se pudo actualizar la marca:`,
        visibilityTime: 4000,
      });
      console.log(`No se pudo actualizar la marca:`, error);
    },
    onSettled: () => {
      console.log("onSettled");
      void queryClient.invalidateQueries({
        queryKey: ["self-brand-profile", user.email],
      });
      void queryClient.invalidateQueries({
        queryKey: ["brand-profile-item", user.id],
      });
    },
  });

  return mutation;
}
