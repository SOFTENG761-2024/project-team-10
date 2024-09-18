import { useAPI } from "@frontend-ui/components/GlobalProviders";

export const useProfileAPI = () => {
  const { get, error } = useAPI();

  // Fetch profile data
  const getProfileData = async () => {
    try {
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/userprofile`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      throw error;
    }
  };

  // fetch profile by id
  const getProfileByid = async (id) => {
    try {
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/userprofile/${id}`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching profile by email:", error);
      throw error;
    }
  };

  // Fetch profile by email
  const getProfileByEmail = async (email) => {
    try {
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/userprofile/primaryemail/${email}`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching profile by email:", error);
      throw error;
    }
  };

  return { getProfileData, getProfileByEmail, getProfileByid, error };
};
