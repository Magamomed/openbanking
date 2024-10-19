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

export const loginUser = async (phone_number, password) => {
  try {
    const response = await api.post('/login/', { phone_number, password });
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

  export const getTransactions = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/transactions/`);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Сервер ответил с ошибкой и передал ответ
        console.error('Error response:', error.response.data);  // Выводим данные ошибки
        console.error('Error status:', error.response.status);  // Выводим статус ответа
      } else if (error.request) {
        // Запрос был сделан, но ответа не было
        console.error('No response received:', error.request);
      } else {
        // Другая ошибка
        console.error('Error setting up request:', error.message);
      }
      throw error;
    }
  };

  export const getSavingsGoal = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/savings-goals/`)
      return response.data;
    } catch (error) { 
      console.error(error);
      throw error;
  }
}

  export const addToSavingsGoal = async (goalId, amount) => {
    try {
      const response = await axios.post(`/goals/${goalId}/add/`,{
        amount: amount
      });
      console.log('Успешно добавлено', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении средств к цели накопления:',error);
      throw error;
  }
  };

  export const createSavingsGoal = async (goalData) => {
    try {
      const response = await api.post('/savings-goals/create/', goalData);
      return response.data;
    } catch (error) {
      console.error('Error creating savings goal:', error);
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  };

  export const getAccounts = async (userId) => {
    try {
      console.log('Запрос аккаунтов для пользователя:', userId); // Логируем userId
      const response = await api.get(`/accounts/${userId}/get/`);
      console.log('Ответ от сервера:', response.data); // Логируем ответ сервера
      return response.data;
    } catch (error) {
      console.error('Ошибка в getAccounts:', error); // Логируем ошибку
      throw error; // Пробрасываем ошибку дальше
    }
  };
  

  
