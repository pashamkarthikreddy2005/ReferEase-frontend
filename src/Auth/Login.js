import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import Loader from '../Components/Loader';
import './Login.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await UserService.login(username, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                
                localStorage.setItem('username', userData.username);
                localStorage.setItem('referralCode', userData.referralCode);
                setLoading(true);

                setTimeout(() => {
                    setLoading(false);
                    if (userData.role === "USER") {
                        navigate('/home');
                    } else {
                        navigate('/Agenthome');
                    }
                }, 1000);
            } else {
                setError(userData.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login.');
            console.log(err);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <>
            {loading ? ( 
                <Loader />
            ) : (
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            )}
        </>
    );
}

export default LoginPage;
