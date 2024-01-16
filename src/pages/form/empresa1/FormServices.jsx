import { useParams } from 'react-router-dom';
import { CardAllFormsComponent } from '../../../components/forms/CardAllFormsComponent';
import { useReports } from '../../../hooks/useReports';
import { LoadingComponent } from '../../../components/LoadingComponent';
import { useForms } from '../../../hooks/useForms';

export const FormServices = () => {
  const token = localStorage.getItem('authToken');
  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useForms(id, token);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <section className="grid w-full p-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
          {data.formularios?.map((form) => (
            <CardAllFormsComponent form={form} key={form.idForm} />
          ))}
        </section>
      )}
    </>
  );
};
