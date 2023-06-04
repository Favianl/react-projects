import './Transaction.css';

const Transaction = ({ data, handleModal, setItemToEdit }) => {
  return (
    <li
      className='transaction'
      onClick={() => {
        handleModal();
        setItemToEdit(data);
      }}
    >
      <p>{data.description}</p>

      <p
        className={`${
          data.type === 'expense' ? 'expense-color' : 'income-color'
        }`}
      >
        {data.type === 'expense' && '-'}${data.amount}.00
      </p>
    </li>
  );
};

export default Transaction;
