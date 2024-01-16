import { useState } from 'react'
import api from '../lib/axios'
import { alertSuccess } from '../helpers/alert'

export const useAbono = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const newAbono = async (data, id) => {
    const token = localStorage.getItem('authToken')
    try {
      setError(null)
      setLoading(true)
      const response = await api.put(`form/put/odontologia/${id}`, data, {
        headers: {
          token: token
        }
      })
      console.log(response)
      setData(response.data)
      if (response.status === 200) {
        alertSuccess('Cliente creado correctamente')
      }
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
    newAbono
  }
}
