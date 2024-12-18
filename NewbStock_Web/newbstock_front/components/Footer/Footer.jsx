import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <strong className={styles.title}>Newbstock</strong>
            <p className={styles.desc}>
                주린이들을 위한 주식 정보 제공 서비스 프로젝트 입니다.
            </p>
            <dl className={styles.name_list}>
                <dt>상원 2팀 : </dt>
                <dd className={styles.name}>유준상</dd>
                <dd className={styles.name}>주경연</dd>
                <dd className={styles.name}>이승준</dd>
                <dd className={styles.name}>안중현</dd>
            </dl>
        </footer>
    );
}

export default Footer
