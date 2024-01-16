import api from '../lib/axios';
import { useQuery } from 'react-query';

const getAllForms = async (id, token) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api.get(`form/get/${id}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.error;
  }
};

export const useForms = (id, token) => {
  const { data, error, isLoading, isFetching } = useQuery(
    ['forms', id],
    () => getAllForms(id, token),
    {
      staleTime: 60000,
      refetchInterval: 60000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  return {
    data,
    error,
    isLoading,
    isFetching,
  };
};
