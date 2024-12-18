import React, { useState, useEffect } from 'react';
import ContentsLayer from '../components/layout/ContentsLayer';
import styles from '../styles/calculator.module.css'
import { apis } from '../api/request'; 

const Calculator = ({ country }) => {
    const [stock, setStock] = useState('');
    const [initialInvestment, setInitialInvestment] = useState(0);
    const [initialDate, setInitialDate] = useState('');
    const [regularInvestment, setRegularInvestment] = useState(0);
    const [investmentCycle, setInvestmentCycle] = useState('monthly');
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [thiscountry, setThiscountry] = useState(country);

    const recommendedStocks = country == 'kr' ? ['삼성전자', 'SK하이닉스', 'LG에너지솔루션'] : ['엔비디아', '테슬라', '마이크로소프트', '애플'];
    const recommendedAmounts = country == 'kr' ? [50000, 100000, 1000000] : [50, 100, 1000];
    const recommendedRegularAmounts = country == 'kr' ? [10000, 50000, 100000] : [10, 50, 100];
    const currencySymbol = country === 'kr' ? '원' : '달러';

    const temp = 'current country : ' + country
    console.log(temp)

    useEffect(() => {
        resetState();
        setThiscountry(country);
        console.log(thiscountry)
    }, [country]);

    useEffect(() => {
        if (showResult === false) {
            resetState();
        }
    }, [result, showResult]);

    const resetState = () => {
        setStock('');
        setInitialInvestment(0);
        setInitialDate('');
        setRegularInvestment(0);
        setInvestmentCycle('monthly');
        setResult(null);
        setShowResult(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you would handle the form submission, potentially calling an API or performing calculations
        console.log({ thiscountry, stock, initialInvestment, initialDate, regularInvestment, investmentCycle });
        
        const tickerMap = {
            "엔비디아" : "NVIDIA Corporation",
            "테슬라": "TSLA",
            "마이크로소프트": "MSFT",
            "애플": "AAPL"
        }

        let submissionStock = stock;


        if (thiscountry === 'us') {
            submissionStock = tickerMap[stock] || stock;
        }
    
        const formData = {
            country: thiscountry,
            company: submissionStock,
            initial_amount: parseInt(initialInvestment),
            initial_date: initialDate,
            additional_amount: regularInvestment ? parseInt(regularInvestment) : 0,
            frequency: investmentCycle
        };

        // API 호출
        fetch('http://newbstock.de.dev-cos.com/profit/submit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // 응답 데이터 처리
            setResult(data);
            setShowResult(true);
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleRecommendedStockClick = (recommendedStock) => {
        setStock(recommendedStock);
    };

    const handleRecommendedAmountClick = (amount) => {
        setInitialInvestment(prevInvestment => prevInvestment + amount);
    };

    const handleRecommendedRegularAmountClick = (amount) => {
        setRegularInvestment(prevInvestment => prevInvestment + amount);
    };

    const handleDateButtonClick = (months) => {
        const currentDate = new Date();
        const calculatedDate = new Date(currentDate.setMonth(currentDate.getMonth() - months));
        setInitialDate(calculatedDate.toISOString().split('T')[0]);
    };
 
     // frequency를 한글로 변환
     const frequencyMap = {
         "weekly": "주",
         "biweekly": "격주",
         "monthly": "월",
         "bimonthly": "격월"
     };

     
    const year = initialDate ? initialDate.substring(0, 4) : '';
    const month = initialDate ? initialDate.substring(5, 7) : '';
    const day = initialDate ? initialDate.substring(8, 10) : '';

    const i_inv = initialInvestment ? initialInvestment.toLocaleString(): initialInvestment;
    const r_inv = regularInvestment ? regularInvestment.toLocaleString(): regularInvestment;

    return (
            <ContentsLayer>
                {showResult ? (  // 조건부 렌더링을 통해 결과 페이지를 보여줌
                    <div className={styles.container}>
                    <h1>예상 수익률 결과 💸</h1>
                    <div className={styles.resultcontainer}>
                        <h3>{result.company} 주식에 {i_inv} {currencySymbol}을 {year}년 {month}월 {day}일에 투자하고, </h3>
                        <h3>{frequencyMap[result.frequency] || result.frequency} 마다 {r_inv} {currencySymbol}을 투자 했다면, 지금 수익률은... </h3>
                        <div className={styles.result}>
                            <div className={styles.r}>
                                <p className={styles.resultTitle}>총 보유 주식 수</p>
                                <p className={styles.resultValue}>{result.total_shares} 주</p>
                            </div>
                            <div className={styles.r}>
                                <p className={styles.resultTitle}>총 투자금 </p>
                                <p className={styles.resultValue}>{(result.total_investment ?? 0).toLocaleString()} {currencySymbol}</p>
                            </div>
                            <div className={styles.r}>
                                <p className={styles.resultTitle}>전체 손익금</p>
                                <p className={styles.resultValue}>{(result.total_profit_loss ?? 0).toLocaleString()} {currencySymbol}</p>
                            </div>
                        </div>
                        <button onClick={() => setShowResult(false)}>다시 계산하기</button>
                        <p className={styles.warning}>실제 결과와 차이가 있을 수 있습니다</p>
                     </div>
                </div>
            ) : (
             <div className={styles.calcontainer}>
                <h1 className={styles.h1}>만약 그 때 샀다면... 내 수익률은? 💸</h1>
                <div className={styles.formcontainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="stock">1. 종목 선택하기</label>
                        <div className={styles.stockInputContainer}>
                            <input
                                className={styles.input}
                                type="text"
                                id="stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                            <div className={styles.recommendedStocks}>
                                {recommendedStocks.map((recommendedStock, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={styles.recommendedStockButton}
                                        onClick={() => handleRecommendedStockClick(recommendedStock)}
                                    >
                                        {recommendedStock}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="initialInvestment">2. 최초 투자 금액 설정하기</label>
                        <div className={styles.priceInputContainer}>
                            <input
                                className={styles.input}
                                type="number"
                                id="initialInvestment"
                                value={initialInvestment}
                                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                                required
                            />
                            <div className={styles.recommendedAmounts}>
                                {recommendedAmounts.map((amount, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={styles.recommendedAmountButton}
                                        onClick={() => handleRecommendedAmountClick(Number(amount))}
                                    >
                                        {amount.toLocaleString()}{currencySymbol}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="initialDate">3. 최초 투자 날짜 선택하기</label>
                        <div className={styles.dateContainer}>
                            <input
                                className={styles.input}
                                type="date"
                                id="initialDate"
                                value={initialDate}
                                onChange={(e) => setInitialDate(e.target.value)}
                                required
                            />
                            <div className={styles.dateButtons}>
                                <button
                                    type="button"
                                    onClick={() => handleDateButtonClick(6)}
                                    className={styles.dateButton}
                                >6개월 전</button>
                                <button
                                    type="button"
                                    onClick={() => handleDateButtonClick(12)}
                                    className={styles.dateButton}
                                >1년 전</button>
                                <button
                                    type="button"
                                    onClick={() => handleDateButtonClick(36)}
                                    className={styles.dateButton}
                                >3년 전</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="regularInvestment">+ 추가 선택: 정기 분할 매수 투자금</label>
                        <div className={styles.priceInputContainer}>
                        <input
                            className={styles.input}
                            type="number"
                            id="regularInvestment"
                            value={regularInvestment}
                            onChange={(e) => setRegularInvestment(Number(e.target.value))}
                        />
                        <div className={styles.recommendedAmounts}>
                                {recommendedRegularAmounts.map((amount, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={styles.recommendedAmountButton}
                                        onClick={() => handleRecommendedRegularAmountClick(Number(amount))}
                                    >
                                        {amount.toLocaleString()}{currencySymbol}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="investmentCycle">투자 주기:</label>
                        <select
                            className={styles.select}
                            id="investmentCycle"
                            value={investmentCycle}
                            onChange={(e) => setInvestmentCycle(e.target.value)}
                        >
                            <option value="weekly">매주</option>
                            <option value="biweekly">격주</option>
                            <option value="monthly">매달</option>
                            <option value="bimonthly">격달</option>
                        </select>
                    </div>
                    <button className={styles.button} type="submit">계산하기</button>
                </form>
                </div>
            </div>
            )}
        </ContentsLayer>

    );
};

export default Calculator;
