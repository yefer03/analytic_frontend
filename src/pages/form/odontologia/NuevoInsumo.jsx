import { useForm } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import { UseGetDate } from '../../../hooks/UseGetDate'
import { useNewClientOdontologia } from '../../../hooks/useClientOdontologia'
import { useParams } from 'react-router-dom'
import { LoadingSmallComponent } from '../../../components/LoadingSmallComponent'

export const NuevoInsumo = () => {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { dateRange, formattedDates, handleDateChange } = UseGetDate()

  const {
    loading,
    error: isError,
    newClientOdontologia
  } = useNewClientOdontologia()

  const onSubmit = handleSubmit((data) => {
    const dataWithDate = {
      ...data,
      fecha_compra: formattedDates.startDate
    }
    console.log(dataWithDate)
    newClientOdontologia(dataWithDate, id)
  })

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-5 xl:p-0">
      <h2 className="text-3xl font-black text-neutral-100">Nuevo insumo </h2>
      <form
        className="bg-neutral-100/60 p-5 rounded-lg mt-5 w-full md:w-9/12 xl:w-1/3"
        onSubmit={onSubmit}
      >
        <div className="grid">
          <label
            className="font-light mt-5 text-2xl text-neutral-900"
            htmlFor="nombre_insumo"
          >
            Nombre insumo
          </label>
          <input
            type="text"
            name="nombre_insumo"
            id="nombre_insumo"
            {...register('nombre_insumo', {
              required: 'El nombre del insumo es requerido'
            })}
            className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
          />
          {errors.nombre_insumo && (
            <span className="text-red-500">{errors.nombre_insumo.message}</span>
          )}
          <label
            className="font-light mt-5 text-2xl text-neutral-900"
            htmlFor="descripcion_insumo"
          >
            Descripcion del insumo
          </label>
          <input
            type="text"
            name="descripcion_insumo"
            id="descripcion_insumo"
            {...register('descripcion_insumo', {
              required: 'La descripcion del insumo es requerido'
            })}
            className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
          />
          {errors.descripcion_insumo && (
            <span className="text-red-500">
              {errors.descripcion_insumo.message}
            </span>
          )}
          <label
            className="font-light mt-5 text-2xl text-neutral-900"
            htmlFor="stock_disponible"
          >
            Stock disponible
          </label>
          <input
            type="number"
            name="stock_disponible"
            id="stock_disponible"
            {...register('stock_disponible', {
              required: 'El stock es requerido'
            })}
            className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
          />
          {errors.stock_disponible && (
            <span className="text-red-500">
              {errors.stock_disponible.message}
            </span>
          )}

          <label
            className="font-light mt-5 text-2xl text-neutral-900"
            htmlFor="precio_unitario"
          >
            Precio unitario
          </label>
          <input
            type="number"
            name="precio_unitario"
            id="precio_unitario"
            {...register('precio_unitario', {
              required: 'El stock es requerido'
            })}
            className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
          />
          {errors.precio_unitario && (
            <span className="text-red-500">
              {errors.precio_unitario.message}
            </span>
          )}

          <label
            className="font-light mt-5 text-2xl text-neutral-900"
            htmlFor="fecha_compra"
          >
            Fecha de compra
          </label>
          <ReactDatePicker
            selected={dateRange.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            dateFormat="yyyy/MM/dd"
            placeholderText="Fecha"
            className="px-4 py-2 lg:mr-5 mb-5 lg:mb-0 rounded-md focus:outline-none mt-2"
          />
        </div>
        {loading ? (
          <LoadingSmallComponent />
        ) : (
          <button
            type="submit"
            className="bg-[#5438CE] w-full rounded-lg px-3 py-2 mt-5 text-neutral-100 font-semibold text-sm hover:bg-[#3a2694] transition-colors duration-300"
          >
            Crear
          </button>
        )}

        {isError && (
          <div className="text-center mt-2 font-semibold text-red-500">
            {isError}
          </div>
        )}
      </form>
    </section>
  )
}
