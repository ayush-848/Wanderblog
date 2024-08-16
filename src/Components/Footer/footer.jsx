import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './footer.module.css'; // Import the CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid_container}>

        <div className={styles.logo_col}>
          <img src="/src/assets/travel.png" className={styles.logo} alt="Wanderblog Logo" />
        </div>

        <div className={styles.office_col}>
          <h3>Office 
            <div className={styles.underline}><span></span></div>
          </h3>
          <div className= {styles.office_details}>
            <p>Office Lane</p>
            <p>Melarmath</p>
            <p className={styles.email_id}>xyz@yahoo.com</p>
            <h4>+91 - 0123456789</h4>
          </div>
        </div>

        <div className={styles.links_col}>
          <h3>Links 
            <div className={styles.underline}><span></span></div>
          </h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contacts</a></li>
            <li><a href="/">Suggestions</a></li>
          </ul>
        </div>

        <div className={styles.newsletter_col}>
          <h3>Newsletter 
            <div className={styles.underline}><span></span></div>
          </h3>
          <form>
            <i className="fa-regular fa-envelope"></i>
            <input type="email" placeholder=" Enter your email id" required />
            <button type="submit"><i className="fa-solid fa-arrow-right"></i></button>
          </form>

          <div className={styles.social_icons}>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-snapchat"></i>
          </div>

        </div>
      </div>
      <hr />

      <p className={styles.copyright}> &copy; WanderBlog &#8482; 2024 - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;