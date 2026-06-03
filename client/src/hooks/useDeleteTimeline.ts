import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { toast } from "sonner";

export const useDeleteTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/timeline/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timelines"],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      toast.success("Timeline deleted");
    },

    onError: () => {
      toast.error("Failed to delete timeline");
    },
  });
};