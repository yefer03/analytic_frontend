import { useNavigate } from 'react-router-dom';
import imageGraph from '../../assets/graph-up-svgrepo-com.svg';

export const GraphsComponents = ({ graph }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center " key={graph.idReport}>
      <img
        src={imageGraph}
        alt={graph.nameReport}
        className="cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() =>
          navigate(
            `odontologia/${graph.nameReport
              .trim()
              .replace(/\s/g, '')
              .toLowerCase()}/${graph.idReport}`,
          )
        }
      />
      <p className="text-neutral-100 text-xl font-light">{graph.nameReport}</p>
    </div>
  );
};
