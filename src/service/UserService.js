import axios from "./Customize-axios";

const FetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
    return axios.post('/api/users', { name, job })
}

const putUpdateUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`, { name, job })
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

const loginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

export { FetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginAPI };