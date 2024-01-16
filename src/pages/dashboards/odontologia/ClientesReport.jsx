import React from 'react'
import { UseGetDate } from '../../../hooks/UseGetDate'
import { useReport } from '../../../hooks/useReport'
import { useParams } from 'react-router-dom'
import TabletClientsComponent from '../../../components/analitica/TabletClientsComponent'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { DatePickerComponent } from '../../../components/DatePickerComponent'

const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
    footer: 'ID'
  },
  {
    header: 'Cedula',
    accessorKey: 'cedula',
    footer: 'Cedula'
  },
  {
    header: 'Nombre',
    accessorKey: 'nombre',
    footer: 'Nombre'
  },
  {
    header: 'Apellido',
    accessorKey: 'apellido',
    footer: 'Apellido'
  },
  {
    header: 'Correo Electrónico',
    accessorKey: 'correo_electronico',
    footer: 'Correo Electrónico'
  },
  {
    header: 'Fecha de Nacimiento',
    accessorKey: 'fecha_nacimiento',
    footer: 'Fecha de Nacimiento'
  },
  {
    header: 'Teléfono',
    accessorKey: 'telefono',
    footer: 'Teléfono'
  },
  {
    header: 'Nombre del Servicio',
    accessorKey: 'nombre_servicio',
    footer: 'Nombre del Servicio'
  },
  {
    header: 'Cantidad de Citas',
    accessorKey: 'cantidad_citas',
    focus: 'Cantidad de Citas'
  },
  {
    header: 'Precio del Servicio',
    accessorKey: 'precio_servicio',
    footer: 'Precio del Servicio'
  },
  {
    header: 'Fecha de Adquisición',
    accessorKey: 'fecha_adquisicion',
    footer: 'Fecha de Adquisición'
  },
  {
    header: 'Monto Cancelado',
    accessorKey: 'monto_cancelado',
    footer: 'Monto Cancelado'
  },

  {
    header: 'Fecha de Pago',
    accessorKey: 'fecha_pago',
    footer: 'Fecha de Pago'
  },
  {
    header: 'Cancelado',
    accessorKey: 'cancelado',
    footer: 'Cancelado'
  }
]

export const ClientesReport = () => {
  const { id: idReport } = useParams()
  console.log(idReport)
  const {
    dateRange,
    formattedDates,
    handleDateChange,
    setFormattedDates,
    setDateRange
  } = UseGetDate()

  const { data, isLoading, isFetching, refetch } = useReport(
    idReport,
    formattedDates
  )

  console.log(data)
  const handleSubmit = (e) => {
    e.preventDefault()
    refetch()
  }

  const reset = (e) => {
    e.preventDefault()

    setDateRange({
      startDate: null,
      endDate: null
    })

    setFormattedDates({
      startDate: null,
      endDate: null
    })

    refetch()
  }

  return (
    <div>
      {isLoading || isFetching ? (
        <LoadingComponent />
      ) : (
        <section className="flex justify-center items-center w-full h-full">
          <div className="w-full md:w-5/6 xs:w-1/2">
            <div className=" flex justify-center  mb-2">
              <div className="flex flex-col  lg:flex-row items-center justify-center overflow-hidden mt-5">
                <DatePickerComponent
                  dateRange={dateRange}
                  handleDateChange={handleDateChange}
                />
                <div className="mt-5 lg:mt-0">
                  <button
                    className="bg-[#5438CE] px-4 py-2 ml-5 rounded-md text-neutral-100 hover:bg-[#362099] transition-colors duration-300"
                    onClick={handleSubmit}
                  >
                    Aplicar
                  </button>
                  <button
                    className="bg-[#ce3838] px-4 py-2 ml-5 rounded-md text-neutral-100 hover:bg-[#ce38388c] transition-colors duration-300"
                    onClick={reset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <TabletClientsComponent data={data.report} columns={columns} />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
