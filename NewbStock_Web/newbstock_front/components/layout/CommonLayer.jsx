import React from 'react';
import styles from './Layout.module.css';

const CommonLayer = ({ children }) => {
    return (
        <div className={styles.commonlayer}>
            {children}
        </div>
    );
};

/*
function CommonLayer(props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>        
    );
}
*/

export default CommonLayer
