import Swal from 'sweetalert2';

export const alertSuccess = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 2500,
  });
};
