import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { api } from "../services/api";

export const useSyncUser = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      try {
        const response = await api.post("/users/sync", {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username || "",
          displayName: user.fullName || user.firstName || "",
          avatar: user.imageUrl,
        });

        console.log("User Synced:", response.data);
      } catch (error) {
        console.error("Sync Error:", error);
      }
    };

    if (isLoaded && user) {
      syncUser();
    }
  }, [isLoaded, user]);
};
