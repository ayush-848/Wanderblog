import React from 'react';
import styles from './DashBoard.module.css';

const DashBoard = () => {

    return (
        <div className={styles.container}>
            <div class={styles.container_1}>
                <div className={styles.account_Info}>
                    <div className={styles.account_img}>
                        <img src="" alt="acc.img" />
                    </div>
                    <p id="message">Good Evening</p>
                    <div className={styles.account_details}>
                        <h1 className={styles.account_name}>NAME</h1>
                        <p className={styles.account_email}>name@gmail.com</p>
                        <p className={styles.account_number}>+91-46614696471</p>
                        <p className={styles.account_last_login}>TIME</p>

                        <button className={styles.account_update}>Edit Profile</button>

                        <p id="profile-status">Profile completion : 100%</p>

                        <div className={styles.progress_bar}></div>
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.history}>
                        <h3>History:</h3>
                        <p>his1</p>
                        <p>his2</p>
                        <p>his3</p>
                    </div>
                    <div className={styles.wishlist}>
                        <h3>wishlist:</h3>
                        <p>list</p>
                        <p>list</p>
                        <p>list</p>
                    </div>
                    <div className={styles.SavedAddress}>
                        <h3>SavedAddress:</h3>
                        <p>address</p>
                        <p>address</p>
                        <p>address</p>
                    </div>
                    <div className={styles.payment}>
                        <h3>payment:</h3>
                        <p>VISA</p>
                        <p>ICO</p>
                        <p>HIRF</p>
                    </div>
                    <div className={styles.recent_activities}>
                        <h3>Recent-Activities:</h3>
                        <p>login: 01/01/24</p>
                        <p>visited: </p>
                    </div>
                    <div className={styles.Notifications}>
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