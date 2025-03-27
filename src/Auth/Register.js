import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import Loader from '../Components/Loader';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'USER',
        referrer: ''
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');

        try {
            const registerResponse = await UserService.register(formData);
            if (registerResponse.data.statusCode === 200) {
                const loginResponse = await UserService.login(formData.username, formData.password);
                localStorage.setItem('token', loginResponse.token);
                localStorage.setItem('role', "USER");

                localStorage.setItem('username', registerResponse.data.user.username);
                localStorage.setItem('referralCode', registerResponse.data.user.referralCode);

                
                setResponseMessage("User Registered and Logged In Successfully");
                setIsSuccess(true);

                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    role: 'USER',
                    referrer: ''
                });

                setTimeout(() => {
                    setLoading(false);
                    navigate('/home');
                }, 1000);
            }
            else{
                setResponseMessage(registerResponse.data.error);
                setIsSuccess(false);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setResponseMessage(error.response?.data?.error || "An error occurred while registering the user");
            setIsSuccess(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>*Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>*Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>*Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Referral Code(Optional)</label>
                        <input
                            type="text"
                            name="referrer"
                            value={formData.referrer}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit">Register</button>
                    {responseMessage && (
                        <p className={`response-message ${isSuccess ? 'success' : 'error'}`}>
                            {responseMessage}
                        </p>
                    )}
                </form>
            </div>
        </>
    );
}

export default Register;
