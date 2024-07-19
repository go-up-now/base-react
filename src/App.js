import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <>
      <Header />
      <Container>
        <TableUser />
      </Container>
    </>
  );
}

export default App;
