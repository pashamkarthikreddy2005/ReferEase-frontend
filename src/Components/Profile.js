import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Loader from './Loader';

function Profile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        skills: '',
        address: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // 🔄 Loader state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'withCredentials': true
                }
            });

            if (response.status === 200) {
                setIsSuccess(true);
                setResponseMessage('Profile updated successfully!');
                
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            setIsSuccess(false);
            setResponseMessage('Error updating profile. Please try again.');
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <>
            {loading && <Loader />} {/* Show Loader while loading */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Complete'}
                </button>

                {responseMessage && (
                    <p className={`response-message ${isSuccess ? 'success' : 'error'}`}>
                        {responseMessage}
                    </p>
                )}
            </form>
        </>
    );
}

export default Profile;
