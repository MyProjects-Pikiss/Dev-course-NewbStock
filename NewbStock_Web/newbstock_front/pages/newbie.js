import React, { useState, useEffect } from 'react';
import ContentsLayer from '../components/layout/ContentsLayer';
import styles from '../styles/newbie.module.css';
import NewbieContent from '../components/NewbieContent/NewbieContent';
import { apis } from '../api/request';

const Newbie = () => {
    const [rateChange, setRateChange] = useState('stock'); // 선택된 옵션 상태
    const [dates, setDates] = useState([]); // 날짜 목록 상태 추가
    const [selectedDate, setSelectedDate] = useState(''); // 사용자가 선택한 날짜
    const [stockData, setStockData] = useState([]);
    const [dynamicData, setDynamicData] = useState(null); // 선택된 데이터

    // 시총 상위 3개 종목 데이터를 가져옴
    useEffect(() => {
        if (selectedDate) {
            apis.getStockDataByDate(selectedDate)
                .then(response => {
                    setStockData(response.data); // 시총 상위 3개 종목 데이터 설정
                })
                .catch(error => {
                    console.error('Error fetching stock data:', error);
                });
        }
    }, [selectedDate]);

    // rateChange가 변경될 때마다 데이터를 가져옴
    useEffect(() => {
        if (!selectedDate) return;

        let fetchData;
        switch (rateChange) {
            case 'biweekly':
                fetchData = apis.getKospiDataByDate(selectedDate);
                break;
            case 'exchange_rate':
                fetchData = apis.getExchangeDataByDate(selectedDate);
                break;
            case 'news':
                fetchData = apis.getNewsSentimentDataByDate(selectedDate);
                break;
            case 'interest':
                fetchData = apis.getInterestRatesDataByDate(selectedDate);
                break;
            default:
                return;
        }

        fetchData
            .then(response => {
                setDynamicData(response.data);
            })
            .catch(error => {
                console.error(`Error fetching ${rateChange} data:`, error);
            });
    }, [rateChange, selectedDate]);

    // 고변동 데이터 가져오기
    useEffect(() => {
        apis.getHighChangeDates()
            .then(response => {
                setDates(response.data);
                if (response.data.length > 0) {
                    setSelectedDate(response.data[0].date); // 기본으로 첫 번째 날짜를 선택
                }
            })
            .catch(error => {
                console.error('Error fetching high change dates:', error);
            });
    }, []);

    // 차트 제목을 동적으로 설정
    const getChartTitle = () => {
        switch (rateChange) {
            case 'stock':
                return '주식 변동 차트';
            case 'biweekly':
                return 'KOSPI 지수 차트';
            case 'exchange_rate':
                return '환율 차트';
            case 'news':
                return '뉴스 심리지수 차트';
            case 'interest':
                return '금리 지수 차트';
            default:
                return '';
        }
    };

    return (
        <ContentsLayer>
            {/* 날짜 선택 섹션 */}
            <div className={styles.date_selector}>
                <select
                    className={styles.select}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    <option value="">날짜 선택</option>
                    {dates.map((item, index) => (
                        <option key={index} value={item.date}>
                            {item.name} - {item.date} - {item.change}%
                        </option>
                    ))}
                </select>
            </div>

            {/* 고정된 시총 상위 3개 종목 차트 */}
            <div className={styles.chart_section}>
                <h3 className={styles.chart_title}>현재 시총 top3</h3>
                <div className={styles.gridContainer}>
                    {stockData.map((stock, index) => (
                        <div key={index} className={styles.gridItem}>
                            <NewbieContent data={stock} type="stocktop3" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 선택에 따라 변하는 차트 */}
            <div className={styles.chart_section}>
                <div className={styles.title_area}>
                    <select
                        className={styles.select}
                        id="RateChange"
                        value={rateChange}
                        onChange={(e) => setRateChange(e.target.value)}
                    >
                        <option value="stock">주식</option>
                        <option value="biweekly">KOSPI 지수</option>
                        <option value="exchange_rate">환율</option>
                        <option value="news">뉴스심리지수</option>
                        <option value="interest">금리지수</option>
                    </select>
                </div>
                <h3 className={styles.chart_title}>{getChartTitle()}</h3>
                {dynamicData && <NewbieContent data={dynamicData} type={rateChange} />}
            </div>
        </ContentsLayer>
    );
};

export default Newbie;
