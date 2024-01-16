import { MdFolderShared } from 'react-icons/md'
import { BsNutFill } from 'react-icons/bs'
import { IoLogOut } from 'react-icons/io5'
import { FaWpforms } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { MdBusinessCenter } from 'react-icons/md'
import { useQueryClient } from 'react-query'
import { useHandleLogout } from '../hooks/useHandleLogout'

export const NavbarComponent = () => {
  const useQuery = useQueryClient()

  const customer = useQuery.getQueriesData(['customers'])
  const role = customer[0][1]?.role || 3
  const { handleLogout } = useHandleLogout()
  return (
    <nav className="bg-[#5438ce]  w-12 sm:w-16 lg:w-28 h-screen">
      <ul className="flex flex-col items-center justify-center h-full text-neutral-100 space-y-5">
        <li>
          <NavLink to="/">
            <MdFolderShared className="w-6 h-6 md:w-10 md:h-10 hover:text-white hover:scale-125 transition-all duration-300" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/form">
            <FaWpforms className="w-6 h-6 md:w-10 md:h-10 hover:text-white hover:scale-125 transition-all duration-300" />
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/services">
            <BsNutFill className="w-6 h-6 md:w-10 md:h-10 hover:text-white hover:scale-125 transition-all duration-300" />
          </NavLink>
        </li>{' '} */}
        {role === 1 || role === 2 ? (
          <li>
            <NavLink to="/register/agente">
              <MdBusinessCenter className="w-6 h-6 md:w-10 md:h-10 hover:text-white hover:scale-125 transition-all duration-300" />
            </NavLink>
          </li>
        ) : (
          ''
        )}
        <li>
          <NavLink to="/auth/login" onClick={(e) => handleLogout(e, useQuery)}>
            <IoLogOut className="w-6 h-6 md:w-10 md:h-10  hover:text-white hover:scale-125 transition-all. duration-300" />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
