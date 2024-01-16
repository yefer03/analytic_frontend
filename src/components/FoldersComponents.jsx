import { useNavigate } from 'react-router-dom';
import imageFolder from '../assets/folder-cloud-svgrepo-com.svg';

export const FoldersComponents = ({ customer, index }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center ">
      <img
        src={imageFolder}
        alt={customer.nameCustomer}
        className="cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => navigate(`/analitica/${customer.idCustomer}`)}
      />
      <p className="text-neutral-100 text-xl font-light">
        {customer.nameCustomer}
      </p>
    </div>
  );
};
