import { useState } from 'react'
import api from '../lib/axios'

export const useGetDeudasOdonotologia = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const getDeudasOdontologia = async (id) => {
    const token = localStorage.getItem('authToken')
    try {
      setError(null)
      setLoading(true)
      const response = await api.get(
        `http://localhost:8080/form/deudas/${id}`,
        {
          headers: {
            token: token
          }
        }
      )
      console.log(response)
      setData(response.data)
    } catch (error) {
      setError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    data,
    getDeudasOdontologia
  }
}
