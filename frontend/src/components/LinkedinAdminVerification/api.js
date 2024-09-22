import { useAPI } from "@frontend-ui/components/GlobalProviders";

export const useAccountVerifyAPI = () => {
  const { get, post, error } = useAPI();
  // Fetch account verification data
  const getAccountVerificationData = async (is_verified) => {
    try {
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/auth/verify/${is_verified}`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching account verification data:", error);
      throw error;
    }
  };

  const verifyAccount = async (id) => {
    try {
      const response = await post(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/auth/verify/${id}`,
        {},
      );
      return response?.data;
    } catch (error) {
      console.error("Error verifying account:", error);
      throw error;
    }
  };

  return { getAccountVerificationData, verifyAccount, error };
};
