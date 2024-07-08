import React, { useState } from 'react';
import styles from './SliderTab.module.css';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { FaArrowAltCircleRight } from 'react-icons/fa';

const SliderTab = () => {
    const [activeTab, setActiveTab]= useState(0);

    const tabs = [
        {
            image: '/src/assets/Egypt.jpeg',
            info: 'Info about tab 1',
        },
        {
            image: 'src/assets/France.jpg',
            info: 'Info about tab 1',
        },
        {
            image: 'src/assets/Indonesia.jpg',
            info: 'Info about tab 1',
        },
        {
            image: 'src/assets/Japan.jpg',
            info: 'Info about tab 1',
        },
        {
            image: 'src/assets/Singapore.jpg',
            info: 'Info about tab 1',
        },
        {
            image: 'src/assets/Spain.jpg',
            info: 'Info about tab 1',
        },
        {
            image: 'src/assets/Srilanka.png',
            info: 'Info about tab 1',
        },
        {
            image: 'src/assets/Switzerland.jpeg',
            info: 'Info about tab 1',
        },
    ];

    const goToPrevTab = () => {
        const newIndex = (activeTab - 1 + tabs.length) % tabs.length;
        setActiveTab(newIndex);
    };

    const goToNextTab = () => {
        const newIndex = (activeTab + 1) % tabs.length;
        setActiveTab(newIndex);
    };

    return (
        <div className= {styles.slider_tab}>
            <button className= {styles.prev_btn} onClick={goToPrevTab}>
                <FaArrowAltCircleLeft style={{fontSize: '25px'}} />
            </button>

            <div className= {styles.tab_content}>
                <div className= {styles.tab_image}>
                    <img src= {tabs[activeTab].image} alt={`Tab ${activeTab +1}`}/>
                </div>

                <div className= {styles.tab_info}>
                    <h2> Tab {activeTab + 1}</h2>
                    <p> {tabs[activeTab].info} </p>
                </div>

            </div>
            <button className= {styles.next_btn} onClick={goToNextTab}>
                <FaArrowAltCircleRight style={{fontSize: '25px'}} />
            </button>

            
        </div>
    );
};

export default SliderTab;