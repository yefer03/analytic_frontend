import { QueryClient, useQueryClient } from 'react-query';
import { FoldersComponents } from '../../components/FoldersComponents';
import { useCustomer } from '../../hooks/useCustomers';
import { LoadingComponent } from '../../components/LoadingComponent';

export const HomePage = () => {
  // const token = localStorage.getItem('authToken');

  // const { data, error, isLoading, isFetching } = useCustomer(token);

  const queryClient = useQueryClient();
  const data = queryClient.getQueriesData(['customers']);

  const customers = data[0][1]?.customers || [];

  return (
    <>
      <div className="p-5 ml-5">
        <h2 className="text-neutral-100 font-semibold text-2xl">Tu empresa</h2>
      </div>
      <main className="grid w-full p-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
        {customers.map((customer, index) => (
          <FoldersComponents customer={customer} key={customer.idCustomer} />
        ))}
      </main>
    </>
  );
};
