import React from 'react';
import { CardFormComponent } from '../../components/forms/CardFormComponent';
import { useCustomer } from '../../hooks/useCustomers';
import { LoadingComponent } from '../../components/LoadingComponent';
import { useQueryClient } from 'react-query';

export const FormPage = () => {
  const useQuery = useQueryClient();

  const customer = useQuery.getQueriesData(['customers']);
  const customers = customer[0][1]?.customers || [];

  return (
    <>
      <div className="p-5 ml-5">
        <h2 className="text-neutral-100 font-semibold text-2xl">
          Tus formularios
        </h2>
      </div>
      <section className="grid w-full p-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
        {customers.map((form) => (
          <CardFormComponent form={form} key={form.idCustomer} />
        ))}
      </section>
    </>
  );
};
