import api from '../lib/axios'
import { useQuery } from 'react-query'

const getGeneros = async () => {
  const token = localStorage.getItem('authToken')
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api.get(`form/genders`, {
      headers: {
        token: token
      }
    })
    return response.data
  } catch (error) {
    throw error.response.data.error
  }
}

export const useGeneros = () => {
  const { data, error, isLoading, isFetching } = useQuery(
    'genders',
    () => getGeneros(),
    {
      staleTime: 60000 * 10,
      refetchInterval: 60000 * 15,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  )

  return {
    data,
    error,
    isLoading,
    isFetching
  }
}
