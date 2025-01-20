import axiosInstance from '../utils/api'

const uploadImage= async(imageFile) => {
    const formData= new FormData();
    //append imagge file to form data
    formData.append('image', imageFile);

    try{
        const response= await axiosInstance.post('/image-upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', //set header for file upload
            },
        });

        return response.data;

    } catch(error) {
        console.error('Error uploading the image:', error);
        throw error;    //rethrow error for handling
    }
};

export default uploadImage