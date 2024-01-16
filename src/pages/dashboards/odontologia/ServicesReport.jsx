import { useParams } from 'react-router-dom';
import { GraphServiceComponent } from '../../../components/analitica/GraphServiceComponent';
import { useReport } from '../../../hooks/useReport';

import { UseGetDate } from '../../../hooks/UseGetDate';
import { DatePickerComponent } from '../../../components/DatePickerComponent';
import { LoadingComponent } from '../../../components/LoadingComponent';

export const ServicesReport = () => {
  const { id: idReport } = useParams();

  const { dateRange, formattedDates, handleDateChange } = UseGetDate();

  const { data, error, isLoading, isFetching, refetch } = useReport(
    idReport,
    formattedDates,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
    console.log(formattedDates);
  };

  return (
    <>
      {isLoading || isFetching ? (
        <LoadingComponent />
      ) : (
        <section className="flex justify-center items-center w-full h-full">
          <div className="w-full md:w-5/6 xs:w-1/2">
            <div className=" flex justify-center  mb-5">
              <div className="flex flex-col  lg:flex-row items-center justify-center overflow-hidden">
                <DatePickerComponent
                  dateRange={dateRange}
                  handleDateChange={handleDateChange}
                />
              </div>
              <button
                className="bg-[#5438CE] px-4 py-2 ml-5 rounded-md text-neutral-100 hover:bg-[#362099] transition-colors duration-300"
                onClick={handleSubmit}
              >
                Aplicar
              </button>
            </div>
            <GraphServiceComponent data={data.report} />
          </div>
        </section>
      )}
    </>
  );
};

{
  /* <h1 className="text-center text-neutral-100 font-black text-3xl">
Servicios mas vendidos
</h1> */
}
