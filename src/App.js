import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<TableUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
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
