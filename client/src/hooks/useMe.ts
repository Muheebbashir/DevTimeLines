import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { api } from "../services/api";
import type { User } from "../types/user";

export const useMe = () => {
  const { user } = useUser();

  const { data, isLoading: loading } = useQuery({
    queryKey: ["me", user?.id],
    queryFn: async () => {
      const res = await api.get(`/users/me?clerkId=${user?.id}`);
      return res.data.user as User;
    },
    enabled: !!user,
  });

  return { data: data ?? null, loading };
};