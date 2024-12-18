import React, { useState } from 'react';
import ContentsLayer from '../components/layout/ContentsLayer';
import styles from '../styles/result.module.css'


const Result = ({ country }) => {

    const result = {
        company: "삼성전자",
        initial_amount: 1000000,
        initial_date: "2020-01-01",
        additional_amount: 500000,
        frequency: "monthly",
        total_shares: 3867.1975858539568,
        total_investment: 258000000,
        total_profit_loss: 37840615
    }

    // 년, 월, 일 추출
    const year = result.initial_date.substring(0, 4);
    const month = result.initial_date.substring(5, 7);
    const day = result.initial_date.substring(8, 10);

    // frequency를 한글로 변환
    const frequencyMap = {
        "weekly": "주",
        "biweekly": "격주",
        "monthly": "월",
        "bimonthly": "격월"
    };

    const frequencyKorean = frequencyMap[result.frequency] || result.frequency;

    return (
            <ContentsLayer>
                <div className={styles.container}>
                    <h1>예상 수익률 결과 💸</h1>
                    <div className={styles.resultcontainer}>
                        <h3>{result.company} 주식에 {result.initial_amount} 원을  {year}년 {month}월 {day}일에 투자하고, </h3>
                        <h3>{frequencyKorean} 마다 {result.additional_amount} 원을 투자 했다면, 지금 수익률은... </h3>
                        <div className={styles.result}>
                            <div className={styles.r}>
                                <p className={styles.resultTitle}>총 보유 주식 수</p>
                                <p className={styles.resultValue}>{result.total_shares.toFixed(2)} 주</p>
                            </div>
                            <div className={styles.r}>
                                <p className={styles.resultTitle}>총 투자금 </p>
                                <p className={styles.resultValue}>{result.total_investment.toLocaleString()} 원</p>
                            </div>
                            <div className={styles.r}>
                                <p className={styles.resultTitle}>전체 손익금</p>
                                <p className={styles.resultValue}> {result.total_profit_loss.toLocaleString()} 원</p>
                            </div>
                        </div>
                        <button onClick={() => setShowResult(false)}>다시 계산하기</button>
                        <p className={styles.warning}>실제 결과와 차이가 있을 수 있습니다</p>
                     </div>
                </div>
        </ContentsLayer>

    );
};

export default Result;


