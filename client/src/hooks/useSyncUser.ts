import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { api } from "../services/api";

export const useSyncUser = () => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    api.post("/users/sync", {
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      username: user.username || "",
      displayName: user.fullName || "",
      avatar: user.imageUrl,
    });
  }, [user]);
};