import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import { useQuery } from 'react-query';

const authLogin = async (data) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api.post('/auth/login', data);
    localStorage.setItem('authToken', response.data.token);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const useLogin = (data) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const {
    isLoading: loading,
    error,
    isIdle,
    refetch,
  } = useQuery('auth', () => authLogin(data), {
    enabled: token ? true : false,
    staleTime: Infinity,
    cacheTime: Infinity, // Mantener la data en caché indefinidamente
    onSuccess: () => {
      // Esta función se ejecutará cuando la solicitud sea exitosa
      navigate('/');
    },
  });

  return {
    loading,
    error,
    isIdle,
    refetch,
  };
};
