import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { api } from "../services/api";
import { toast } from "sonner";

export const useCreateProject = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      status: string;
      progress: number;
    }) => {
      const res = await api.post("/projects", {
        clerkId: user?.id,
        ...data,
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      toast.success("Project created");
    },

    onError: () => {
      toast.error("Failed to create project");
    },
  });
};