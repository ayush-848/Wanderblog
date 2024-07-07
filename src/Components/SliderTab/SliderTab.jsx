import React, { useState } from 'react';
import styles from './SliderTab.module.css';


const SliderTab = () => {
    const [activeTab, setActiveTab]= useState(0);

    const tabs = [
        {
            image: '/src/assets/Logi_Dios.png',
            info: 'Info about tab 1',
        },
        {
            image: 'src/assets/TS_GLUTTONY_NIMURU_02.png',
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

    const handleTabClick= (index) => {
        setActiveTab(index);
    }

    return (
        <div className= {styles.slider_tab}>
            <button className= {styles.prev_btn} onClick={goToPrevTab}>Prev</button>

            <div className= {styles.tab_content}>
                <div className= {styles.tab_image}>
                    <img src= {tabs[activeTab].image} alt={`Tab ${activeTab +1}`}/>
                </div>

                <div className= {styles.tab_info}>
                    <h2> Tab {activeTab + 1}</h2>
                    <p> {tabs[activeTab].info} </p>
                </div>

            </div>
            <button className= {styles.next_btn} onClick={goToNextTab}>Next</button>

            
        </div>
    );
};

export default SliderTab;