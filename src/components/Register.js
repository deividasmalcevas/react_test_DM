import React, { useState } from 'react';
import http from "../plugins/http";
const Register = () => {
    const [errors, setErrors] = useState('');
    const [username, setUsername] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [flashError, setFlashError] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();

        if (passwordOne !== passwordTwo) {
            setErrors('Passwords do not match');
            setFlashError(true);
            setTimeout(() => setFlashError(false), 1000);
            return;
        }
        const userData = {
            name: username,
            passwordOne: passwordOne,
            passwordTwo: passwordTwo
        };
        const response = await http.post('http://167.99.138.67:1111/createaccount', userData);
        if (!response.success) {
            setErrors(response.message);
            setFlashError(true);
            setTimeout(() => setFlashError(false), 1000);
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Register</h5>
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username"
                                           placeholder="Enter username" value={username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordOne" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="passwordOne"
                                           placeholder="Enter password" value={passwordOne}
                                           onChange={(e) => setPasswordOne(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordTwo" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="passwordTwo"
                                           placeholder="Confirm password" value={passwordTwo}
                                           onChange={(e) => setPasswordTwo(e.target.value)}/>
                                </div>
                                <div className={`mb-3 ${flashError ? 'flash' : ''}`}
                                     style={{backgroundColor: "red", color: "white"}}>{errors}</div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;