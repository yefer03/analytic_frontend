import { useQuery } from 'react-query';
import api from '../lib/axios';

const getAllReports = async (id, token) => {
  try {
    const response = await api.get(`report/get/${id}`, {
      headers: {
        token: token,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const useReports = (id, token) => {
  const { data, error, isLoading, isFetching } = useQuery(
    ['reports', id],
    () => getAllReports(id, token),
    {
      staleTime: 60000,
      refetchInterval: 300000,
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
