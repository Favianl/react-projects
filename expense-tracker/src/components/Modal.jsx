import './Modal.css';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ children, handleModal, setItemToEdit, setConfirmDialog }) => {
  const closeModal = () => {
    handleModal();
    setItemToEdit && setItemToEdit(null);
    setConfirmDialog && setConfirmDialog(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <section className='modal' onClick={handleBackdropClick}>
      <div className='modal-content'>
        <button className='modal-close' onClick={closeModal}>
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </section>
  );
};

export default Modal;
