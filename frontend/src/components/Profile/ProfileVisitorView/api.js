import axios from "axios";

// fetch profile data
export const getProfileData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/userprofile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

// send contact message
export const sendContactMessage = async (messageData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/contact", // Update the endpoint here
      messageData,
    );
    return response.data;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};

export const getProfileByEmail = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/userprofile/primaryemail${email}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile by email:", error);
    throw error;
  }
};
