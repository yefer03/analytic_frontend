import { useQuery } from 'react-query';
import api from '../lib/axios';

const getRoles = async () => {
  const token = localStorage.getItem('authToken');
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api.get(`/home/get/roles`, {
      headers: {
        token: token,
      },
    });
    return response.data;
    console.log(response);
  } catch (error) {
    console.log(error);
    throw error.response.data.error;
  }
};

export const useRoles = (token) => {
  const { data, error, isLoading, isFetching } = useQuery(
    'roles',
    () => getRoles(),
    {
      staleTime: 60000,
      refetchInterval: 300000,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  );

  return {
    data,
    error,
    isLoading,
    isFetching,
  };
};
