import { useAPI } from "@frontend-ui/components/GlobalProviders";

export const useAccountCreationAPI = () => {
  const { post, error } = useAPI();

  const createAccount = async (formData) => {
    try {
      const response = await post(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/auth/account-screen`, // need to change the api
        formData
      );
      return response?.data;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  };

  return { createAccount, error };
};
