import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { toast } from "sonner";
import type { Timeline } from "../types/timeline";

export const useUpdateTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Timeline>;
    }) => {
      const res = await api.put(
        `/timeline/${id}`,
        data
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timelines"],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      toast.success("Timeline updated");
    },

    onError: () => {
      toast.error("Failed to update timeline");
    },
  });
};