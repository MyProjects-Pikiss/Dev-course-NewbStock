import React, { useEffect, useState } from 'react';
import ContentsLayer from '../components/layout/ContentsLayer';
import styles from '../styles/news.module.css'
import axios from 'axios';

const Test = ({ country }) => {

    const riseData = [
        {
            stock: [
                {
                    name: "유한양행",
                    title: "글로벌 변동성 커질 때 홀로 웃은 바이오주",
                    originallink: "https://www.dt.co.kr/contents.html?article_no=2024080702101563060001&ref=naver",
                    link: "https://n.news.naver.com/mnews/article/029/0002893303?sid=101",
                    description: "5일 외국인 순매수 상위 종목에는 알테오젠(390억원), 삼천당제약(270억원), 삼성바이오로직스(270억원), 리가켐바이오(190억원), 펩트론(180억원), <b>유한양행</b>(160억원) 등 바이오 종목이 대거 포진했다. 증권가에서도 바이오... ",
                    pubDate: "Tue, 06 Aug 2024 19:50:00 +0900"
                },
                {   
                    name: "유한양행",
                    title: "글로벌 변동성 커질 때 홀로 웃은 바이오주",
                    originallink: "https://www.dt.co.kr/contents.html?article_no=2024080702101563060001&ref=naver",
                    link: "https://n.news.naver.com/mnews/article/029/0002893303?sid=101",
                    description: "5일 외국인 순매수 상위 종목에는 알테오젠(390억원), 삼천당제약(270억원), 삼성바이오로직스(270억원), 리가켐바이오(190억원), 펩트론(180억원), <b>유한양행</b>(160억원) 등 바이오 종목이 대거 포진했다. 증권가에서도 바이오... ",
                    pubDate: "Tue, 06 Aug 2024 19:50:00 +0900"
                },
                {
                    name: "유한양행",
                    title: "글로벌 변동성 커질 때 홀로 웃은 바이오주",
                    originallink: "https://www.dt.co.kr/contents.html?article_no=2024080702101563060001&ref=naver",
                    link: "https://n.news.naver.com/mnews/article/029/0002893303?sid=101",
                    description: "5일 외국인 순매수 상위 종목에는 알테오젠(390억원), 삼천당제약(270억원), 삼성바이오로직스(270억원), 리가켐바이오(190억원), 펩트론(180억원), <b>유한양행</b>(160억원) 등 바이오 종목이 대거 포진했다. 증권가에서도 바이오... ",
                    pubDate: "Tue, 06 Aug 2024 19:50:00 +0900"
                }
            ],
        }
    ]
    const truncateDescription = (description) => {
        return description.length >50 ? description.substring(0, 50) + "..." : description;
    };

    return (
        <ContentsLayer>
            <div className={styles.newscontainer}>
            <h1 className={styles.h1}>실시간 주요 뉴스 TOP3</h1>
                {riseData.map((section, index) => (
                    <div key={index} className={styles.contentscontainer}>
                        <h2>많이 오른 종목 📈</h2>
                        <div className={styles.nncontainer}>
                            {section.stock.map((stock, stockIndex) => (
                                <div key={stockIndex} className={styles.ncontainer}>
                                    <h3>{stockIndex + 1}. {stock.name}</h3>
                                    <div className={styles.risenews} >
                                    <a href={stock.link} className={styles.newsLink} target="_blank" rel="noopener noreferrer">
                                        <h4 className={styles.headline}>{stock.title}</h4>
                                        <p className={styles.description}>{truncateDescription(stock.description)}</p>
                                        <br />
                                        <p className={styles.date}>{stock.pubDate.slice(0, -9)}</p>
                                    </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ContentsLayer>

    )
    
}

export default Test;