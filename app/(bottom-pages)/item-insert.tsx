import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ItemSchemaType,
  MinimumPropertiesItemSchema,
  UploadItemImageResponseSchema,
} from "@/schemas/catalog/catalog-schema";
import { StandardPageBottomSheet } from "../components/standar-page/standarPage";
import { useState } from "react";
import {
  Image,
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
import { sanitizeFilename } from "../utils/sanitize-filename";
import { FormErrors } from "./item-edit";

export type InsertItemSchema = Omit<
  ItemSchemaType,
  "price" | "brandId" | "uuid"
> & {
  price: string;
};

export default function InsertItemPage() {
  const [formData, setFormData] = useState<InsertItemSchema>({
    name: "",
    description: "",
    price: "",
    url: "",
    image: {
      url: "",
      updatedAt: "",
      width: undefined,
      height: undefined,
    },
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useInsertItem();

  const onSave = async (data: InsertItemSchema) => {
    const result = MinimumPropertiesItemSchema.safeParse({
      ...data,
    });
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(error => {
        const field = error.path[0] as keyof InsertItemSchema;
        newErrors[field] = error.message;
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      setIsSubmitting(true);
      await mutation.mutateAsync({ formData });
    } finally {
      setIsSubmitting(false);
    }
    router.back();
  };
  const isFormValid = Boolean(
    formData.name &&
      formData.price &&
      formData.url &&
      formData.image.url &&
      formData.description &&
      formData.price
  );
  return (
    <StandardPageBottomSheet
      onSave={() => onSave(formData)}
      onCancel={() => router.back()}
      onLoading={isSubmitting}
      section="Insertar nuevo item"
      disableSave={!isFormValid}
    >
      <ItemsBottomSheetDetails
        formDataLastValue={formData}
        setFormData={setFormData}
        setErrors={setErrors}
        errors={errors}
        formData={formData}
      />
    </StandardPageBottomSheet>
  );
}

export function ItemsBottomSheetDetails({
  formDataLastValue,
  setFormData,
  setErrors,
  formData,
  errors,
}: {
  formDataLastValue: InsertItemSchema;
  setFormData: React.Dispatch<React.SetStateAction<InsertItemSchema>>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  formData: InsertItemSchema;
  errors: FormErrors;
}) {
  const handleFieldChange = (field: keyof InsertItemSchema, value: string) => {
    // Validar que el valor no sea undefined o null para evitar NaN
    const safeValue = value || "";

    // Solo para el campo price, convertir comas a puntos
    if (field === "price") {
      const priceValue = safeValue.replace(",", ".");
      setFormData((prev: InsertItemSchema) => ({
        ...prev,
        [field]: priceValue,
      }));
    } else {
      setFormData((prev: InsertItemSchema) => ({
        ...prev,
        [field]: safeValue,
      }));
    }

    if (errors[field as keyof FormErrors]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
    }
  };

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
                          width: formData.image.width,
                          height: formData.image.height,
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
                  autoCapitalize="none"
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
                  autoCapitalize="none"
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
}

export type InsertItemImageIdSchema = Partial<
  Omit<InsertItemSchema, "image">
> & {
  imageId: string;
};

function useInsertItem() {
  const queryClient = useQueryClient();
  const postImageMutation = usePostItemImage();
  const mutation = useMutation({
    mutationFn: async (data: { formData: InsertItemSchema }) => {
      const formData = data.formData;

      const imageId = await postImageMutation.mutateAsync({
        fileUrl: formData.image.url,
        fileName: formData.name,
      });
      const insertItem: Partial<InsertItemImageIdSchema> = {
        ...formData,
        imageId: imageId,
      };

      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/insert-items`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [insertItem],
        }),
      });
      if (response.data.error) {
        throw new Error(response.data.details + "\n" + response.data.info);
      }
      return response.data;
    },
    onSuccess: (data, variables) => {
      Toast.show({
        type: "success",
        text1: `The item ${variables.formData.name} has been successfully added to the catalog.`,
        visibilityTime: 2000,
      });
    },
    onError: (responseError, data) => {
      if (responseError instanceof Error) {
        console.log("responseError", responseError.message);
        Toast.show({
          type: "error",
          text1: `Error inserting item ${data.formData.name}`,
          visibilityTime: 6000,
        });
      }
    },
    onSettled: () => {
      Keyboard.dismiss();
    },
  });

  return mutation;
}

export function usePostItemImage() {
  const mutation = useMutation({
    mutationFn: async (data: { fileUrl: string; fileName: string }) => {
      const response = await fetch(data.fileUrl);
      const blob = await response.blob();

      // Calculate image dimensions
      const imageDimensions = await new Promise<{
        width: number;
        height: number;
      }>((resolve, reject) => {
        Image.getSize(
          data.fileUrl,
          (width, height) => {
            resolve({ width, height });
          },
          error => {
            reject(error);
          }
        );
      });

      const responsePost = await safeFetch({
        url: `http://${LOCAL_IP}:3000/item/image`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: blob.type,
          width: imageDimensions.width,
          height: imageDimensions.height,
          fileName: sanitizeFilename(data.fileName),
        }),
      });
      const imageUploadUrl = responsePost.data;
      const { id: imageId, uploadUrl } =
        UploadItemImageResponseSchema.parse(imageUploadUrl);

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

// export function usePostItemImage() {
//   const mutation = useMutation({
//     mutationFn: async (data: { fileUrl: string; itemUuid: string }) => {
//       const response = await fetch(data.fileUrl);
//       const blob = await response.blob();

//       const responsePost = await safeFetch({
//         url: `http://${LOCAL_IP}:3000/item/${data.itemUuid}/image`,
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ contentType: blob.type }),
//       });
//       const imageUploadUrl = responsePost.data;
//       const { id: imageId, uploadUrl } =
//         UploadItemImageResponseSchema.parse(imageUploadUrl);

//       console.log("uploadUrl", uploadUrl);
//       console.log("imageId", imageId);

//       const res = await fetch(uploadUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": blob.type,
//           "Cache-Control": "no-cache, no-store, must-revalidate",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//         body: blob,
//       });
//       if (!res.ok) {
//         const txt = await res
//           .text()
//           .catch(e => (e instanceof Error ? e.message : "unknown error"));
//         throw new Error(
//           `Upload failed: ${res.status} ${res.statusText} ${txt}`
//         );
//       }
//       console.log("POST SUCCESSFULLY");
//       return imageId;
//     },
//     onError: (responseError, data) => {
//       if (responseError instanceof Error) {
//         console.error("ERROR UPLOADING ITEM IMAGE", responseError.message);
//         Toast.show({
//           type: "error",
//           text1: `Error uploading item image`,
//           visibilityTime: 6000,
//         });
//       }
//     },
//   });

//   return mutation;
// }
