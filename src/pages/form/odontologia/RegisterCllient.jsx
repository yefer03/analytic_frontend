import { useForm } from 'react-hook-form'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { UseGetDate } from '../../../hooks/UseGetDate'
import { useServicesClient } from '../../../hooks/useServices'
import DatePicker from 'react-datepicker'
import { useGeneros } from '../../../hooks/useGenero'
import { useNewClientOdontologia } from '../../../hooks/useClientOdontologia'
import { LoadingSmallComponent } from '../../../components/LoadingSmallComponent'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const RegisterCllient = () => {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { data, error, isLoading, isFetching } = useServicesClient()
  const {
    data: genders,
    error: isErrorGender,
    isLoading: isLoadingGender
  } = useGeneros()

  const {
    loading,
    error: isError,
    data: client,
    newClientOdontologia
  } = useNewClientOdontologia()

  const {
    dateRange,
    formattedDates,
    handleDateChange,
    setFormattedDates,
    setDateRange
  } = UseGetDate()

  useEffect(() => {
    setDateRange({
      startDate: new Date()
    })
  }, [])

  const onSubmit = handleSubmit((data) => {
    const dataWithDate = {
      ...data,
      montoCancelado: parseInt(data.montoCancelado),
      fecha_nacimiento: formattedDates.startDate
    }

    console.log(dataWithDate)
    newClientOdontologia(dataWithDate, id)
  })

  return (
    <>
      {isLoading || isLoadingGender ? (
        <LoadingComponent />
      ) : (
        <section className="min-h-screen flex flex-col justify-center items-center p-5 xl:p-0">
          <h2 className="text-3xl font-black text-neutral-100">
            Registrar Cliente
          </h2>
          <form
            // className="grid md:grid-cols-2 gap-x-5"
            className="bg-neutral-100/60 p-5 rounded-lg mt-10 w-full md:w-11/12  xl:w-1/2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid md:grid-cols-2 gap-x-5">
              <div className="flex flex-col">
                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="name"
                  {...register('nombre', {
                    required: 'El nombre es requerido'
                  })}
                  className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                />
                {errors.nombre && (
                  <span className="text-red-500">{errors.nombre.message}</span>
                )}

                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="lastname"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  id="lastname"
                  {...register('apellido', {
                    required: 'El apellido es requerido'
                  })}
                  className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                />
                {errors.apellido && (
                  <span className="text-red-500">
                    {errors.apellido.message}
                  </span>
                )}

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
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="correo_electronico"
                  id="email"
                  {...register('correo_electronico', {
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'El email no es válido'
                    }
                  })}
                  className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                />
                {errors.correo_electronico && (
                  <span className="text-red-500">
                    {errors.correo_electronico.message}
                  </span>
                )}
                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="phoneNumber"
                >
                  Teléfono
                </label>
                <input
                  type="number"
                  name="telefono"
                  id="phoneNumber"
                  {...register('telefono', {
                    required: 'El número telefónico es requerido',
                    pattern: {
                      value: /^[0-9]{10}$/, // Asegura que tenga exactamente 10 dígitos
                      message: 'El número telefónico debe tener 10 dígitos'
                    }
                  })}
                  className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                />
                {errors.telefono && (
                  <span className="text-red-500">
                    {errors.telefono.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="address"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  id="address"
                  {...register('direccion', {
                    required: 'La dirección es requerida'
                  })}
                  className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                />
                {errors.direccion && (
                  <span className="text-red-500">
                    {errors.direccion.message}
                  </span>
                )}

                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="genero"
                >
                  Género
                </label>
                <select
                  name="genero"
                  id="genero"
                  {...register('genero', {
                    required: 'Selecciona tu genero'
                  })}
                  className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                >
                  <option value="">Selecciona un genero</option>
                  {genders.genders?.map((gender) => (
                    <option value={gender.ID_genero} key={gender.ID_genero}>
                      {gender.nombre_genero}
                    </option>
                  ))}
                </select>
                {errors.genero && (
                  <span className="text-red-500">{errors.genero.message}</span>
                )}

                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="fecha_nacimiento"
                >
                  Fecha de nacimiento
                </label>

                <DatePicker
                  id="fecha_nacimiento"
                  selected={dateRange.startDate}
                  onChange={(date) => handleDateChange(date, 'startDate')}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Fecha de Nacimiento"
                  className="px-4 py-2 lg:mr-5 mb-5 lg:mb-0 rounded-md focus:outline-none mt-2"
                />

                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="services"
                >
                  Servicio
                </label>
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
                    <option
                      value={service.ID_servicio}
                      key={service.ID_servicio}
                    >
                      {service.nombre_servicio}
                    </option>
                  ))}
                </select>
                {errors.ID_servicio && (
                  <span className="text-red-500">
                    {errors.ID_servicio.message}
                  </span>
                )}

                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="citas"
                >
                  Cantidad de citas
                </label>
                <input
                  type="number"
                  name="cantidad_citas"
                  id="citas"
                  {...register('cantidad_citas', {
                    required: 'la cantidad de citas  es requerida'
                  })}
                  className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                />
                {errors.cantidad_citas && (
                  <span className="text-red-500">
                    {errors.cantidad_citas.message}
                  </span>
                )}

                <label
                  className="font-light mt-5 text-2xl text-neutral-900"
                  htmlFor="montoCancelado"
                >
                  Monto cancelado
                </label>
                <input
                  type="number"
                  name="montoCancelado"
                  id="montoCancelado"
                  {...register('montoCancelado', {
                    required: 'El monto cancelado es requerido'
                  })}
                  className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                />
                {errors.montoCancelado && (
                  <span className="text-red-500">
                    {errors.montoCancelado.message}
                  </span>
                )}
              </div>
            </div>
            {loading ? (
              <LoadingSmallComponent />
            ) : (
              <button
                type="submit"
                className="bg-[#5438CE]  w-full rounded-lg px-3 py-2 mt-5 text-neutral-100 font-semibold text-sm hover:bg-[#3a2694] transition-colors duration-300"
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
      )}
    </>
  )
}
