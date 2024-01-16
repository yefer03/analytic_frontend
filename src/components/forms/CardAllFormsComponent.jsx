import React from 'react';
import { useNavigate } from 'react-router-dom';

import formImage from '../../assets/form-svgrepo-com.svg';

export const CardAllFormsComponent = ({ form }) => {
  const navigate = useNavigate();
  console.log(form);
  return (
    <div className="flex flex-col items-center ">
      <img
        src={formImage}
        alt={form.nameForm}
        className="cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() =>
          navigate(
            `odontologia/${form.nameForm.replace(/\s/g, '')}/${form.idForm}`,
          )
        }
      />
      <p className="text-neutral-100 text-xl font-light">{form.nameForm}</p>
    </div>
  );
};
