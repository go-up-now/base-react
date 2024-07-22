import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../service/UserService'
import { toast } from 'react-toastify';

const ModalUpdateUser = (props) => {
    const { show, handleClose, dataUpdateUser } = props;
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const ref = useRef()

    const handleUpdateUser = async () => {
        handleClose();
        handleReset();
        let response = await putUpdateUser(dataUpdateUser.id, name, job);
        if(response && response.updatedAt){
            console.log('check name: ', name + ' check job: ', job)
            // gọi lại api getAllData
            toast.success('Cập nhật user thành công!')
        }
        else
            toast.success('Cập nhật user thất bại!')
    }
    useEffect(() => {
        if (show) {
            setName(dataUpdateUser.first_name)
        }
    }, [dataUpdateUser])

    const handleReset = () => {
        ref.current.focus();
        setName('')
        setJob('')
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3 mt-3">
                            <label>Name:</label>
                            <input type="text" className="form-control" placeholder="Enter your name"
                                ref={ref}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Job:</label>
                            <input type="text" className="form-control" placeholder="Enter your job"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleUpdateUser}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export { ModalUpdateUser };