import React from 'react';

import { RegisterEmployeeComponent } from '../../components/register/RegisterEmployeeComponent';
import { useRoles } from '../../hooks/useRoles';
import { RegisterCustomerComponent } from '../../components/register/RegisterCustomerComponent';
import { useQueryClient } from 'react-query';

export const RegisterPage = () => {
  const { data: isRoles, error: isError, isLoading, isFetching } = useRoles();

  const useQuery = useQueryClient();

  const customer = useQuery.getQueriesData(['customers']);
  const role = customer[0][1]?.role || 3;

  return (
    <section
      className={`flex flex-col  gap-y-5 justify-center items-center ${
        role === 2 ? 'h-screen' : 'm-2'
      }`}
    >
      <RegisterEmployeeComponent isRoles={isRoles} isLoading={isLoading} />

      {role === 1 ? (
        <RegisterCustomerComponent isRoles={isRoles} isLoading={isLoading} />
      ) : (
        ''
      )}
    </section>
  );
};
