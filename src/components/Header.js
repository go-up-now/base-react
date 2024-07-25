import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../components/assets/images/logo192.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
        toast.success('Log out success')
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                        alt="React Bootstrap logo"
                    />
                    React-Base
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>Manage users</NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavLink to="/login" className='dropdown-item'>Log in</NavLink>
                            <NavDropdown.Item
                                onClick={() => handleLogout()}
                            >
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header