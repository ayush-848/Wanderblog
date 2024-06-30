import React from 'react';
import './DashBoard.css';

const DashBoard = () => {


    return (
        <div class="container">
            <div class="container-1">
                <div className="account-Info">
                    <div className="account-img">
                        <img src="" alt="acc.img" />
                    </div>
                    <p id="message">Good Evening</p>
                    <div className="account-details">
                        <h1 className="account-name">NAME</h1>
                        <p className="account-email">name@gmail.com</p>
                        <p className="account-number">+91-46614696471</p>
                        <p className="account-last-login">TIME</p>

                        <button className="account-update">Edit Profile</button>

                        <p id="profile-status">Profile completion : 100%</p>

                        <div className="progress-bar"></div>
                    </div>
                </div>
                <div className="details">
                    <div className="history">
                        <h3>History:</h3>
                        <p>his1</p>
                        <p>his2</p>
                        <p>his3</p>
                    </div>
                    <div className="wishlist">
                        <h3>wishlist:</h3>
                        <p>list</p>
                        <p>list</p>
                        <p>list</p>
                    </div>
                    <div className="SavedAddress">
                        <h3>SavedAddress:</h3>
                        <p>address</p>
                        <p>address</p>
                        <p>address</p>
                    </div>
                    <div className="payment">
                        <h3>payment:</h3>
                        <p>VISA</p>
                        <p>ICO</p>
                        <p>HIRF</p>
                    </div>
                    <div className="recent-activities">
                        <h3>Recent-Activities:</h3>
                        <p>login: 01/01/24</p>
                        <p>visited: </p>
                    </div>
                    <div className="Notifications">
                        <h3>Notification:</h3>
                        <p>Profile updated:</p>
                        <p>New saved address: </p>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default DashBoard;