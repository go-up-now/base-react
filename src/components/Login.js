import './assets/Login.scss'
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { loginAPI } from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const { loginContext } = useContext(UserContext)

    let navigate = useNavigate();

    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     if (token)
    //         navigate('/')
    // }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('email or password not empty!')
            return;
        }
        setLoading(true)
        let response = await loginAPI(email.trim(), password);
        if (response && response.token) {
            loginContext(email, response.token);
            navigate('/')
        }
        else {
            if (response && response.status === 400) {
                toast.error(response.data.error)
            }
        }
        setLoading(false)
    }

    const handleGoBack = () => {
        navigate('/')
    }

    const handleSubmit = (e) => {
        if (e && e.key === 'Enter')
            handleLogin();
    }

    return (
        <>
            <div className="login-container col-md-4">
                <div className="title-login text-center fs-4 fw-bold">Log in</div>
                <label className='fw-bold'>Username or email (eve.holt@reqres.in)</label>
                <input
                    placeholder="Email or email"
                    value={email}
                    className='p-2 '
                    onChange={e => setemail(e.target.value)}
                ></input>
                <div className='input-password'>
                    <input
                        type={login ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        className='p-2 '
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => handleSubmit(e)}
                    ></input>
                    <i
                        className={login ? "fa-solid fa-eye eye" : "fa-solid fa-eye-slash eye"}
                        onClick={() => setLogin(!login)}
                    ></i>
                </div>
                <button
                    className={email && password ? 'action btn-login' : 'btn-login'}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}
                >
                    {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                    &nbsp;Log in</button>
                <div className='text-center go-back'> <i className="fa-solid fa-angles-left"></i>
                    <span onClick={handleGoBack}>&nbsp;Go back</span>
                </div>
            </div>
        </>
    )
}

export default Login;