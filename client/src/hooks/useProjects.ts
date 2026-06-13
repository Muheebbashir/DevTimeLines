import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { api } from "../services/api";
import type { Project } from "../types/project";

export const useProjects = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ["projects", user?.id],

    queryFn: async () => {
      const res = await api.get(`/projects/${user?.id}`);
      return res.data.projects as Project[];
    },

    enabled: !!user,
  });
};