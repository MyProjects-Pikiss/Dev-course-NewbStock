import React from 'react';
import styles from './Layout.module.css';

const InnerWrapper = ({ children }) => {
    return (
        <div className={styles.innerwrapper}>
            {children}
        </div>
    );
};

/*
function InnerWrapper(props) {
    return (
        <div className={styles.wrap}>
            {props.children}
        </div>
    );
}
*/

export default InnerWrapper;
