import axiosInstance from "./api";
import { toast } from "react-toastify";

// Function to delete image using `fileId`
const deleteImage = async (fileId) => {
  try {
    if (!fileId) {
      throw new Error("File ID is required to delete the image.");
    }

    const response = await axiosInstance.delete(`/blogs/delete-image/${fileId}`);

    if (response.data.success) {
      toast.success("Image deleted successfully");
      return true;
    } else {
      throw new Error(response.data.message || "Failed to delete image.");
    }
  } catch (error) {
    console.error("Image Deletion Error:", error.response?.data || error.message);
    toast.error("Failed to delete image.");
    return false;
  }
};

export default deleteImage;
