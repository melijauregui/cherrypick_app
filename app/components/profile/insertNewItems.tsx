import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardTypeOptions,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { z } from "zod";
import BottomSheetSame from "./bottomSheets";
import safeFetch from "@/app/utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

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
  brand: string;
}> = ({ bottomSheetRef, onSubmit, brand }) => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    price: "",
    url: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid =
    formData.productName && formData.price && formData.url && formData.imageUrl;

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
          handleSubmit={() =>
            handleSubmit(
              brand,
              formData,
              setFormData,
              setIsSubmitting,
              setErrors,
              onSubmit,
              bottomSheetRef
            )
          }
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

  return (
    <BottomSheetSame
      bottomSheetRef={bottomSheetRef}
      onSubmit={() => {}}
      isReady={false}
      hasDone={false}
      componentView={formContent}
      value="Add New Item"
    />
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
  isFormValid: string;
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
}) => {
  return (
    <View className="flex-1 px-6 py-4">
      <BottomSheetScrollView>
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
      </BottomSheetScrollView>
      <View className="flex flex-row justify-end my-2">
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
            {isSubmitting ? "Inserting..." : "Insert Item"}
          </Text>
        </TouchableOpacity>
      </View>
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
      <BottomSheetTextInput
        className="text-lg h-[40px] border-b border-gray-300 text-black  "
        placeholder={`Enter ${label}`}
        placeholderTextColor="#6b7280"
        value={data}
        onChangeText={text => handleFieldChange(field, text)}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
      {error && (
        <Text className="text-red-500 text-[14px] mt-1 font-plight">
          {error}
        </Text>
      )}
    </View>
  );
};

const handleSubmit = async (
  brand: string,
  formData: FormData,
  setFormData: (formData: FormData) => void,
  setIsSubmitting: (isSubmitting: boolean) => void,
  setErrors: (errors: FormErrors) => void,
  onSubmit: (data: FormData) => void,
  bottomSheetRef: React.RefObject<BottomSheet>
): Promise<void> => {
  setIsSubmitting(true);

  const nameProduct = formData.productName;

  try {
    const result = InsertItemSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(error => {
        const field = error.path[0] as keyof FormData;
        newErrors[field] = error.message;
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    const item = {
      name: result.data.productName,
      description: result.data.description,
      price: Number(result.data.price),
      image_url: result.data.imageUrl,
      url: result.data.url,
    };

    const body = {
      brand: brand,
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
    bottomSheetRef.current?.close();

    // Hacer la petición al endpoint y mostrar el alert cuando termine
    try {
      const response = await fetch(
        `http://${LOCAL_IP}:3000/insert-catalog-brand`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const responseData = await response.json();

      if (responseData.error) {
        if (responseData.details.includes("[1] duplicados")) {
          Toast.show({
            type: "error",
            text1: `The item ${nameProduct} already exists in the catalog.`,
            visibilityTime: 6000,
          });

          // alert("The item already exists in the catalog.");
        } else if (responseData.details.includes("[1] mal formados")) {
          Toast.show({
            type: "error",
            text1: `The item ${nameProduct} is not valid.`,
            visibilityTime: 6000,
          });
        } else {
          Toast.show({
            type: "error",
            text1: `Error inserting item ${nameProduct}: ${responseData.details}`,
            visibilityTime: 6000,
          });
        }
        setIsSubmitting(false);
        return;
      }

      // Success - call the onSubmit callback
      onSubmit(result.data);
      Toast.show({
        type: "success",
        text1: `The item ${nameProduct} has been successfully added to the catalog.`,
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Toast.show({
        type: "error",
        text1: `Error submitting item ${nameProduct}: ${error}`,
        visibilityTime: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    Toast.show({
      type: "error",
      text1: `Error submitting item ${nameProduct}: ${error}`,
      visibilityTime: 6000,
    });
    setIsSubmitting(false);
  }
};

const CustomToast = ({ type, text1, text2, onHide }: any) => {
  if (type === "error") {
    console.log("error: ", text1);
  }
  const isSuccess = type === "success";
  return (
    <View
      className="flex-row items-center bg-white rounded-2xl py-4 px-[18px] mx-2 min-h-[70px] border-l-brown-light"
      style={{
        borderLeftWidth: 6,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          className={`${isSuccess ? "text-green-600" : "text-red-500"} font-semibold text-xl mb-0.5`}
        >
          {isSuccess ? "Success" : "Error"}
        </Text>
        {text1 ? (
          <Text className="text-black font-pregular text-lg">{text1}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={onHide} style={{ marginLeft: 10 }}>
        <Ionicons name="close" size={22} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

export const toastConfig = {
  success: (props: any) => (
    <CustomToast {...props} type="success" onHide={() => Toast.hide()} />
  ),
  error: (props: any) => (
    <CustomToast {...props} type="error" onHide={() => Toast.hide()} />
  ),
};
