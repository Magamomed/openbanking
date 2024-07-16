// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.20.10.2:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (user) => {
  try {
    console.log('Sending user data:', user);
    const response = await api.post('/register/', user);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.response) {
      console.error('Server responded with status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login/', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    if (error.response) {
      console.error('Server responded with status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

export const transferFunds = async (transferData) => {
	try {
	  const response = await api.post('/transfer/', transferData);
	  return response.data;
	} catch (error) {
	  console.error('Error transferring funds:', error);
	  if (error.response) {
		console.error('Server responded with status:', error.response.status);
		console.error('Response data:', error.response.data);
	  }
	  throw error;
	}
  };

  export const getUserData = async (userId) => {
	try {
	  const response = await api.get(`/users/${userId}/`);
	  return response.data;
	} catch (error) {
	  console.error('Error fetching user data:', error);
	  throw error;
	}
  };

