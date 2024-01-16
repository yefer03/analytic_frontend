import { useParams } from 'react-router-dom'
import { UseGetDate } from '../../../hooks/UseGetDate'
import { useReport } from '../../../hooks/useReport'
import { LoadingComponent } from '../../../components/LoadingComponent'
import TabletClientsComponent from '../../../components/analitica/TabletClientsComponent'
import { DatePickerComponent } from '../../../components/DatePickerComponent'

const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
    footer: 'ID'
  },
  {
    header: 'Fecha de Compra',
    accessorKey: 'fecha_compra',
    footer: 'Fecha de Compra'
  },
  {
    header: 'Nombre del Insumo',
    accessorKey: 'nombre_insumo',
    footer: 'Nombre del Insumo'
  },
  {
    header: 'Descripcion del Insumo',
    accessorKey: 'descripcion_insumo',
    footer: 'Descripcion del Insumo'
  },
  {
    header: 'Precio Unitario',
    accessorKey: 'precio_unitario',
    footer: 'Precio Unitario'
  },
  {
    header: 'Stock Disponible',
    accessorKey: 'stock_disponible',
    footer: 'Stock Disponible'
  },
  {
    header: 'Total Valor',
    accessorKey: 'total_valor',
    footer: 'Total Valor'
  }
]

export const InsumosReport = () => {
  const { id: idReport } = useParams()

  const {
    dateRange,
    formattedDates,
    handleDateChange,
    setFormattedDates,
    setDateRange
  } = UseGetDate()

  const { data, error, isLoading, isFetching, refetch } = useReport(
    idReport,
    formattedDates
  )

  console.log(data)

  const handleSubmit = (e) => {
    e.preventDefault()
    refetch()
    console.log(formattedDates)
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
      {isLoading ? (
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
