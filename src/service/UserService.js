import axios from "./Customize-axios";

const FetchAllUser = () => {
    return axios.get('/api/users?page=2');
}

export { FetchAllUser };