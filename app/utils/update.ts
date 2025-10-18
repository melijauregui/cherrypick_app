import { useMutation, useQueryClient } from "@tanstack/react-query";
import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import BottomSheet from "@gorhom/bottom-sheet";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Keyboard } from "react-native";
import { authClient, useSession } from "@/lib/auth-client";
import { router } from "expo-router";
import { SuccessSchema } from "@/schemas/standar-response-schema";
import { ZodError } from "zod";
import {
  ItemSchema,
  ItemSchemaType,
  MinimumPropertiesItemSchema,
} from "@/schemas/catalog/catalog-schema";

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

export function useDelete() {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const mutation = useMutation({
    mutationFn: async (selected: Set<string>) => {
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
        queryKey: ["delete-catalog-items", user?.email],
      });

      Toast.show({
        type: "success",
        text1: `${data.numberDeleted} productos eliminados correctamente`,
      });
    },
    onError: error => {
      console.log("error", error.message);
      Toast.show({ type: "error", text1: error.message });
    },
    onSettled: () => {
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
        type: "success",
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

export function useResendCode() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      console.log("Sending verification email to", email);
      await authClient.sendVerificationEmail({
        email: email,
        fetchOptions: {
          onError: error => {
            throw new Error(error.error.message);
          },
        },
        callbackURL: "cherrypick:///code-verification-register",
      });
    },
    onSuccess: () => {
      console.log("SendCode onSuccess triggered");
      Toast.show({
        type: "success",
        text1: "Code sent successfully",
        visibilityTime: 3000,
      });
    },
    onError: error => {
      console.error("Error resending code:", error);
      Toast.show({
        type: "error",
        text1: "Failed to resend code",
        visibilityTime: 3000,
      });
    },
    onSettled: () => {
      console.log("SendCode onSettled triggered");
      //invalidate query
      void queryClient.invalidateQueries({
        queryKey: ["expiration-code"],
      });
    },
  });

  return mutation;
}

export function useResendCodeResetPassword() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      console.log("Sending verification email to", email);
      await authClient.requestPasswordReset({
        email: email,
        redirectTo: "cherrypick:///reset-password",
        fetchOptions: {
          onError: error => {
            console.error(error);
            Toast.show({
              type: "error",
              text1: "Failed to send reset password email",
            });
          },
          onSuccess: () => {
            console.log("Reset password email sent");
            Toast.show({
              type: "success",
              text1: "Reset password email sent!",
            });
          },
        },
      });
    },

    onSettled: () => {
      console.log("SendCode onSettled triggered");
      //invalidate query
      void queryClient.invalidateQueries({
        queryKey: ["reset-password-code"],
      });
    },
  });

  return mutation;
}
