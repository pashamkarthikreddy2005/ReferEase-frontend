import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Referrals.css';

function Referrals() {
    const navigate = useNavigate();
    const [referrals, setReferrals] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getReferrals`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'withCredentials': true
                    }
                });

                if (response.status === 200) {
                    setReferrals(response.data);
                    setIsSuccess(true);
                    setResponseMessage('Referrals fetched successfully!');
                }
            } catch (error) {
                setIsSuccess(false);
                setResponseMessage('Error fetching Referrals. Please try again.');
            }
        };

        fetchReferrals();
    }, []);

    return (
        <div>
            <h2>Referrals</h2>

            {responseMessage && (
                <p className={`response-message ${isSuccess ? 'success' : 'error'}`}>
                    {responseMessage}
                </p>
            )}

            <div>
                {referrals.length > 0 ? (
                    <ul>
                        {referrals.map((referral) => (
                            <li key={referral.id}>
                                User ID: {referral.id} - Username: {referral.username} - Email: {referral.email} - 
                                Profile Status: {referral.isProfileCompleted ? 'Completed' : 'Pending'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No referrals found.</p>
                )}
            </div>
        </div>
    );
}

export default Referrals;
