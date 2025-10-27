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
      return res;
    },

    onMutate: async ({ itemUuid }) => {
      // Cancelar cualquier query en progreso para evitar conflictos
      await queryClient.cancelQueries({
        queryKey: ["is-liked", itemUuid],
      });

      // Obtener el valor actual del cache
      const previousLikeStatus = queryClient.getQueryData([
        "is-liked",
        itemUuid,
      ]);

      // Actualizar optimísticamente el cache
      queryClient.setQueryData(["is-liked", itemUuid], (old: boolean) => !old);

      // Retornar el valor anterior para poder revertir si hay error
      return { previousLikeStatus };
    },

    onError: (error, variables, context) => {
      // Revertir el cambio optimístico si hay error
      if (context?.previousLikeStatus !== undefined) {
        queryClient.setQueryData(
          ["is-liked", variables.itemUuid],
          context.previousLikeStatus
        );
      }

      console.error("Error toggling like:", error);
      Toast.show({
        type: "error",
        text1: "No se pudo procesar el like",
        visibilityTime: 3000,
      });
    },

    onSettled: (data, variables) => {
      // Invalidar queries para sincronizar con el servidor
      if (variables && "itemUuid" in variables) {
        queryClient.invalidateQueries({
          queryKey: ["is-liked", variables.itemUuid],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["all-liked-items", user?.email],
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
      return res;
    },

    onMutate: async ({ itemUuid }) => {
      // Cancelar cualquier query en progreso para evitar conflictos
      await queryClient.cancelQueries({
        queryKey: ["is-favorited", itemUuid],
      });

      // Obtener el valor actual del cache
      const previousFavoriteStatus = queryClient.getQueryData([
        "is-favorited",
        itemUuid,
      ]);

      // Actualizar optimísticamente el cache
      queryClient.setQueryData(
        ["is-favorited", itemUuid],
        (old: boolean) => !old
      );

      // Retornar el valor anterior para poder revertir si hay error
      return { previousFavoriteStatus };
    },

    onError: (error, variables, context) => {
      // Revertir el cambio optimístico si hay error
      if (context?.previousFavoriteStatus !== undefined) {
        queryClient.setQueryData(
          ["is-favorited", variables.itemUuid],
          context.previousFavoriteStatus
        );
      }

      console.error("Error toggling favorite:", error);
      Toast.show({
        type: "error",
        text1: "No se pudo procesar el favorito",
        visibilityTime: 3000,
      });
    },

    onSettled: (data, variables) => {
      // Invalidar queries para sincronizar con el servidor
      if (variables && "itemUuid" in variables) {
        queryClient.invalidateQueries({
          queryKey: ["is-favorited", variables.itemUuid],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["all-favorited-items", user?.email],
      });
    },
  });
};
