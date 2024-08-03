import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext)

    if (user && user.auth)
        return (
            <>
                {props.children}
            </>
        )
    return (
        <>
            <Alert variant="danger" className='mt-5'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You don't have permission to access this page.
                </p>
            </Alert>
        </>
    )
}

export default PrivateRoutes;