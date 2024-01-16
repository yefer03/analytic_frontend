import { useForm } from 'react-hook-form'
import { useServicesClient } from '../../../hooks/useServices'
import { useNewClientOdontologia } from '../../../hooks/useClientOdontologia'
import { LoadingSmallComponent } from '../../../components/LoadingSmallComponent'
import { useParams } from 'react-router-dom'

export const VenderServicio = () => {
  const { id } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { data, isLoading } = useServicesClient()

  const {
    loading,
    error: isError,
    newClientOdontologia
  } = useNewClientOdontologia()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    newClientOdontologia(data, id)
  })

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-5">
      <h2 className="text-3xl font-black text-neutral-100">Vender servicio</h2>
      <form
        className="bg-neutral-100/60 p-5 rounded-lg mt-5  w-full md:w-9/12  xl:w-1/3"
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
