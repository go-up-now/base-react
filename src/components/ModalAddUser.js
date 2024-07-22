import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../service/UserService'
import { toast, Bounce } from 'react-toastify';

const ModalAddUser = (props) => {
    const { show, handleClose, handleUpdateUser } = props;
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const ref = useRef()

    const handleSaveUser = async () => {
        handleClose();
        handleReset();
        let response = await postCreateUser(name, job);
        console.log(response)
        if (response && response.id) {
            toast.success('Thêm mới thành công!', {
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce
            });
            handleUpdateUser({ id: response.id, first_name: response.name })
        }
    }

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
                    <Modal.Title>Add new user</Modal.Title>
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
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export { ModalAddUser };