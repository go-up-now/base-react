import Alert from 'react-bootstrap/Alert';

const NotFound = () => {
    return (
        <>
            <Alert variant="warning" className='mt-5'>
                <Alert.Heading>Oh snap! You got an warning!</Alert.Heading>
                <p>
                    Not found this page.
                </p>
            </Alert>
        </>
    )
}

export default NotFound;