import { useMutation, useQueryClient } from "@tanstack/react-query";
import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import BottomSheet from "@gorhom/bottom-sheet";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Keyboard } from "react-native";
import { authClient, useSession } from "@/lib/auth-client";
import { router } from "expo-router";
import { SuccessSchema } from "@/schemas/standar-response-schema";
import { ItemSchema, ItemSchemaId } from "@/schemas/catalog/catalog-schema";
import { ZodError } from "zod";

export default function useUpdateBrand(brandEmail: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (brand: { description: string; url: string }) => {
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/brand`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: brand.description,
          url: brand.url,
        }),
      });
      if (data.error) {
        throw new Error(data.details);
      }
      SuccessSchema.parse(data);
    },
    onSuccess: () => {},
    onError: error => {
      // TODO PUSH TOAST
      console.log(`could not update user:`, error);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: ["self-brand-profile", brandEmail],
      });
    },
  });

  return mutation;
}

export function useUpdateClient(email: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (user: {
      username: string;
      dateOfBirth: Date | null;
      preferences: string[];
    }) => {
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/client`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.username,
          dateOfBirth: user.dateOfBirth,
          preferences: user.preferences,
        }),
      });
      if (data.error) {
        throw new Error(data.details + "\n" + data.info);
      }
      SuccessSchema.parse(data);
    },
    onSuccess: () => {},
    onError: error => {
      // TODO PUSH TOAST
      console.log(`could not update user:`, error);
    },
    onSettled: () => {
      console.log("onSettled");
      void queryClient.invalidateQueries({
        queryKey: ["self-client-profile", email],
      });
    },
  });
  return mutation;
}

export function useDelete(
  setSelected: (selected: Map<string, string>) => void,
  onDelete: () => void,
  bottomSheetRef: React.RefObject<BottomSheet>,
  brandEmail: string,
  setDeleting: (deleting: boolean) => void
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (selected: Set<string>) => {
      setDeleting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      bottomSheetRef.current?.close();
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/delete-items`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: Array.from(selected).map(uuid => ({ id: uuid })),
        }),
      });
      if (data.error) {
        throw new Error(data.details + "\n" + data.info);
      }
      return data;
    },
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: ["delete-catalog-items", brandEmail],
      });

      Toast.show({
        type: "success",
        text1: `${data.numberDeleted} productos eliminados correctamente`,
      });
      setSelected(new Map());
      onDelete();
    },
    onError: error => {
      console.log("error", error.message);
      Toast.show({ type: "error", text1: error.message });
    },
    onSettled: () => {
      setDeleting(false);
      Keyboard.dismiss();
    },
  });

  return mutation;
}

export function useDeleteItem(itemUuid: string) {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const brandEmail = user?.email;
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/delete-items`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: itemUuid }],
        }),
      });
      if (response.data.error) {
        throw new Error(response.data.details);
      }
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["delete-catalog-items", brandEmail],
      });

      Toast.show({
        type: "normal",
        text1: `Producto eliminado correctamente`,
      });
      router.back();
    },
    onError: error => {
      console.log(`could not delete item:`, error);
      Toast.show({ type: "error", text1: error.message });
    },
  });

  return mutation;
}

export function useDeleteAccount(logout: () => Promise<void>) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/user`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.error) {
        throw new Error(data.details);
      }
      SuccessSchema.parse(data);
    },
    onSuccess: async () => {
      await authClient.deleteUser();
      console.log("Account deleted successfully");
      await logout();
    },
    onError: error => {
      // TODO PUSH TOAST
      console.log(`could not delete user:`, error);
    },
  });

  return mutation;
}

export type FormErrors = {
  name?: string;
  description?: string;
  price?: string;
  url?: string;
  imageUrl?: string;
};

export type FormDataItem = {
  name: string;
  description: string;
  price: string;
  url: string;
  imageUrl: string;
};

export function useUpdateItem(
  setFormData: React.Dispatch<React.SetStateAction<FormDataItem>>,
  setIsSubmitting: (isSubmitting: boolean) => void,
  setErrors: (errors: FormErrors) => void,
  onSubmit: (data: FormDataItem) => void,
  bottomSheetRef: React.RefObject<BottomSheet>,
  formDataLastValue: FormDataItem,
  itemUuid: string
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { formData: FormDataItem }) => {
      const result = ItemSchemaId.safeParse({
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
      const itemUpdated: Partial<FormDataItem> = {};

      if (result.data.name !== formDataLastValue.name) {
        itemUpdated.name = result.data.name;
      }
      if (result.data.description !== formDataLastValue.description) {
        itemUpdated.description = result.data.description;
      }
      if (result.data.price !== formDataLastValue.price) {
        itemUpdated.price = result.data.price;
      }
      if (result.data.imageUrl !== formDataLastValue.imageUrl) {
        itemUpdated.imageUrl = result.data.imageUrl;
      }
      if (result.data.url !== formDataLastValue.url) {
        itemUpdated.url = result.data.url;
      }

      setFormData({
        ...formDataLastValue,
        ...itemUpdated,
      });

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
          const field = error.path[0] as keyof FormDataItem;
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
