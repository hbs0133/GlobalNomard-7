import axiosInstance from './axios';

const postImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axiosInstance.post('/activities/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
};

export { postImage };
