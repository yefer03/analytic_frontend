import React, { useState } from 'react';
import imageAnalisis from '../../assets/imageAnalisis.svg';

import { useLogin } from '../../hooks/useLogin';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { loading, error, isIdle, refetch } = useLogin(formData);

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInput = () => {
    const errors = {
      email: '',
      password: '',
    };

    if (formData.email.trim() === '') {
      errors.email = 'El email es requerido.';
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = 'El email no es válido.';
    }

    if (formData.password.trim() === '') {
      errors.password = 'La contraseña es requerida.';
    }

    setValidationErrors(errors);

    return Object.values(errors).every((error) => error === '');
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      console.error('Error de validación: Campos vacíos o datos incorrectos.');
      return;
    }

    refetch();
  };

  return (
    <section className="h-screen grid justify-center items-center">
      <div className="grid sm:grid-cols-[2fr_1fr] gap-x-5 bg-neutral-100/75 p-5 rounded-lg">
        <div>
          <img
            src={imageAnalisis}
            alt=""
            className="w-full h-full object-cover cursor-pointer hover:scale-105 hover:saturate-200 transition-all duration-300"
          />
        </div>

        <div>
          <form className="grid" onSubmit={onSubmit}>
            <div className="grid">
              <label
                htmlFor="email"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  validationErrors.email ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.email && (
                <span className="text-sm text-red-500">
                  {validationErrors.email}
                </span>
              )}
            </div>

            <div className="grid">
              <label
                htmlFor="password"
                className="font-light mt-5 text-2xl text-neutral-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`rounded-lg px-3 py-2 text-neutral-900 focus:outline-none ${
                  validationErrors.password ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.password && (
                <span className="text-sm text-red-500">
                  {validationErrors.password}
                </span>
              )}
            </div>

            {loading ? (
              <button
                disabled
                type="button"
                className="text-white bg-[#5438CE] cursor-pointer hover:bg-[#3a2694] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-sm text-center me-2  dark:focus:ring-blue-800 inline-flex items-center mt-5 w-full"
              >
                Loading...
              </button>
            ) : (
              <button className="bg-[#5438CE] rounded-lg px-3 py-2 mt-5 text-neutral-100 font-semibold text-sm hover:bg-[#3a2694]  transition-colors duration-300">
                Entrar
              </button>
            )}

            {error && (
              <div className="text-center mt-2 font-semibold text-red-500">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
