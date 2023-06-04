import { useState } from 'react';
import Transaction from '../components/Transaction';
import './History.css';

const initialForm = {
  type: 'all',
  category: 'all',
};

const History = ({ data, handleModal, setItemToEdit, categories }) => {
  const [form, setForm] = useState(initialForm);

  const currentCategories =
    form.type === 'expense' ? categories.expense : categories.income;

  let filteredList;

  if (form.type !== 'all') {
    filteredList = data.filter((item) => item.type === form.type);

    if (form.category !== 'all') {
      filteredList = filteredList.filter(
        (item) => item.category === form.category
      );
    }
  } else {
    filteredList = [...data];
  }

  const totalFiltered = filteredList.reduce(
    (acc, current) => acc + current.amount,
    0
  );

  return (
    <section className='history container'>
      <h2>History</h2>
      <form className='history-form'>
        <label htmlFor='history-type'>
          Type:
          <select
            id='history-type'
            onChange={(e) => setForm({ type: e.target.value, category: 'all' })}
          >
            <option value='all'>All</option>
            <option value='expense'>Expense</option>
            <option value='income'>Income</option>
          </select>
        </label>

        <label htmlFor='history-category'>
          Category:
          <select
            id='history-category'
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            <option value='all'>All</option>
            {form.type !== 'all' &&
              currentCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </label>
      </form>
      <ul className='history-list'>
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
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
      {form.type !== 'all' && filteredList.length > 0 && (
        <div className='history-total'>
          <p>Total</p>
          <p>${totalFiltered}.00</p>
        </div>
      )}
    </section>
  );
};

export default History;
