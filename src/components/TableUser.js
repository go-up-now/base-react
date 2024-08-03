import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { FetchAllUser } from '../service/UserService';
import ReactPaginate from 'react-paginate';
import { ModalAddUser } from './ModalAddUser';
import { ModalUpdateUser } from './ModalUpdateUser'
import { ModalDeleteUser } from './ModalDeleteUser ';
import './TableUser.scss';
import _ from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';


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

    const [dataExport, setDataExport] = useState([])


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

    const handleExport = (event, done) => {
        let resault = [];
        if (listUser && listUser.length > 0) {
            resault.push(['ID', 'EMAIL', 'FIRST NAME', 'LAST NAME']);
            listUser.map(item => {
                let arr = [];
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name

                resault.push(arr)
            })
            setDataExport(resault);
            // done(true);
        }
    }

    const handleImport = (e) => {
        if (e && e.target && e.target.files[0]) {
            let file = e.target.files[0];

            if (file.type !== 'text/csv') {
                toast.error('Only accept CSV file!')
                return;
            }

            Papa.parse(file, {
                // header: true,
                complete: function (responses) {
                    let rowCSV = responses.data;
                    if (rowCSV.length > 0) {
                        if (rowCSV[0].length === 3) {
                            if (rowCSV[0][0] !== 'email' ||
                                rowCSV[0][1] !== 'first_name' ||
                                rowCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Wrong format header on CSV file!')
                            }
                            else {
                                let result = [];
                                rowCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let object = {};
                                        object.email = item[0]
                                        object.first_name = item[1]
                                        object.last_name = item[2]

                                        result.push(object);
                                    }
                                })
                                setListUser(result)
                            }
                        }
                        else
                            toast.error('Wrong format CSV file!')
                    }
                    else
                        toast.error('Not data on CSV file!')
                }
            });
        }
    }

    return (
        <>
            <div className='d-sm-flex justify-content-between align-items-center'>
                <span className='fw-bold'>List user</span>
                <div className='group-btns'>
                    <label htmlFor='file' className='btn btn-warning'>
                        <i className="fa-solid fa-file-arrow-up"></i> Import
                    </label>
                    <input type='file' id='file' hidden onChange={e => handleImport(e)} />
                    <CSVLink
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={handleExport}
                        filename={"list_user.csv"}
                        className="btn btn-primary"
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
                    className='col-12 col-md-6 my-2'
                    placeholder='Search user by email...'
                    onChange={(event) => handleSearch(event)}
                ></input>
            </div>
            <div className='table-responsive'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='d-flex justify-content-between'>
                                <span>ID</span>
                                <span className='cursor-pointer'>
                                    <i className="fa-solid fa-arrow-down me-3"
                                        onClick={() => handleSort('desc', 'id')}
                                    ></i>
                                    <i className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort('asc', 'id')}
                                    ></i>
                                </span>
                            </th>
                            <th>email</th>
                            <th className='d-flex justify-content-between'>
                                <span>first_name</span>
                                <span className='cursor-pointer'>
                                    <i className="fa-solid fa-arrow-down me-3"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    ></i>
                                    <i className="fa-solid fa-arrow-up"
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
                                        <div className='btn btn-warning me-3 col-sm-4 col-12'
                                            onClick={() => handleEditUser(item)}
                                        >
                                            Edit
                                        </div>
                                        <div className='btn btn-danger col-sm-4 col-12'
                                            onClick={() => handleDeleteUser(item)}
                                        >Delete</div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>
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