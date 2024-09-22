import { useAPI } from "@frontend-ui/components/GlobalProviders";

export const useAccountVerifyAPI = () => {
  const { get, error } = useAPI();

  // Fetch account verification data
  const getAccountVerificationData = async () => {
    try {
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/account/verification`, // need to update
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching account verification data:", error);
      throw error;
    }
  };

  return { getAccountVerificationData, error };
};
