import './Confirm.css';

const Confirm = ({ text, handleAccept, handleCancel }) => {
  return (
    <div>
      <p className='confirm-text'>{text}</p>
      <div className='confirm-options'>
        <button className='btn accept-btn' type='button' onClick={handleAccept}>
          Accept
        </button>
        <button className='btn cancel-btn' type='button' onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Confirm;
