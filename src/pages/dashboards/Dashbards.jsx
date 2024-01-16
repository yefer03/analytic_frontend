import { useParams } from 'react-router-dom'
import { GraphsComponents } from '../../components/analitica/GraphsComponents'
import { LoadingComponent } from '../../components/LoadingComponent'
import { useReports } from '../../hooks/useReports'

export const Dashbards = () => {
  const token = localStorage.getItem('authToken')
  const { id } = useParams()
  const { data, isLoading } = useReports(id, token)
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <section className="grid w-full p-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
          {data.reports?.map((folder) => (
            <GraphsComponents graph={folder} key={folder.idReport} />
          ))}
        </section>
      )}
    </>
  )
}
