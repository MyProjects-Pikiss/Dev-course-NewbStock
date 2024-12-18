import React, { useEffect, useState } from 'react';
import ContentsLayer from '../components/layout/ContentsLayer';
import styles from '../styles/news.module.css'
import { apis } from '../api/request';

const TT = ({ country }) => {
    const [riseData, setRiseData] = useState([]);
    
    useEffect(() => {
        
        const tCountry = country === 'us' ? 'en' : country;
        apis.getUpTicker(tCountry)
            .then(response => {
                const data = response.data;
                setRiseData(data);
            })
    }, [country]);

    return (
        <ContentsLayer>
            <div className={styles.newscontainer}>
            <h1 className={styles.h1}>실시간 주요 뉴스 TOP3</h1>
                    <div className={styles.contentscontainer}>
                        <h2>많이 오른 종목 📈</h2>
                        <p>{riseData}</p>
                    </div>

            </div>
        </ContentsLayer>

    )
    
}

export default TT;