import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { FetchAllUser } from '../service/UserService';
import ReactPaginate from 'react-paginate';
import { ModalAddUser } from './ModalAddUser';
import { ModalUpdateUser } from './ModalUpdateUser'
import { ModalDeleteUser } from './ModalDeleteUser ';
import './TableUser.scss';
import _, { isArrayLike } from "lodash";
import { CSVLink } from "react-csv";


const TableUser = () => {

    const [listUser, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showModalUser, setShowModalUser] = useState(false);

    const [dataUpdateUser, setdataUpdateUser] = useState({});
    const [showModalUpdateUser, setshowModalUpdateUser] = useState(false);

    const [showModalDeleteUser, setshowModalDeleteUser] = useState(false);
    const [dataDeleteUser, setdataDeleteUser] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [fieldSort, setFieldSort] = useState('id');

    const [keyword, setKeyword] = useState('')


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

    const handleSort = (sortBy, fieldSort) => {
        setSortBy(sortBy);
        setFieldSort(fieldSort);
        var cloneListUsers = _.cloneDeep(listUser)
        var cloneListUsers = _.orderBy(cloneListUsers, [fieldSort], [sortBy]);
        // Khúc này là gọi api
        setListUser(cloneListUsers)
    }

    const handleSearch = _.debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUser)
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUser(cloneListUsers)
            console.log(123)
        }
        else {
            getUsers();
        }
    }, 400)

    const data = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <span>List user</span>
                <div className='group-btns'>
                    <label htmlFor='file' className='btn btn-warning'>
                        <i class="fa-solid fa-file-arrow-up"></i> Import
                    </label>
                    <input type='file' id='file' hidden />
                    <CSVLink
                        data={data}
                        filename={"list_user.csv"}
                        className="btn btn-primary"
                        target="_blank"
                    >
                        <i className="fa-solid fa-file-arrow-down"></i> Export
                    </CSVLink>
                    <button className='btn btn-success' onClick={() => setShowModalUser(true)}>
                        <i className="fa-solid fa-plus"></i> Add new
                    </button>
                </div>
            </div>
            <div>
                <input
                    className='col-md-6 my-2'
                    placeholder='Search user by email...'
                    onChange={(event) => handleSearch(event)}
                ></input>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='d-flex justify-content-between'>
                            <span>ID</span>
                            <span className='cursor-pointer'>
                                <i class="fa-solid fa-arrow-down me-3"
                                    onClick={() => handleSort('desc', 'id')}
                                ></i>
                                <i class="fa-solid fa-arrow-up"
                                    onClick={() => handleSort('asc', 'id')}
                                ></i>
                            </span>
                        </th>
                        <th>email</th>
                        <th className='d-flex justify-content-between'>
                            <span>first_name</span>
                            <span className='cursor-pointer'>
                                <i class="fa-solid fa-arrow-down me-3"
                                    onClick={() => handleSort('desc', 'first_name')}
                                ></i>
                                <i class="fa-solid fa-arrow-up"
                                    onClick={() => handleSort('asc', 'first_name')}
                                ></i>
                            </span>
                        </th>
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