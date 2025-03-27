import React, { useEffect, useState } from 'react';
import './Home.css';

import UserService from '../Service/UserService';

const Home = () => {
    const [username, setUsername] = useState('');
    const [referralCode, setReferralCode] = useState('');

    const isAuthenticated = UserService.isAuthenticated();
    useEffect(() => {
        setUsername(localStorage.getItem('username') || '');
        setReferralCode(localStorage.getItem('referralCode') || '');
    }, []);

    return (
      <>
        <div className="home-container">
            <header className="home-header">
                {isAuthenticated && <h1>Welcome to ReferEase, {username}!</h1>}
                <p>Your one-stop solution for Referral Management</p>
                {isAuthenticated && referralCode && <p>Your Referral Code: <strong>{referralCode}</strong></p>}
            </header>

            <section className="home-features">
                <h2>Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>Sign up</h3>
                        <p>Register or Login with your credentials</p>
                    </div>
                    <div className="feature-card">
                        <h3>Complete the profile</h3>
                        <p>Enter the details like first name, last name, number, etc...</p>
                    </div>
                    <div className="feature-card">
                        <h3>Referrals</h3>
                        <p>Get the details of the referrals and download the report in CSV format</p>
                    </div>
                </div>
            </section>

            <section className="home-guidelines">
                <h2>How to Use</h2>
                <div className="guidelines-container">
                    <p>Follow these simple steps to manage your referrals:</p>
                    <ol className="guidelines-list">
                        <li><span className="step-number">1.</span> Log in or Register to your account.</li>
                        <li><span className="step-number">2.</span> Enter any referral code if available.</li>
                        <li><span className="step-number">3.</span> Check "Referrals" for the details of your referrals.</li>
                        <li><span className="step-number">4.</span> Click on "Report" to download the referral report.</li>
                    </ol>
                </div>
            </section>
        </div>
        </>
    );
};

export default Home;
