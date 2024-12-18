import React from 'react';
import styles from './Layout.module.css';

const ContentsLayer = ({ children }) => {
    return (
        <div className={styles.contentslayer}>
            {children}
        </div>
    );
};

/*
function ContentsLayer(props) {
    return (
        <section className={styles.content}>
            {props.children}
        </section>        
    );
}
"""
*/

export default ContentsLayer;
