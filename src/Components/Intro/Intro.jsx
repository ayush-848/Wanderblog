import React from 'react';
import videoSrc from '../../assets/Intro_video.mp4';
import styles from './Intro.module.css';

const Intro = () => {
  return (
    <div className={styles.introContainer}>
      <div className={styles.videoTextContainer}>
        <div className={styles.videoWrapper}>
          <video autoPlay loop muted className={styles.backgroundVideo}>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles.textOverlay}>
          <h1 className={`${styles.fadeInText} ${styles.fadeInTextTitle}`}>Welcome Adventurer</h1>
          <p className={`${styles.fadeInText} ${styles.fadeInTextTitle2}`}>
            We are wanderers from heart forever chasing the horizon. 
            The whisper of faraway lands always attracts us. 
            Share you your chronicles here, 
            not just as mere guides, but as invitations
          </p>
        </div>
      </div>
      <div className={styles.aboutSection}>
        <h1>About Us</h1>
        <p>We are a community of passionate travelers and adventurers. Our mission is to inspire and guide fellow explorers on their journeys across the globe. Whether you're a seasoned globetrotter or planning your first trip, we're here to share experiences, tips, and stories that will fuel your wanderlust.</p>
      </div>
    </div>
  );
};

export default Intro;