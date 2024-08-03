import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import TableUser from '../components/TableUser';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoutes>
                            <TableUser />
                        </PrivateRoutes>
                    }
                />
            </Routes>
        </>
    )
}

export default AppRoutes;