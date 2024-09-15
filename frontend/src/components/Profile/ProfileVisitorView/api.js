// fetch profile data
export const getProfileData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/userprofile`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

export const getProfileByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/userprofile/primaryemail${email}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile by email:", error);
    throw error;
  }
};
