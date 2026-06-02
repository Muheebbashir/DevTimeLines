import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { api } from "../services/api";
import type { Timeline } from "../types/timeline";

export const useTimelines = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ["timelines", user?.id],

    queryFn: async () => {
      const res = await api.get(
        `/timeline/${user?.id}`
      );

      return res.data.timelines as Timeline[];
    },

    enabled: !!user,
  });
};