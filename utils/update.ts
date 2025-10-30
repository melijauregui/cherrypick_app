import { useMutation, useQueryClient } from "@tanstack/react-query";
import safeFetch from "./safe-fetch";
import { BASE_URL } from "@/config/api";
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
        url: `${BASE_URL}/client`,
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

export function useDeleteItem(itemUuid: string) {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const brandEmail = user?.email;
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await safeFetch({
        url: `${BASE_URL}/brand/delete-items`,
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
        url: `${BASE_URL}/user`,
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
      console.log("Cuenta eliminada correctamente");
      await logout();
    },
    onError: error => {
      // TODO PUSH TOAST
      console.log(`No se pudo eliminar el usuario:`, error);
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
        text1: "Código enviado correctamente",
        visibilityTime: 3000,
      });
    },
    onError: error => {
      console.error("Error al reenviar el código:", error);
      Toast.show({
        type: "error",
        text1: "No se pudo reenviar el código",
        visibilityTime: 3000,
      });
    },
    onSettled: () => {
      console.log("SendCode onSettled activado");
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
      console.log("Enviando email de restablecimiento de contraseña a", email);
      await authClient.requestPasswordReset({
        email: email,
        redirectTo: "cherrypick:///reset-password",
        fetchOptions: {
          onError: error => {
            console.error(error);
            Toast.show({
              type: "error",
              text1:
                "No se pudo enviar el email de restablecimiento de contraseña",
            });
          },
          onSuccess: () => {
            console.log("Email de restablecimiento de contraseña enviado");
            Toast.show({
              type: "success",
              text1: "Email de restablecimiento de contraseña enviado!",
            });
          },
        },
      });
    },

    onSettled: () => {
      console.log("SendCode onSettled activado");
      //invalidate query
      void queryClient.invalidateQueries({
        queryKey: ["reset-password-code"],
      });
    },
  });

  return mutation;
}
