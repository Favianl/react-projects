import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Modal from './components/Modal';
import Form from './components/Form';
import Home from './pages/Home';
import History from './pages/History';
import Confirm from './components/Confirm';
import Header from './components/Header';

const initialData =
  JSON.parse(localStorage.getItem('dataExpenseTracker')) || [];

const initialTheme = JSON.parse(localStorage.getItem('theme')) || 'light';

const categories = {
  income: [
    'uncategorized',
    'salary',
    'business',
    'investment',
    'commissions',
    'tips',
  ],
  expense: [
    'uncategorized',
    'rent',
    'food',
    'transport',
    'health',
    'utilities',
    'entertainment',
  ],
};

function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [data, setData] = useState(initialData);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const dataReverse = [...data].reverse();

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', JSON.stringify('dark'));
    } else {
      setTheme('light');
      localStorage.setItem('theme', JSON.stringify('light'));
    }
  };

  const handleConfirmDialog = () => {
    setConfirmDialog((prev) => !prev);
    handleModal();
  };

  const handleModal = () => setOpenModal((prev) => !prev);

  const addTransaction = (transaction) => {
    if (/Windows|Macintosh|Linux/i.test(navigator.userAgent)) {
      transaction.id = crypto.randomUUID();
    } else {
      transaction.id = Date.now();
    }
    transaction.amount = parseInt(transaction.amount);
    setData([...data, transaction]);
    handleModal();
  };

  const updateTransaction = (transaction) => {
    transaction.amount = parseInt(transaction.amount);
    const newData = data.map((item) =>
      item.id !== transaction.id ? item : transaction
    );

    setData(newData);
    setItemToEdit(null);
    handleModal();
  };

  const deleteTransaction = (id) => {
    setItemToEdit(null);
    handleModal();
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const clearAll = () => {
    setData([]);
    handleModal();
    setConfirmDialog(false);
  };

  useEffect(() => {
    localStorage.setItem('dataExpenseTracker', JSON.stringify(data));
  }, [data]);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <h1>Expense Tracker</h1>
        <Header
          handleConfirmDialog={handleConfirmDialog}
          handleTheme={handleTheme}
          theme={theme}
        />
        <main>
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  data={dataReverse}
                  setItemToEdit={setItemToEdit}
                  handleModal={handleModal}
                />
              }
            />
            <Route
              path='/history'
              element={
                <History
                  data={dataReverse}
                  setItemToEdit={setItemToEdit}
                  handleModal={handleModal}
                  categories={categories}
                />
              }
            />
            <Route
              path='*'
              element={<h3 className='not-found'>Page Not Found</h3>}
            />
          </Routes>
        </main>
      </Router>
      {/* When the modal is open, its content (children) that will be shown depends on the chosen option. */}
      {openModal && (
        <Modal
          handleModal={handleModal}
          setItemToEdit={setItemToEdit}
          setConfirmDialog={setConfirmDialog}
        >
          {confirmDialog ? (
            <Confirm
              text='Are you sure to delete all data?'
              handleAccept={clearAll}
              handleCancel={handleConfirmDialog}
            />
          ) : (
            <Form
              addTransaction={addTransaction}
              itemToEdit={itemToEdit}
              updateTransaction={updateTransaction}
              deleteTransaction={deleteTransaction}
              categories={categories}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
