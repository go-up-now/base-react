import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Header />
      <Container>
        <TableUser />
      </Container>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition:Bounce,
      />
    </>
  );
}

export default App;
