import axios from "axios";

const FetchAllUser = () => {
    return axios.get('https://reqres.in/api/users?page=2');
}

export { FetchAllUser };