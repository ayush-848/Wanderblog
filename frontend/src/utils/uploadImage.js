import axiosInstance from "./api";

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axiosInstance.post('/blogs/image-upload',
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Image uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error.response?.data || error.message);
        throw error;
    }
};

export default uploadImage
