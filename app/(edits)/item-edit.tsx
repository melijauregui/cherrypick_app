import { useSession } from "@/lib/auth-client";
import ErrorPage from "../(auth)/error";
import LoadingPage from "../components/LoadingPage";
import { router, useLocalSearchParams } from "expo-router";
import { getItem } from "../utils/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ItemSchemaType,
  MinimumPropertiesItemSchema,
  UploadItemImageResponseSchema,
} from "@/schemas/catalog/catalog-schema";
import { StandardPageBottomSheet } from "../components/standar-page/standarPage";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ImageComplete from "../components/ImageComplete";
import { imageDefault } from "@/lib/constants";
import ImagePickerButton from "../components/imagePicker";
import InputBoxWithName from "../components/profile/inputBox";
import safeFetch from "../utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import Toast from "react-native-toast-message";

type ItemSchemaUpdateForm = Omit<ItemSchemaType, "price"> & {
  price: string;
};

export default function EditItemPage() {
  const params = useLocalSearchParams();
  const itemUuid = decodeURIComponent(params.uuid as string);
  const { user } = useSession();
  const {
    data: itemData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["item-detail", itemUuid],
    queryFn: () => getItem(itemUuid),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isLoading || !itemData) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const item = {
    ...itemData.item,
    price: itemData.item.price.toString(),
  };

  return <EditItem item={item} />;
}

export type FormErrors = Partial<Record<keyof ItemSchemaUpdateForm, string>>;

function EditItem({ item }: { item: ItemSchemaUpdateForm }) {
  const [formData, setFormData] = useState<ItemSchemaUpdateForm>({
    ...item,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useUpdateItem(setIsSubmitting, item, item.uuid);

  const onSave = async (data: ItemSchemaUpdateForm) => {
    const result = MinimumPropertiesItemSchema.safeParse({
      ...data,
    });
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(error => {
        const field = error.path[0] as keyof ItemSchemaUpdateForm;
        newErrors[field] = error.message;
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    setErrors({});

    await mutation.mutateAsync({ formData });
    router.back();
  };
  return (
    <StandardPageBottomSheet
      onSave={() => onSave(formData)}
      onCancel={() => router.back()}
      onLoading={isSubmitting}
      section="Edit Item"
    >
      <ItemsBottomSheetDetails
        onSubmit={onSave}
        formDataLastValue={item}
        submitMutate={onSave}
        setFormData={setFormData}
        setIsSubmitting={setIsSubmitting}
        setErrors={setErrors}
        errors={errors}
        formData={formData}
      />
    </StandardPageBottomSheet>
  );
}

//oncancel  Keyboard.dismiss();
const ItemsBottomSheetDetails: React.FC<{
  onSubmit: (data: ItemSchemaUpdateForm) => void;
  formDataLastValue: ItemSchemaUpdateForm;
  submitMutate: (formData: ItemSchemaUpdateForm) => void;
  setFormData: React.Dispatch<React.SetStateAction<ItemSchemaUpdateForm>>;
  formData: ItemSchemaUpdateForm;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  errors: FormErrors;
}> = ({
  onSubmit,
  formDataLastValue,
  submitMutate,
  setFormData,
  setIsSubmitting,
  setErrors,
  formData,
  errors,
}) => {
  const handleFieldChange = (
    field: keyof ItemSchemaUpdateForm,
    value: string
  ) => {
    // Validar que el valor no sea undefined o null para evitar NaN
    const safeValue = value || "";

    // Solo para el campo price, convertir comas a puntos
    if (field === "price") {
      const priceValue = safeValue.replace(",", ".");
      setFormData((prev: ItemSchemaUpdateForm) => ({
        ...prev,
        [field]: priceValue,
      }));
    } else {
      setFormData((prev: ItemSchemaUpdateForm) => ({
        ...prev,
        [field]: safeValue,
      }));
    }

    if (errors[field as keyof FormErrors]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = Boolean(
    formData.name &&
      formData.price &&
      formData.url &&
      formData.image.url &&
      formData.description &&
      formData.price &&
      (formData.name !== formDataLastValue.name ||
        formData.description !== formDataLastValue.description ||
        formData.price !== formDataLastValue.price ||
        formData.url !== formDataLastValue.url ||
        formData.image.url !== formDataLastValue.image.url)
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 "
    >
      <ScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View className="flex flex-col gap-4">
              <View>
                <ImageComplete
                  imageUrl={formData.image.url ?? imageDefault}
                  imageUrlUpdatedAt={undefined}
                  maxHeight={600}
                />
                <View className="flex justify-center items-center">
                  <ImagePickerButton
                    setImage={image =>
                      setFormData({
                        ...formData,
                        image: {
                          url: image,
                          updatedAt: new Date().toISOString(),
                        },
                      })
                    }
                  >
                    <View className=" bg-beige rounded-2xl px-4 py-2 mt-3 items-center justify-center">
                      <Text className="text-black text-base font-pmedium">
                        Edit image
                      </Text>
                    </View>
                  </ImagePickerButton>
                </View>
              </View>
              <View className="flex flex-col gap-4 px-4">
                <InputBoxWithName
                  name="Product Name"
                  value={formData.name}
                  setValue={text => handleFieldChange("name", text)}
                  error={errors.name}
                  lastValue={formData.name}
                  isScrollable={false}
                  keyboardType="default"
                  autoCapitalize="words"
                  placeholder="Escribe el nombre del nuevo item"
                />

                <InputBoxWithName
                  name="Description"
                  value={formData.description}
                  error={errors.description}
                  setValue={text => handleFieldChange("description", text)}
                  lastValue={formData.description}
                  isScrollable={true}
                  placeholder="Escribe una descripción del nuevo item"
                  height={120}
                />

                <InputBoxWithName
                  name="Product URL"
                  value={formData.url}
                  setValue={text => handleFieldChange("url", text)}
                  error={errors.url}
                  lastValue={formData.url}
                  keyboardType="url"
                  autoCapitalize="none"
                  placeholder="Escribe la url del nuevo item"
                  isScrollable={false}
                />

                <InputBoxWithName
                  name="Price"
                  value={formData.price.toString()}
                  setValue={text => handleFieldChange("price", text)}
                  error={errors.price}
                  lastValue={formData.price.toString()}
                  isScrollable={false}
                  placeholder="Escribe el precio del nuevo item"
                  keyboardType="decimal-pad"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

type ItemSchemaTypeUpload = Partial<Omit<ItemSchemaUpdateForm, "image">> & {
  imageId: string;
};

function useUpdateItem(
  setIsSubmitting: (isSubmitting: boolean) => void,
  itemLastValue: ItemSchemaUpdateForm,
  itemUuid: string
) {
  const queryClient = useQueryClient();
  const postImageMutation = usePostItemImage();
  const mutation = useMutation({
    mutationFn: async (data: { formData: ItemSchemaUpdateForm }) => {
      const formData = data.formData;

      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Only include fields that have changed compared to formDataLastValue
      const itemUpdated: Partial<ItemSchemaTypeUpload> = {};

      if (formData.name !== itemLastValue.name) {
        itemUpdated.name = formData.name;
      }
      if (formData.description !== itemLastValue.description) {
        itemUpdated.description = formData.description;
      }
      if (formData.price !== itemLastValue.price) {
        itemUpdated.price = formData.price;
      }
      if (formData.image.url !== itemLastValue.image.url) {
        //subir imagen
        const imageId = await postImageMutation.mutateAsync({
          fileUrl: formData.image.url,
          itemUuid,
        });
        itemUpdated.imageId = imageId;
      }
      if (formData.url !== itemLastValue.url) {
        itemUpdated.url = formData.url;
      }

      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/item/${itemUuid}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemUpdated),
      });
      if (response.data.error) {
        throw new Error(response.data.details);
      }
      return response.data;
    },
    onSuccess: (data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["item-detail", itemUuid],
      });
      Toast.show({
        type: "success",
        text1: `The item ${variables.formData.name} has been successfully updated in the catalog!`,
        visibilityTime: 2000,
      });
    },
    onError: (responseError, data) => {
      if (responseError instanceof Error) {
        if (responseError.message.includes("[1] mal formados")) {
          Toast.show({
            type: "error",
            text1: `The item ${data.formData.name} is not valid.`,
            visibilityTime: 6000,
          });
        } else {
          Toast.show({
            type: "error",
            text1: `Error updating item ${data.formData.name}: ${responseError.message}`,
            visibilityTime: 6000,
          });
        }
        setIsSubmitting(false);
      }
    },
    onSettled: () => {
      setIsSubmitting(false);
      Keyboard.dismiss();
    },
  });

  return mutation;
}

function usePostItemImage() {
  const mutation = useMutation({
    mutationFn: async (data: { fileUrl: string; itemUuid: string }) => {
      const response = await fetch(data.fileUrl);
      const blob = await response.blob();

      const responsePost = await safeFetch({
        url: `http://${LOCAL_IP}:3000/item/${data.itemUuid}/image`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: blob.type }),
      });
      const imageUploadUrl = responsePost.data;
      const { id: imageId, uploadUrl } =
        UploadItemImageResponseSchema.parse(imageUploadUrl);

      console.log("uploadUrl", uploadUrl);
      console.log("imageId", imageId);

      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": blob.type,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: blob,
      });
      if (!res.ok) {
        const txt = await res
          .text()
          .catch(e => (e instanceof Error ? e.message : "unknown error"));
        throw new Error(
          `Upload failed: ${res.status} ${res.statusText} ${txt}`
        );
      }
      console.log("POST SUCCESSFULLY");
      return imageId;
    },
    onError: (responseError, data) => {
      if (responseError instanceof Error) {
        console.error("ERROR UPLOADING ITEM IMAGE", responseError.message);
        Toast.show({
          type: "error",
          text1: `Error uploading item image`,
          visibilityTime: 6000,
        });
      }
    },
  });

  return mutation;
}
