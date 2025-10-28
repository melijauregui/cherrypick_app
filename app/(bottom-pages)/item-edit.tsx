import ErrorPage from "../(auth)/error";
import LoadingPage from "../components/LoadingPage";
import { router, useLocalSearchParams } from "expo-router";
import { getItem } from "../../utils/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ItemSchemaType,
  MinimumPropertiesItemSchema,
} from "@/schemas/catalog/catalog-schema";
import StandardPageBottomSheet, {
  StandardDescription,
} from "../components/standar-page/standarPage";
import { useState } from "react";
import { Keyboard } from "react-native";
import safeFetch from "../../utils/safe-fetch";
import { BASE_URL } from "@/config/api";
import Toast from "react-native-toast-message";
import {
  InsertItemImageIdSchema,
  InsertItemSchema,
  ItemsBottomSheetDetails,
  usePostItemImage,
} from "./item-insert";

type UpdateItemSchema = Omit<ItemSchemaType, "price" | "brandId"> & {
  price: string;
};

export default function EditItemPage() {
  const params = useLocalSearchParams();
  const itemUuid = decodeURIComponent(params.uuid as string);
  const brandEmail = decodeURIComponent(params.email as string);
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

  return <EditItem item={item} brandEmail={brandEmail} />;
}

export type FormErrors = Partial<Record<keyof UpdateItemSchema, string>>;

function EditItem({
  item,
  brandEmail,
}: {
  item: UpdateItemSchema;
  brandEmail: string;
}) {
  const [formData, setFormData] = useState<InsertItemSchema>({
    ...item,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useUpdateItem(item, brandEmail);

  const onSave = async (data: UpdateItemSchema) => {
    const result = MinimumPropertiesItemSchema.safeParse({
      ...data,
    });
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(error => {
        const field = error.path[0] as keyof UpdateItemSchema;
        newErrors[field] = error.message;
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      setIsSubmitting(true);
      await mutation.mutateAsync({
        formData: { ...formData, uuid: item.uuid },
      });
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
      formData.price &&
      (formData.name !== item.name ||
        formData.description !== item.description ||
        formData.price !== item.price ||
        formData.url !== item.url ||
        formData.image.url !== item.image.url)
  );

  return (
    <StandardPageBottomSheet
      disableSave={!isFormValid}
      onSave={() => onSave({ ...formData, uuid: item.uuid })}
      onCancel={() => {
        Keyboard.dismiss();
        router.back();
      }}
      onLoading={isSubmitting}
      section="Editar item"
    >
      <StandardDescription description="Edita la descripción del item para maximizar las ventas. En lo posible, una foto de alta calidad que muestre únicamente el producto en un fondo limpio. Esto mejorará significativamente la visibilidad y precisión de búsqueda de tu item." />
      <ItemsBottomSheetDetails
        setFormData={setFormData}
        setErrors={setErrors}
        errors={errors}
        formData={formData}
      />
    </StandardPageBottomSheet>
  );
}

function useUpdateItem(itemLastValue: UpdateItemSchema, brandEmail: string) {
  const queryClient = useQueryClient();
  const postImageMutation = usePostItemImage();
  const mutation = useMutation({
    mutationFn: async (data: { formData: UpdateItemSchema }) => {
      const formData = data.formData;

      // Only include fields that have changed compared to formDataLastValue
      const itemUpdated: Partial<InsertItemImageIdSchema> = {};

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
          fileName: formData.name,
        });
        itemUpdated.imageId = imageId;
      }
      if (formData.url !== itemLastValue.url) {
        itemUpdated.url = formData.url;
      }

      const response = await safeFetch({
        url: `${BASE_URL}/item/${itemLastValue.uuid}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemUpdated),
      });
      if (response.data.error) {
        console.log("response.data.error WHY HERE", response.data.error);
        throw new Error(response.data.details);
      }
    },
    onSuccess: (data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["item-detail", itemLastValue.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["item-embedding", itemLastValue.uuid],
        exact: true,
      });

      void queryClient.invalidateQueries({
        queryKey: ["similar-items", itemLastValue.uuid],
        exact: false,
      });

      void queryClient.invalidateQueries({
        queryKey: ["self-brand-items", brandEmail],
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
      }
    },
    onSettled: () => {
      Keyboard.dismiss();
    },
  });

  return mutation;
}
