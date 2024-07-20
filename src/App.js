import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ModalAddUser } from './components/ModalAddUser';
import { useState } from 'react';

function App() {
  const [showModalUser, setShowModalUser] = useState(false);
  const handleClose = () => {
    setShowModalUser(false);
  }
  return (
    <>
      <Header />
      <Container>
        <div className='d-flex justify-content-between align-items-center'>
          <span>List user</span>
          <button className='btn btn-success' onClick={() => setShowModalUser(true)}>Add user</button>
        </div>
        <TableUser />
      </Container>
      <ModalAddUser
        show={showModalUser}
        handleClose={handleClose}
      />
    </>
  );
}

export default App;
