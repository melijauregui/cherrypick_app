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
import { CatalogResponseSchema } from "@/schemas/catalog/catalog-schema";

const InsertItemSchema = z.object({
  productName: z
    .string()
    .min(1, { message: "Product name is required" })
    .refine(val => /[a-zA-Z0-9]/.test(val), {
      message: "Product name must contain at least one letter or number",
    }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .transform(val => val.replace(",", "."))
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .url({ message: "Please enter a valid URL" }),
  imageUrl: z
    .string()
    .min(1, { message: "Image URL is required" })
    .url({ message: "Please enter a valid image URL" }),
});

type FormData = {
  productName: string;
  description: string;
  price: string;
  url: string;
  imageUrl: string;
};

type FormErrors = {
  productName?: string;
  description?: string;
  price?: string;
  url?: string;
  imageUrl?: string;
};

const InsertNewItemsModal: React.FC<{
  bottomSheetRef: React.RefObject<BottomSheet>;
  onSubmit: (data: FormData) => void;
  brandEmail: string;
}> = ({ bottomSheetRef, onSubmit, brandEmail }) => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    price: "",
    url: "",
    imageUrl: "",
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

  const handleFieldChange = (field: keyof FormData, value: string) => {
    // Validar que el valor no sea undefined o null para evitar NaN
    const safeValue = value || "";

    setFormData(prev => ({ ...prev, [field]: safeValue }));

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = Boolean(
    formData.productName && formData.price && formData.url && formData.imageUrl
  );

  const formContent = (
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
          handleSubmit={() => mutation.mutate({ brandEmail, formData })}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
              productName: "",
              description: "",
              price: "",
              url: "",
              imageUrl: "",
            });
            setErrors({});
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
            handleSubmit={() => mutation.mutate({ brandEmail, formData })}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export default InsertNewItemsModal;
const FormContent = ({
  formData,
  handleFieldChange,
  errors,
  isFormValid,
  isSubmitting,
  handleSubmit,
}: {
  formData: FormData;
  handleFieldChange: (field: keyof FormData, value: string) => void;
  errors: FormErrors;
  isFormValid: boolean;
  isSubmitting: boolean;
  handleSubmit: () => void;
}) => {
  return (
    <View className="flex-1 px-6 pt-4">
      <ScrollView>
        <DataInput
          label="Product Name"
          data={formData.productName}
          handleFieldChange={handleFieldChange}
          error={errors.productName}
          field="productName"
          keyboardType="default"
          autoCapitalize="words"
        />

        <DataInput
          label="Product Description"
          data={formData.description}
          handleFieldChange={handleFieldChange}
          error={errors.description}
          field="description"
          keyboardType="default"
          autoCapitalize="none"
        />

        <DataInput
          label="Product URL"
          data={formData.url}
          handleFieldChange={handleFieldChange}
          error={errors.url}
          field="url"
          keyboardType="url"
          autoCapitalize="none"
        />

        <DataInput
          label="Image URL"
          data={formData.imageUrl}
          handleFieldChange={handleFieldChange}
          error={errors.imageUrl}
          field="imageUrl"
          keyboardType="url"
          autoCapitalize="none"
        />

        <DataInput
          label="Price"
          data={formData.price}
          handleFieldChange={handleFieldChange}
          error={errors.price}
          field="price"
          keyboardType="decimal-pad"
          autoCapitalize="none"
        />
      </ScrollView>
      <ButtonSubmit
        isSubmitting={isSubmitting}
        isFormValid={isFormValid}
        handleSubmit={handleSubmit}
        text="Insertar Item"
        loadingText="Insertando..."
      />
    </View>
  );
};
const DataInput = ({
  label,
  data,
  handleFieldChange,
  error,
  field,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  data: string;
  handleFieldChange: (field: keyof FormData, value: string) => void;
  error: string | undefined;
  field: keyof FormData;
  keyboardType: KeyboardTypeOptions;
  autoCapitalize: "none" | "sentences" | "words" | "characters";
}) => {
  return (
    <View className="my-5 mx-1">
      <Text className="text-black font-pmedium text-lg ">{label}</Text>
      <TextInput
        className="text-lg h-[40px] border-b border-gray-300 text-black  "
        placeholder={`Enter ${label}`}
        placeholderTextColor="#6b7280"
        value={data}
        onChangeText={text => handleFieldChange(field, text)}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        textContentType="none"
        autoCorrect={false}
      />
      {error && (
        <Text className="text-red-500 text-[14px] mt-1 font-plight">
          {error}
        </Text>
      )}
    </View>
  );
};

function useInsertItem(
  setFormData: (formData: FormData) => void,
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
        name: result.data.productName,
        description: result.data.description,
        price: Number(result.data.price),
        image_url: result.data.imageUrl,
        url: result.data.url,
      };

      const body = {
        brandEmail: data.brandEmail,
        items: [item],
      };

      // Cerrar el modal y limpiar el formulario inmediatamente
      setFormData({
        productName: "",
        description: "",
        price: "",
        url: "",
        imageUrl: "",
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
        text1: `The item ${variables.formData.productName} has been successfully added to the catalog.`,
        visibilityTime: 2000,
      });
    },
    onError: (responseError, data) => {
      const newErrors: FormErrors = {};
      if (responseError instanceof ZodError) {
        responseError.errors.forEach(error => {
          console.log("error", error);
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
            text1: `The item ${data.formData.productName} already exists in the catalog.`,
            visibilityTime: 6000,
          });
        } else if (responseError.message.includes("[1] mal formados")) {
          Toast.show({
            type: "error",
            text1: `The item ${data.formData.productName} is not valid.`,
            visibilityTime: 6000,
          });
        } else {
          Toast.show({
            type: "error",
            text1: `Error inserting item ${data.formData.productName}: ${responseError.message}`,
            visibilityTime: 6000,
          });
        }
        setIsSubmitting(false);
      }
    },
    onSettled: () => {
      setIsSubmitting(false);
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
