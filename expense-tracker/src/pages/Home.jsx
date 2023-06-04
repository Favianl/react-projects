import './Home.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Transaction from '../components/Transaction';

const Home = ({ data, setItemToEdit, handleModal }) => {
  const lastMovements = data.slice(0, 5);

  const totalIncome = data
    .filter((item) => item.type === 'income')
    .reduce((acc, current) => acc + current.amount, 0);

  const totalExpense = data
    .filter((item) => item.type === 'expense')
    .reduce((acc, current) => acc + current.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <>
      <section className='finances-summary container'>
        <div className='finances-total'>
          <div className='finances-amount'>
            <p className='income-text'>Income</p>
            <p className='income-amount'>$ {totalIncome}.00</p>
          </div>
          <div className='finances-amount'>
            <p className='expense-text'>Expense</p>
            <p className='expense-amount'>$ {totalExpense}.00</p>
          </div>
          <div className='finances-amount'>
            <p className='balance-text'>Balance</p>
            <p
              className={`balance-amount ${
                totalBalance < 0 && 'negative-amount'
              }`}
            >
              $ {totalBalance}.00
            </p>
          </div>
          <button className='btn add-transaction' onClick={handleModal}>
            <AiOutlinePlus />
          </button>
        </div>
      </section>
      <section className='transactions container'>
        <p className='transactions-message'>Last movements:</p>
        <ul className='transaction-list'>
          {data.length > 0 ? (
            lastMovements.map((item) => (
              <Transaction
                key={item.id}
                data={item}
                handleModal={handleModal}
                setItemToEdit={setItemToEdit}
              />
            ))
          ) : (
            <h4 className='empty-message'>No data</h4>
          )}
        </ul>
        {data.length > 5 && (
          <Link className='btn view-history' to='/history'>
            View All
          </Link>
        )}
      </section>
    </>
  );
};

export default Home;
