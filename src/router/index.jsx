import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { LayoutHome } from '../layout/LayoutHome'
import { HomePage } from '../pages/home/HomePage'
import { FormPage } from '../pages/form/FormPage'
import { FormServices } from '../pages/form/empresa1/FormServices'
import { PublicRoute } from './PublicRoute'
import { ProtectedRoute } from './ProtectedRoute'
import { Dashbards } from '../pages/dashboards/Dashbards'
import { ServicesReport } from '../pages/dashboards/odontologia/ServicesReport'
import { ClientesReport } from '../pages/dashboards/odontologia/ClientesReport'
import { CitasReport } from '../pages/dashboards/odontologia/CitasReport'
import { InsumosReport } from '../pages/dashboards/odontologia/InsumosReport'
import { RegisterCllient } from '../pages/form/odontologia/RegisterCllient'
import { CitasClient } from '../pages/form/odontologia/CitasClient'
import { VenderServicio } from '../pages/form/odontologia/VenderServicio'
import { AbonoClient } from '../pages/form/odontologia/AbonoClient'
import { NuevoInsumo } from '../pages/form/odontologia/NuevoInsumo'
import { UpdateInsumo } from '../pages/form/odontologia/UpdateInsumo'

export const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <PublicRoute element={<LoginPage />} />
  },

  {
    path: 'register',
    element: <ProtectedRoute element={<LayoutHome />} />,
    children: [
      {
        path: 'agente',
        element: <RegisterPage />
      }
    ]
  },

  {
    // path: '/',
    element: <ProtectedRoute element={<LayoutHome />} />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  },

  {
    path: 'analitica/:id',
    element: <ProtectedRoute element={<LayoutHome />} />,
    children: [
      {
        index: true,
        element: <Dashbards />
      },
      {
        path: 'odontologia/cantidaddeserviciosvendidos/:id',
        element: <ServicesReport />
      },
      {
        path: 'odontologia/clientesporservicio/:id',
        element: <ClientesReport />
      },
      {
        path: 'odontologia/citasasignadas/:id',
        element: <CitasReport />
      },
      {
        path: 'odontologia/insumos/:id',
        element: <InsumosReport />
      }
    ]
  },

  {
    path: 'form',
    element: <ProtectedRoute element={<LayoutHome />} />,
    children: [
      {
        index: true,
        element: <FormPage />
      },
      {
        path: ':id',
        element: <FormServices />
      },
      {
        path: ':id/odontologia/Formularioregistrarcliente/:id',
        element: <RegisterCllient />
      },
      {
        path: ':id/odontologia/Formularioagendarcita/:id',
        element: <CitasClient />
      },
      {
        path: ':id/odontologia/Formulariovenderservicio/:id',
        element: <VenderServicio />
      },
      {
        path: ':id/odontologia/Formulariorealizarabono/:id',
        element: <AbonoClient />
      },
      {
        path: ':id/odontologia/Formularionuevoinsumo/:id',
        element: <NuevoInsumo />
      },
      {
        path: ':id/odontologia/Formularioactualizarinsumo/:id',
        element: <UpdateInsumo />
      }
    ]
  }
])
