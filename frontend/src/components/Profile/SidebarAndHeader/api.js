import { useCallback } from "react";
import { useAPI } from "@frontend-ui/components/GlobalProviders";

export const useOwnProfileAPI = () => {
  const { get, error } = useAPI();

  const getOwnProfileData = useCallback(async () => {
    try {
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/auth/current-user`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }, [get]);

  return { getOwnProfileData, error };
};
