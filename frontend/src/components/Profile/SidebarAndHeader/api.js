import { useAPI } from "@frontend-ui/components/GlobalProviders";

export const useOwnProfileAPI = () => {
  const { get, error } = useAPI();

  // fetch the current logged-in user's profile after login
  const getOwnProfileData = async () => {
    try {
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/auth/current-user`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching profile by email:", error);
      throw error;
    }
  };

  return { getOwnProfileData, error };
};
