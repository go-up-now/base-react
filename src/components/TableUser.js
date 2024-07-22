import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { FetchAllUser } from '../service/UserService';
import ReactPaginate from 'react-paginate';
import { ModalAddUser } from './ModalAddUser';
import { ModalUpdateUser } from './ModalUpdateUser'
import { ModalDeleteUser } from './ModalDeleteUser ';


const TableUser = () => {

    const [listUser, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showModalUser, setShowModalUser] = useState(false);

    const [dataUpdateUser, setdataUpdateUser] = useState({});
    const [showModalUpdateUser, setshowModalUpdateUser] = useState(false);

    const [showModalDeleteUser, setshowModalDeleteUser] = useState(false);
    const [dataDeleteUser, setdataDeleteUser] = useState({});

    useEffect(() => {
        getUsers(1)
    }, [])

    const getUsers = async (page) => {
        let response = await FetchAllUser(page);
        if (response && response.data) {
            setListUser(response.data)
            setTotalUser(response.total)
            setTotalPages(response.total_pages)
        }

    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
    };

    const handleClose = () => {
        setShowModalUser(false);
        setshowModalUpdateUser(false);
        setshowModalDeleteUser(false)
    }

    const handleUpdateUser = (user) => {
        setListUser([user, ...listUser])
    }

    const handleEditUser = (user) => {
        setdataUpdateUser(user);
        setshowModalUpdateUser(true);
    }

    const handleDeleteUser = (user) => {
        setshowModalDeleteUser(true);
        setdataDeleteUser(user);
    }

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <span>List user</span>
                <button className='btn btn-success' onClick={() => setShowModalUser(true)}>Add user</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>email</th>
                        <th>first_name</th>
                        <th>last_name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser.map((item, index) => {
                        return (
                            <tr key={`user_${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}rk</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <div className='btn btn-warning me-3'
                                        onClick={() => handleEditUser(item)}
                                    >
                                        Edit
                                    </div>
                                    <div className='btn btn-danger'
                                        onClick={() => handleDeleteUser(item)}
                                    >Delete</div>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddUser
                show={showModalUser}
                handleClose={handleClose}
                handleUpdateUser={handleUpdateUser}
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                handleClose={handleClose}
                dataUpdateUser={dataUpdateUser}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                handleClose={handleClose}
                dataDeleteUser={dataDeleteUser}
            />
        </>
    )
}

export default TableUser