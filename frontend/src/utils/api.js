import axios from 'axios';

const fetchProfile = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Profile data:', response.data);
    // Handle the profile data
  } catch (error) {
    console.error('Error fetching profile:', error);
    // Handle error
  }
};
