import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  toggleLike,
  toggleFavorite,
  checkIfLiked,
  checkIfFavorited,
} from "./fetch";
import { useSession } from "@/lib/auth-client";
import Toast from "react-native-toast-message";

// Hook para verificar si un item está liked
export default function useIsLiked(itemUuid: string) {
  const { user } = useSession();

  return useQuery({
    queryKey: ["is-liked", itemUuid],
    queryFn: async () => {
      const res = await checkIfLiked(user?.email || "", itemUuid);
      if (res === null || res === undefined) {
        throw new Error("No se pudo verificar si el item está liked");
      }
      return res;
    },
    enabled: !!user?.email && !!itemUuid,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para verificar si un item está favorited
export const useIsFavorited = (itemUuid: string) => {
  const { user } = useSession();

  return useQuery({
    queryKey: ["is-favorited", itemUuid],
    queryFn: async () => {
      const res = await checkIfFavorited(user?.email || "", itemUuid);
      if (res === null || res === undefined) {
        throw new Error("No se pudo verificar si el item está favorited");
      }
      return res;
    },
    enabled: !!user?.email && !!itemUuid,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para toggle like
export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const { user } = useSession();

  return useMutation({
    mutationFn: async ({ itemUuid }: { itemUuid: string }) => {
      if (!user?.email) {
        return null;
      }
      const res = await toggleLike(user.email, itemUuid);
      if (!res) {
        throw new Error("No se pudo procesar el like");
      }
      if (res.error) {
        throw new Error(res.details);
      }
      return res;
    },

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["is-liked", variables.itemUuid],
      });
    },
    onError: error => {
      console.error("Error toggling like:", error);
      Toast.show({
        type: "error",
        text1: "No se pudo procesar el like",
        visibilityTime: 3000,
      });
    },
  });
};

// Hook para toggle favorite
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useSession();

  return useMutation({
    mutationFn: async ({ itemUuid }: { itemUuid: string }) => {
      if (!user?.email) {
        return null;
      }
      const res = await toggleFavorite(user.email, itemUuid);
      if (!res) {
        throw new Error("No se pudo procesar el favorito");
      }
      if (res.error) {
        throw new Error(res.details);
      }
      return res;
    },
    onSuccess: (data, variables) => {
      // Actualizar el estado del favorite
      queryClient.invalidateQueries({
        queryKey: ["is-favorited", variables.itemUuid],
      });
    },
    onError: error => {
      console.error("Error toggling favorite:", error);
      Toast.show({
        type: "error",
        text1: "No se pudo procesar el favorito",
        visibilityTime: 3000,
      });
    },
  });
};
