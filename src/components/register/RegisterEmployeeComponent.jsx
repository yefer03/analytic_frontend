import imageAnalisis from '../../assets/13316494_5215755.svg';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/useRegister';
import { LoadingSmallComponent } from '../../components/LoadingSmallComponent';
import { useQueryClient } from 'react-query';

const ciudadesColombia = [
  { id: 1, nombre: 'Bogotá' },
  { id: 2, nombre: 'Medellín' },
  { id: 3, nombre: 'Cali' },
  { id: 4, nombre: 'Barranquilla' },
  { id: 5, nombre: 'Cartagena' },
  { id: 6, nombre: 'Bucaramanga' },
  // Agrega más ciudades según sea necesario
];

export const RegisterEmployeeComponent = ({ isRoles, isLoading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const { loading, error, data, authRegister } = useRegister();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    authRegister(data);
    // reset();
  });

  const useQuery = useQueryClient();
  const customer = useQuery.getQueriesData(['customers']);

  const customers = customer[0][1].customers;
  return (
    <>
      <div className="grid w-full lg:w-11/12 sm:grid-cols-[1fr_2fr] gap-x-5 bg-neutral-100/75 p-5 rounded-lg">
        <div className="overflow-hidden relative">
          <div className="flex justify-center">
            <h1 className="text-neutral-100 text-2xl font-semibold">
              Registra tus empledos
            </h1>
          </div>
          <img
            src={imageAnalisis}
            alt=""
            className="w-full h-full object-cover cursor-pointer hover:scale-105 hover:saturate-200 transition-all duration-300"
          />
        </div>

        <div>
          <form
            className="grid lg:grid-cols-2 gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  errors.name ? 'border-red-500' : ''
                }`}
                {...register('name', {
                  required: 'El nombre es requerido',
                })}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}

              <label
                htmlFor="lastname"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  errors.lastname ? 'border-red-500' : ''
                }`}
                {...register('lastName', {
                  required: 'El apellido es requerido',
                })}
              />
              {errors.lastname && (
                <span className="text-sm text-red-500">
                  {errors.lastname.message}
                </span>
              )}

              <label
                htmlFor="email"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  errors.email ? 'border-red-500' : ''
                }`}
                {...register('email', {
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'El email no es válido',
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}

              <label
                htmlFor="direccionResidencia"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Dirección de Residencia
              </label>
              <input
                type="text"
                id="direccionResidencia"
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  errors.direccionResidencia ? 'border-red-500' : ''
                }`}
                {...register('address', {
                  required: 'La dirección de residencia es requerida',
                  maxLength: {
                    value: 100,
                    message:
                      'La dirección no puede tener más de 100 caracteres',
                  },
                })}
              />
              {errors.direccionResidencia && (
                <span className="text-sm text-red-500">
                  {errors.direccionResidencia.message}
                </span>
              )}

              <label
                htmlFor="phoneNumberAgente"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Numero telefónico
              </label>
              <input
                type="text"
                id="phoneNumberAgente"
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  errors.phoneNumberAgente ? 'border-red-500' : ''
                }`}
                {...register('phoneNumber', {
                  required: 'El número telefónico es requerido',
                  pattern: {
                    value: /^[0-9]{10}$/, // Asegura que tenga exactamente 10 dígitos
                    message: 'El número telefónico debe tener 10 dígitos',
                  },
                })}
              />
              {errors.phoneNumberAgente && (
                <span className="text-sm text-red-500">
                  {errors.phoneNumberAgente.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <select
                name="empresa"
                id="empresa"
                className={`px-3 py-2 rounded-lg mt-14 bg-neutral-100 focus:outline-none ${
                  errors.empresa ? 'border-red-500' : ''
                }`}
                {...register('idEmpleadoCustomer', {
                  required: 'Por favor, elige la empresa',
                })}
              >
                <option value="">Seleccione su empresa</option>
                {customers.map((customer) => (
                  <option value={customer.idCompany} key={customer.idCustomer}>
                    {customer.nameCustomer}
                  </option>
                ))}
              </select>
              {errors.empresa && (
                <span className="text-sm text-red-500">
                  {errors.empresa.message}
                </span>
              )}

              <select
                name="ciudad"
                id="ciudad"
                className={`px-3 py-2 rounded-lg mt-14 bg-neutral-100 focus:outline-none ${
                  errors.ciudad ? 'border-red-500' : ''
                }`}
                {...register('city', {
                  required: 'Por favor, elige la ciudad',
                })}
              >
                <option value="">Seleccione su ciudad</option>
                {ciudadesColombia.map((ciudad) => (
                  <option value={ciudad.nombre} key={ciudad.id}>
                    {ciudad.nombre}
                  </option>
                ))}
              </select>
              {errors.ciudad && (
                <span className="text-sm text-red-500">
                  {errors.ciudad.message}
                </span>
              )}
              {isLoading ? (
                <LoadingSmallComponent />
              ) : (
                <select
                  name="rol"
                  id="rol"
                  className={`px-3 py-2 rounded-lg mt-14 bg-neutral-100 focus:outline-none ${
                    errors.rol ? 'border-red-500' : ''
                  }`}
                  {...register('idRole', {
                    required: 'Por favor, elige el rol',
                  })}
                >
                  <option value="">Seleccione su rol</option>
                  {isRoles.roles?.map((rol) => (
                    <option value={rol.idRole} key={rol.idRole}>
                      {rol.nombreRol}
                    </option>
                  ))}
                </select>
              )}
              {errors.rol && (
                <span className="text-sm text-red-500">
                  {errors.rol.message}
                </span>
              )}
              <label
                htmlFor="password"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  errors.password ? 'border-red-500' : ''
                }`}
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres',
                  },
                })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}

              <label
                htmlFor="confirmPassword"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Confirma la contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                {...register('confirmPassword', {
                  required: 'Confirma la contraseña',
                  validate: (value) =>
                    value === watch('password') ||
                    'Las contraseñas no coinciden',
                })}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}

              {loading ? (
                <button
                  disabled
                  type="button"
                  className="text-white bg-[#5438CE] cursor-pointer hover:bg-[rgb(63,138,125)] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-sm text-center me-2  dark:focus:ring-blue-800 inline-flex items-center mt-5 w-full"
                >
                  Loading...
                </button>
              ) : (
                <button className="bg-[#5438CE] rounded-lg px-3 py-2 mt-5 text-neutral-100 font-semibold text-sm hover:bg-[#3a2694] transition-colors duration-300">
                  Crear
                </button>
              )}
              {error && (
                <div className="text-center mt-2 font-semibold text-red-500">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
