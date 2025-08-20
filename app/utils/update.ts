import { useMutation, useQueryClient } from "@tanstack/react-query";
import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { UpdateBrandSchema } from "@/schemas/auth/brand-schema";
import { CreateAccountSchemaRes } from "@/schemas/auth/preferences-schema";
import BottomSheet from "@gorhom/bottom-sheet";
import { CatalogResponseSchemaDelete } from "@/schemas/catalog/catalog-schema";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Keyboard } from "react-native";
import { useSession } from "@/lib/auth-client";
import { router } from "expo-router";

export default function useUpdateBrand(brandEmail: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { description: string; url: string }) => {
      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/update-brand`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: data.description,
          url: data.url,
        }),
        schema: CreateAccountSchemaRes,
      });
      if (response.data.error) {
        throw new Error(response.data.details);
      }
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["self-brand-profile", brandEmail],
      });
    },
    onError: error => {
      // TODO PUSH TOAST
      console.log(`could not update user:`, error);
    },
  });

  return mutation;
}

export function useUpdateClient(email: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: {
      username: string;
      dateOfBirth: Date | null;
      preferences: string[];
    }) => {
      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/update-client`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.username,
          dateString: data.dateOfBirth?.toISOString() ?? null,
          preferences: data.preferences,
        }),
        schema: CreateAccountSchemaRes,
      });
      if (response.data.error) {
        throw new Error(response.data.details);
      }
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["self-client-profile", email],
      });
    },
    onError: error => {
      // TODO PUSH TOAST
      console.log(`could not update user:`, error);
    },
  });

  return mutation;
}

export function useDelete(
  setSelected: (selected: Set<string>) => void,
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
        url: `http://${LOCAL_IP}:3000/delete-catalog-brand`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: Array.from(selected).map(name => ({ name })),
        }),
        schema: CatalogResponseSchemaDelete,
      });
      if (data.error) {
        throw new Error(data.details);
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
      setSelected(new Set());
      onDelete();
    },
    onError: error => {
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
        url: `http://${LOCAL_IP}:3000/delete-catalog-brand`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ name: itemUuid }],
        }),
        schema: CatalogResponseSchemaDelete,
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
