import './assets/Login.scss'
import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)

    return (
        <>
            <div className="login-container col-md-4">
                <div className="title-login text-center fs-4 fw-bold">Log in</div>
                <label className='fw-bold'>Email or Username</label>
                <input
                    placeholder="Email or Username"
                    value={username}
                    className='p-2 '
                    onChange={e => setUsername(e.target.value)}
                ></input>
                <div className='input-password'>
                    <input
                        type={login ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        className='p-2 '
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                    <i
                        className={login ? "fa-solid fa-eye eye" : "fa-solid fa-eye-slash eye"}
                        onClick={() => setLogin(!login)}
                    ></i>
                </div>
                <button
                    className={username && password ? 'action btn-login' : 'btn-login'}
                    disabled={username && password ? false : true}
                >Log in</button>
                <div className='text-center'> <i class="fa-solid fa-angles-left"></i> Go back</div>
            </div>
        </>
    )
}

export default Login;