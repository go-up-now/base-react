import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { FetchAllUser } from '../service/UserService';
import ReactPaginate from 'react-paginate';

const TableUser = () => {

    const [listUser, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    // const [totalPages, setTotalPages] = useState(0);

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

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>email</th>
                        <th>first_name</th>
                        <th>last_name</th>
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
        </>
    )
}

export default TableUser