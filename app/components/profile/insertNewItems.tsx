import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardTypeOptions,
  ScrollView,
  TextInput,
} from "react-native";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { z, ZodError } from "zod";
import BottomSheetSame from "./bottomSheets";
import { LOCAL_IP } from "@/config/api";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import safeFetch from "@/app/utils/safe-fetch";
import {
  CatalogResponseSchema,
  UpdateItemResponseSchema,
  InsertItemSchema,
} from "@/schemas/catalog/catalog-schema";
import InputBoxWithName from "./inputBox";

export type FormData = {
  name: string;
  description: string;
  price: string;
  url: string;
  image_url: string;
};

type FormErrors = {
  name?: string;
  description?: string;
  price?: string;
  url?: string;
  image_url?: string;
};

export const InsertNewItemsModal: React.FC<{
  bottomSheetRef: React.RefObject<BottomSheet>;
  onSubmit: (data: FormData) => void;
  brandEmail: string;
  formDataLastValue: FormData;
}> = ({ bottomSheetRef, onSubmit, brandEmail, formDataLastValue }) => {
  const [formData, setFormData] = useState<FormData>({
    ...formDataLastValue,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useInsertItem(
    setFormData,
    setIsSubmitting,
    setErrors,
    onSubmit,
    bottomSheetRef
  );
  return (
    <ItemsModalDetails
      bottomSheetRef={bottomSheetRef}
      onSubmit={onSubmit}
      brandEmail={brandEmail}
      formDataLastValue={formDataLastValue}
      submitMutate={(brandEmail, formData) =>
        mutation.mutate({ brandEmail, formData })
      }
      setFormData={setFormData}
      formData={formData}
      setIsSubmitting={setIsSubmitting}
      setErrors={setErrors}
      errors={errors}
      isSubmitting={isSubmitting}
      isNewItem={true}
    />
  );
};

export const UpdateItemModal: React.FC<{
  bottomSheetRef: React.RefObject<BottomSheet>;
  onSubmit: (data: FormData) => void;
  brandEmail: string;
  formDataLastValue: FormData;
  itemUuid: string;
}> = ({
  bottomSheetRef,
  onSubmit,
  brandEmail,
  formDataLastValue,
  itemUuid,
}) => {
  const [formData, setFormData] = useState<FormData>({
    ...formDataLastValue,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useUpdateItem(
    setFormData,
    setIsSubmitting,
    setErrors,
    onSubmit,
    bottomSheetRef,
    formDataLastValue,
    itemUuid
  );
  return (
    <ItemsModalDetails
      bottomSheetRef={bottomSheetRef}
      onSubmit={onSubmit}
      brandEmail={brandEmail}
      formDataLastValue={formDataLastValue}
      submitMutate={(brandEmail, formData) =>
        mutation.mutate({ brandEmail, formData })
      }
      setFormData={setFormData}
      formData={formData}
      setIsSubmitting={setIsSubmitting}
      setErrors={setErrors}
      errors={errors}
      isSubmitting={isSubmitting}
      isNewItem={false}
    />
  );
};

const ItemsModalDetails: React.FC<{
  bottomSheetRef: React.RefObject<BottomSheet>;
  onSubmit: (data: FormData) => void;
  brandEmail: string;
  formDataLastValue: FormData;
  submitMutate: (brandEmail: string, formData: FormData) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  errors: FormErrors;
  isSubmitting: boolean;
  isNewItem: boolean;
}> = ({
  bottomSheetRef,
  onSubmit,
  brandEmail,
  formDataLastValue,
  submitMutate,
  setFormData,
  setIsSubmitting,
  setErrors,
  formData,
  errors,
  isSubmitting,
  isNewItem,
}) => {
  const handleFieldChange = (field: keyof FormData, value: string) => {
    // Validar que el valor no sea undefined o null para evitar NaN
    const safeValue = value || "";

    // Solo para el campo price, convertir comas a puntos
    if (field === "price") {
      const priceValue = safeValue.replace(",", ".");
      setFormData((prev: FormData) => ({ ...prev, [field]: priceValue }));
    } else {
      setFormData((prev: FormData) => ({ ...prev, [field]: safeValue }));
    }

    if (errors[field as keyof FormErrors]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = Boolean(
    formData.name &&
      formData.price &&
      formData.url &&
      formData.image_url &&
      formData.description &&
      formData.price &&
      (formData.name !== formDataLastValue.name ||
        formData.description !== formDataLastValue.description ||
        formData.price !== formDataLastValue.price ||
        formData.url !== formDataLastValue.url ||
        formData.image_url !== formDataLastValue.image_url)
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={() => {}}
      index={-1}
      enableDynamicSizing={false}
      snapPoints={[520]}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableOverDrag={false}
    >
      <View className="flex flex-row justify-between items-center  relative py-3 border-b border-gray-300 px-6">
        <Text className="text-black font-pmedium text-xl absolute right-0 left-0 text-center">
          {"Add New Item"}
        </Text>

        <TouchableOpacity
          className="flex flex-row ml-auto"
          onPress={() => {
            bottomSheetRef.current?.close();
            setFormData({
              ...formDataLastValue,
            });
            setErrors({});
            Keyboard.dismiss();
          }}
        >
          <Text className="text-xl  font-plight">Cancel</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContent
            formData={formData}
            handleFieldChange={handleFieldChange}
            errors={errors}
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
            handleSubmit={() => submitMutate(brandEmail, formData)}
            isNewItem={isNewItem}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export default ItemsModalDetails;
const FormContent = ({
  formData,
  handleFieldChange,
  errors,
  isFormValid,
  isSubmitting,
  handleSubmit,
  isNewItem,
}: {
  formData: FormData;
  handleFieldChange: (field: keyof FormData, value: string) => void;
  errors: FormErrors;
  isFormValid: boolean;
  isSubmitting: boolean;
  handleSubmit: () => void;
  isNewItem: boolean;
}) => {
  return (
    <View className="flex-1 px-6 pt-4">
      <ScrollView className="">
        <View className="flex flex-col gap-6">
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
            name="Image URL"
            value={formData.image_url}
            setValue={text => handleFieldChange("image_url", text)}
            error={errors.image_url}
            lastValue={formData.image_url}
            isScrollable={false}
            keyboardType="url"
            autoCapitalize="none"
            placeholder="Escribe la url de la imagen del nuevo item"
          />

          <InputBoxWithName
            name="Price"
            value={formData.price}
            setValue={text => handleFieldChange("price", text)}
            error={errors.price}
            lastValue={formData.price.toString()}
            isScrollable={false}
            placeholder="Escribe el precio del nuevo item"
            keyboardType="decimal-pad"
            autoCapitalize="none"
          />
        </View>
      </ScrollView>
      <ButtonSubmit
        isSubmitting={isSubmitting}
        isFormValid={isFormValid}
        handleSubmit={handleSubmit}
        text={isNewItem ? "Insertar Item" : "Actualizar Item"}
        loadingText={isNewItem ? "Insertando..." : "Actualizando..."}
      />
    </View>
  );
};

function useInsertItem(
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setIsSubmitting: (isSubmitting: boolean) => void,
  setErrors: (errors: FormErrors) => void,
  onSubmit: (data: FormData) => void,
  bottomSheetRef: React.RefObject<BottomSheet>
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { brandEmail: string; formData: FormData }) => {
      const result = InsertItemSchema.safeParse(data.formData);
      if (!result.success) {
        throw new ZodError(result.error.errors);
      }
      setErrors({});

      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      bottomSheetRef.current?.close();

      const item = {
        name: result.data.name,
        description: result.data.description,
        price: result.data.price,
        image_url: result.data.image_url,
        url: result.data.url,
      };

      // Cerrar el modal y limpiar el formulario inmediatamente
      setFormData({
        name: "",
        description: "",
        price: "",
        url: "",
        image_url: "",
      });

      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/insert-catalog-brand`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandEmail: data.brandEmail,
          items: [item],
        }),
        schema: CatalogResponseSchema,
      });
      if (response.data.error) {
        throw new Error(response.data.details);
      }
      return response.data;
    },
    onSuccess: (data, variables) => {
      onSubmit(variables.formData);
      Toast.show({
        type: "success",
        text1: `The item ${variables.formData.name} has been successfully added to the catalog.`,
        visibilityTime: 2000,
      });
    },
    onError: (responseError, data) => {
      const newErrors: FormErrors = {};
      if (responseError instanceof ZodError) {
        responseError.errors.forEach(error => {
          const field = error.path[0] as keyof FormData;
          newErrors[field] = error.message;
        });
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }
      if (responseError instanceof Error) {
        if (responseError.message.includes("[1] duplicados")) {
          Toast.show({
            type: "error",
            text1: `The item ${data.formData.name} already exists in the catalog.`,
            visibilityTime: 6000,
          });
        } else if (responseError.message.includes("[1] mal formados")) {
          Toast.show({
            type: "error",
            text1: `The item ${data.formData.name} is not valid.`,
            visibilityTime: 6000,
          });
        } else {
          Toast.show({
            type: "error",
            text1: `Error inserting item ${data.formData.name}: ${responseError.message}`,
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

function useUpdateItem(
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setIsSubmitting: (isSubmitting: boolean) => void,
  setErrors: (errors: FormErrors) => void,
  onSubmit: (data: FormData) => void,
  bottomSheetRef: React.RefObject<BottomSheet>,
  formDataLastValue: FormData,
  itemUuid: string
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { brandEmail: string; formData: FormData }) => {
      const result = InsertItemSchema.safeParse({
        ...data.formData,
        uuid: itemUuid,
      });
      if (!result.success) {
        throw new ZodError(result.error.errors);
      }
      setErrors({});

      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      bottomSheetRef.current?.close();

      // Only include fields that have changed compared to formDataLastValue
      const itemUpdated: Partial<FormData> = {};

      if (result.data.name !== formDataLastValue.name) {
        itemUpdated.name = result.data.name;
      }
      if (result.data.description !== formDataLastValue.description) {
        itemUpdated.description = result.data.description;
      }
      if (result.data.price !== formDataLastValue.price) {
        itemUpdated.price = result.data.price;
      }
      if (result.data.image_url !== formDataLastValue.image_url) {
        itemUpdated.image_url = result.data.image_url;
      }
      if (result.data.url !== formDataLastValue.url) {
        itemUpdated.url = result.data.url;
      }

      setFormData({
        ...formDataLastValue,
        ...itemUpdated,
      });

      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/update-item?uuid=${itemUuid}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemUpdated),
        schema: UpdateItemResponseSchema,
      });
      if (response.data.error) {
        throw new Error(response.data.details);
      }
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log("itemUuid in useUpdateItem", itemUuid);
      void queryClient.invalidateQueries({
        queryKey: ["item-detail", itemUuid],
      });
      onSubmit(variables.formData);
      Toast.show({
        type: "normal",
        text1: `The item ${variables.formData.name} has been successfully updated in the catalog!`,
        visibilityTime: 2000,
      });
    },
    onError: (responseError, data) => {
      const newErrors: FormErrors = {};
      if (responseError instanceof ZodError) {
        responseError.errors.forEach(error => {
          const field = error.path[0] as keyof FormData;
          console.log("field", field);
          newErrors[field] = error.message;
        });
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }
      if (responseError instanceof Error) {
        if (responseError.message.includes("[1] duplicados")) {
          Toast.show({
            type: "error",
            text1: `The item ${data.formData.name} already exists in the catalog.`,
            visibilityTime: 6000,
          });
        } else if (responseError.message.includes("[1] mal formados")) {
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

export const ButtonSubmit = ({
  isSubmitting,
  isFormValid,
  handleSubmit,
  text,
  loadingText,
}: {
  isSubmitting: boolean;
  isFormValid: boolean;
  handleSubmit: () => void;
  text: string;
  loadingText: string;
}) => {
  return (
    <View className="flex flex-row justify-end my-2 py-3">
      <TouchableOpacity
        disabled={!isFormValid || isSubmitting}
        onPress={handleSubmit}
        className={`
        flex flex-row items-center px-6 py-3 rounded-3xl
        ${!isFormValid || isSubmitting ? "opacity-50" : ""}
      `}
        style={{
          backgroundColor: "rgba(107, 114, 128, 0.5)",
        }}
      >
        <Text className="text-[16px] font-psemibold text-white">
          {isSubmitting ? loadingText : text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
