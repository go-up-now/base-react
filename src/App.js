import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const { loginContext } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('token'))
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
  }, [])

  return (
    <>
      <Header />
      <Container>
        <AppRoutes />
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
