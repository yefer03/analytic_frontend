import { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { UseGetDate } from '../../../hooks/UseGetDate'
import { useServicesClient } from '../../../hooks/useServices'
import { LoadingSmallComponent } from '../../../components/LoadingSmallComponent'
import { useNewClientOdontologia } from '../../../hooks/useClientOdontologia'
import { useParams } from 'react-router-dom'

export const CitasClient = () => {
  const { id } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { data, isLoading } = useServicesClient()

  const { dateRange, formattedDates, handleDateChange, setDateRange } =
    UseGetDate()

  useEffect(() => {
    setDateRange({
      startDate: new Date()
    })
  }, [])

  const {
    loading,
    error: isError,
    newClientOdontologia
  } = useNewClientOdontologia()

  const onSubmit = handleSubmit((data) => {
    const dataWithDate = {
      ...data,
      fecha_cita: formattedDates.startDate
    }

    console.log(dataWithDate)
    newClientOdontologia(dataWithDate, id)
  })
  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-5 xl:p-0 ">
      <h2 className="text-3xl font-black text-neutral-100">Agendar cita</h2>
      <form
        className="bg-neutral-100/60 p-5 rounded-lg mt-5 w-full md:w-9/12  xl:w-1/3"
        onSubmit={onSubmit}
      >
        <div className="grid">
          <label
            className="font-light mt-5 text-2xl text-neutral-900"
            htmlFor="cedula"
          >
            Cedula
          </label>
          <input
            type="text"
            name="cedula"
            id="cedula"
            {...register('cedula', {
              required: 'La cédula es requerida'
            })}
            className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
          />
          {errors.cedula && (
            <span className="text-red-500">{errors.cedula.message}</span>
          )}
          <label
            className="font-light mt-5 text-2xl text-neutral-900"
            htmlFor="services"
          >
            Servicio
          </label>
          {isLoading ? (
            <LoadingSmallComponent />
          ) : (
            <select
              name="services"
              id="services"
              {...register('ID_servicio', {
                required: 'Selecciona un servicio'
              })}
              className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
            >
              <option value="">Selecciona un servicio</option>
              {data.services?.map((service) => (
                <option value={service.ID_servicio} key={service.ID_servicio}>
                  {service.nombre_servicio}
                </option>
              ))}
            </select>
          )}

          {errors.ID_servicio && (
            <span className="text-red-500">{errors.ID_servicio.message}</span>
          )}
          <label
            className="font-light mt-3 text-2xl text-neutral-900"
            htmlFor="hora_cita"
          >
            Hora de la cita
          </label>
          <input
            type="time"
            name="hora_cita"
            id="hora_cita"
            className="px-4 py-2 lg:mr-5 mb-5 lg:mb-0 rounded-md focus:outline-none mt-2"
            {...register('hora_cita', {
              required: 'La hora de la cita es requerida'
            })}
          />
          {errors.hora_cita && (
            <span className="text-red-500">{errors.hora_cita.message}</span>
          )}
          <label
            className="font-light mt-5 text-2xl text-neutral-900"
            htmlFor="cedula"
          >
            Fecha de la cita
          </label>
          <ReactDatePicker
            selected={dateRange.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            dateFormat="yyyy/MM/dd"
            placeholderText="Fecha de Nacimiento"
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
