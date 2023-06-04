import { useState } from 'react';
import './Form.css';
import Modal from './Modal';
import Confirm from './Confirm';

const initialForm = {
  id: null,
  type: 'expense',
  amount: '',
  description: '',
  category: 'uncategorized',
};

const Form = ({
  addTransaction,
  itemToEdit,
  updateTransaction,
  deleteTransaction,
  categories,
}) => {
  const [form, setForm] = useState(itemToEdit || initialForm);
  const [errors, setErrors] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleConfirmClick = () => {
    setConfirm((prev) => !prev);
  };

  const currentCategories =
    form.type === 'expense' ? categories.expense : categories.income;

  const handleChange = (e) => {
    if (submitDisabled) setSubmitDisabled(false);
    // If the user changes type but doesn't interact with the categories, assign one by default. This avoids sending an incorrect category.
    if (e.target.name === 'type') {
      setForm({
        ...form,
        type: e.target.value,
        category: 'uncategorized',
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const formValidations = () => {
    const errors = {};
    if (!form.amount.toString().trim()) {
      errors.amount = 'Amount field is required';
    } else if (form.amount <= 0) {
      errors.amount = 'Amount should be greater than 0';
    }

    if (!form.description.trim()) {
      errors.description = 'Description field is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there are errors in the data from the form, these will be displayed and the process will not continue until formValidations return 0 errors.
    //
    setErrors(formValidations());
    if (Object.keys(formValidations()).length > 0) return;

    if (itemToEdit) {
      updateTransaction(form);
    } else {
      addTransaction(form);
    }

    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='type-selection'>
        <input
          type='radio'
          name='type'
          id='expense'
          value='expense'
          checked={form.type === 'expense'}
          onChange={handleChange}
        />
        <label className='expense-label' htmlFor='expense'>
          Expense
        </label>

        <input
          type='radio'
          name='type'
          id='income'
          value='income'
          checked={form.type === 'income'}
          onChange={handleChange}
        />
        <label className='income-label' htmlFor='income'>
          Income
        </label>
      </div>

      <label htmlFor='amount'>Amount:</label>
      <input
        id='amount'
        type='number'
        name='amount'
        value={form.amount}
        onChange={handleChange}
      />
      {errors.amount && <p className='input-error'>{errors.amount}</p>}
      <label htmlFor='description'>Description:</label>
      <input
        id='description'
        type='text'
        name='description'
        value={form.description}
        onChange={handleChange}
      />
      {errors.description && (
        <p className='input-error'>{errors.description}</p>
      )}
      <label htmlFor='category'>Category:</label>
      <select
        id='category'
        name='category'
        value={form.category}
        onChange={handleChange}
      >
        {currentCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className='buttons'>
        {' '}
        <input
          className='btn submit-btn'
          type='submit'
          value={itemToEdit ? 'Save' : 'Add'}
          disabled={submitDisabled}
        />
        {itemToEdit && (
          <button
            className='btn delete-btn'
            type='button'
            onClick={() => setConfirm(true)}
          >
            Delete
          </button>
        )}
      </div>

      {confirm && (
        <Modal handleModal={handleConfirmClick}>
          <Confirm
            text='Are you sure to delete this item?'
            handleAccept={() => deleteTransaction(itemToEdit.id)}
            handleCancel={handleConfirmClick}
          />
        </Modal>
      )}
    </form>
  );
};

export default Form;
