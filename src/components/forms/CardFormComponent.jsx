import { useNavigate } from 'react-router-dom';
import formImage from '../../assets/folder-with-files-svgrepo-com.svg';

export const CardFormComponent = ({ form }) => {
  const navigate = useNavigate();

  return (
    <div
      // onClick={() => navigate(form.idCustomer)}
      className="flex flex-col items-center"
    >
      <img
        src={formImage}
        alt={form.nameCustomer}
        className="cursor-pointer hover:scale-105  transition-transform duration-300"
        onClick={() => navigate(`/form/${form.idCustomer}`)}
      />

      <p className="text-neutral-100 text-xl font-light">{form.nameCustomer}</p>
    </div>
  );
};
