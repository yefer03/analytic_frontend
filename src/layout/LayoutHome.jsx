import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarComponent } from '../components/NavbarComponent';
import { LoadingComponent } from '../components/LoadingComponent';
import { useCustomer } from '../hooks/useCustomers';

export const LayoutHome = () => {
  const token = localStorage.getItem('authToken');

  const { data, error, isLoading, isFetching } = useCustomer(token);

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="flex bg-[#202124]">
          <div>
            <NavbarComponent />
          </div>
          <div className=" w-full h-screen overflow-y-auto ">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};
