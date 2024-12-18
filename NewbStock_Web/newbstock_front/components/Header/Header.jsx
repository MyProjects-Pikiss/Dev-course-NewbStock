import React, {useState} from 'react';
import styles from './Header.module.css';

export default function Header({ setCountry }) {
    const [isCheck, setCheck] = useState(true);

    const changeToKO = () => {
        setCountry('kr');
        setCheck(true);
    };
    const changeToUS = () => {
        setCountry('us');
        setCheck(false);
    };
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <a href="/" className={styles.home_link}>
                    <span className="blind">Newbstock</span>
                </a>
            </h1>
            <nav>
                <ul className={styles.country_list}>
                    <li className={styles.item}>
                        <button className={[styles.link, isCheck && styles.active].join(" ")} onClick={changeToKO}>국내</button>
                    </li>
                    <li className={styles.item}>
                        <button className={[styles.link, !isCheck && styles.active].join(" ")} onClick={changeToUS}>미국</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
