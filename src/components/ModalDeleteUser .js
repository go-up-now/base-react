import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../service/UserService'
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, handleClose, dataDeleteUser } = props;

    const handleDeleteUser = async () => {
        let response = await deleteUser(dataDeleteUser.id);

        if (response && +response === 204) {
            toast.success('Xoá user thành công!')
            handleClose();

            // re-call get all users api
        }
        else
            toast.error('Xóa user thất bại!')
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete an user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This user can't be undont!
                    Do you want to delete this user? <br />
                    <b>email = {dataDeleteUser.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteUser}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export { ModalDeleteUser };