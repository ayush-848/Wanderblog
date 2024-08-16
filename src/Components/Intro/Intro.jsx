import React from 'react';
import videoSrc from '../../assets/Intro_video.mp4';
import styles from './Intro.module.css'; // Import SCSS module for styling

const Intro = () => {
  return (
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
  );
};

export default Intro;
