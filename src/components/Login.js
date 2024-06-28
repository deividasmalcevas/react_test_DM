import React, { useState } from 'react';
import http from "../plugins/http";

const Login = () => {
    const [errors, setErrors] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flashError, setFlashError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            name: username,
            password: password
        };
        const response = await http.post('http://167.99.138.67:1111/login', loginData);
        if (!response.success) {
            setErrors(response.message);
            setFlashError(true);
            setTimeout(() => setFlashError(false), 1000);
        } else {
            localStorage.setItem('secretKey', response.secretKey);
            localStorage.setItem('user', username);
            window.location.href = '/';
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className={`mb-3 ${flashError ? 'flash' : ''}`} style={{ backgroundColor: "red", color: "white" }}>{errors}</div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
