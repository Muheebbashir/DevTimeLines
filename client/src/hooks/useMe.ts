import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "@clerk/clerk-react";
import type { User } from "../types/user";

export const useMe = () => {
  const { user } = useUser();
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;

      try {
        const res = await api.get(
          `/users/me?clerkId=${user.id}`
        );

        setData(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  return { data, loading };
};