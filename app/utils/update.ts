import { useMutation, useQueryClient } from "@tanstack/react-query";
import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import BottomSheet from "@gorhom/bottom-sheet";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Keyboard } from "react-native";
import { authClient, useSession } from "@/lib/auth-client";
import { router } from "expo-router";
import { SuccessSchema } from "@/schemas/standar-response-schema";

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
      setSelected(new Set());
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
