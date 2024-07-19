import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { FetchAllUser } from '../service/UserService';

const TableUser = () => {

    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        let response = await FetchAllUser();
        if (response && response.data)
            setListUser(response.data)
    }

    return (
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
    )
}

export default TableUser