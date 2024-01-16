import { useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'

export const useHandleLogout = () => {
  const navigate = useNavigate()
  const handleLogout = async (e, useQuery) => {
    e.preventDefault()
    const { isConfirmed } = await Swal.fire({
      title: 'Salir',
      text: 'Cancelar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (isConfirmed) {
      localStorage.removeItem('authToken')
      useQuery.clear()
      navigate('/auth/login')
    }
  }
  return {
    handleLogout
  }
}
