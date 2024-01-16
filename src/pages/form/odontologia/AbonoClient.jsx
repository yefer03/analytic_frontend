import { useForm } from 'react-hook-form'
import { LoadingSmallComponent } from '../../../components/LoadingSmallComponent'
import { useGetDeudasOdonotologia } from '../../../hooks/useGetDeudasOdontologia'
import { formatearComoDinero } from '../../../helpers/ConvertToPrice'
import { useAbono } from '../../../hooks/useABono'
import { useParams } from 'react-router-dom'

export const AbonoClient = () => {
  const { id } = useParams()

  const {
    register: registerConsulta,
    handleSubmit: handleSubmitConsulta,
    formState: { errors: errorsConsulta }
  } = useForm()

  const {
    register: registerAbono,
    handleSubmit: handleSubmitAbono,
    formState: { errors: errorsAbono }
  } = useForm()

  const { loading, error, data, getDeudasOdontologia } =
    useGetDeudasOdonotologia()
  const { loading: loadingAbono, error: errorAbono, newAbono } = useAbono()

  const onSubmitConsulta = handleSubmitConsulta((data) => {
    console.log(data)
    getDeudasOdontologia(data.cedula)
  })

  const onSubmitAbono = handleSubmitAbono((data) => {
    console.log(data)
    newAbono(data, id)
  })

  return (
    <section className="container mx-auto p-5 xl:p-0">
      <h2 className="text-3xl font-black text-neutral-100 mt-5">
        Realizar un abono
      </h2>
      <div className="bg-neutral-100/60 p-5 mt-10 rounded-lg grid md:grid-cols-[1fr_2fr] gap-x-5">
        <div>
          <form className="flex flex-col" onSubmit={onSubmitConsulta}>
            <label
              className="font-light text-2xl text-neutral-900"
              htmlFor="cedula"
            >
              Cedula
            </label>
            <input
              type="text"
              name="cedula"
              id="cedula"
              {...registerConsulta('cedula', {
                required: 'La cédula es requerida'
              })}
              className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
            />
            {errorsConsulta.cedula && (
              <span className="text-red-500">
                {errorsConsulta.cedula.message}
              </span>
            )}
            {loading ? (
              <LoadingSmallComponent />
            ) : (
              <button
                type="submit"
                className="bg-[#5438CE] rounded-lg px-3 py-2 mt-5 text-neutral-100 font-semibold text-sm hover:bg-[#3a2694] transition-colors duration-300"
              >
                Consultar
              </button>
            )}

            {error && (
              <div className="text-center mt-2 font-semibold text-red-500">
                {error}
              </div>
            )}
          </form>
          {data ? (
            <form className="flex flex-col" onSubmit={onSubmitAbono}>
              <label
                className="font-light text-2xl text-neutral-900"
                htmlFor="ID_pago"
              >
                ID pago
              </label>
              <input
                type="number"
                className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
                {...registerAbono('ID_pago', {
                  required: 'El id del pago es requerido'
                })}
              />
              {errorsAbono.ID_pago && (
                <span className="text-red-500">
                  {errorsAbono.ID_pago.message}
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
                {...registerAbono('montoCancelado', {
                  required: 'El monto cancelado es requerido'
                })}
                className="px-3 py-2 rounded-lg  bg-neutral-100 focus:outline-none"
              />
              {errorsAbono.montoCancelado && (
                <span className="text-red-500">
                  {errorsAbono.montoCancelado.message}
                </span>
              )}
              {loadingAbono ? (
                <LoadingSmallComponent />
              ) : (
                <button
                  type="submit"
                  className="bg-[#5438CE] rounded-lg px-3 py-2 mt-5 text-neutral-100 font-semibold text-sm hover:bg-[#3a2694] transition-colors duration-300"
                >
                  Agregar pago
                </button>
              )}
              {errorAbono && (
                <div className="text-center mt-2 font-semibold text-red-500">
                  {errorAbono}
                </div>
              )}
            </form>
          ) : (
            ''
          )}
        </div>
        {data ? (
          <div className="mt-10 md:mt-0">
            <ul className="flex flex-wrap gap-10 justify-center">
              {data.deudasPendientes?.map((deuda) => (
                <li
                  key={deuda.ID_pago}
                  className="bg-[#5438CE]/90 rounded-lg p-5 text-neutral-100"
                >
                  <h3 className="text-3xl font-semibold">
                    {deuda.nombre_servicio}
                  </h3>
                  <div>
                    <p className="font-semibold text-xl">
                      Precio del servicio:{' '}
                      <span className="font-normal">
                        {formatearComoDinero(deuda.precio_servicio)}
                      </span>
                    </p>
                    <p className="font-semibold text-xl">
                      Monto cancelado:{' '}
                      <span className="font-normal">
                        {formatearComoDinero(deuda.monto_cancelado)}
                      </span>
                    </p>
                    <p className="font-semibold text-xl">
                      Deuda pendiente:{' '}
                      <span className="font-normal">
                        {formatearComoDinero(deuda.deudaPendiente)}
                      </span>
                    </p>
                    <p className="flex justify-end items-center">
                      ID:{' '}
                      <span className="font-bold text-xl">{deuda.ID_pago}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  )
}
