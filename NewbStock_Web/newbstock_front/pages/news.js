import React, { useEffect, useState } from 'react';
import ContentsLayer from '../components/layout/ContentsLayer';
import styles from '../styles/news.module.css'
import { apis } from '../api/request';

const News = ({ country }) => {
    const [riseData, setRiseData] = useState([]);
    const [dropData, setDropData] = useState([]);
    
    const kr_up_news_list = [
        {
            name: "유한양행",
            title: "글로벌 변동성 커질 때 홀로 웃은 바이오주",
            originallink: "https://www.dt.co.kr/contents.html?article_no=2024080702101563060001&ref=naver",
            link: "https://n.news.naver.com/mnews/article/029/0002893303?sid=101",
            description: "5일 외국인 순매수 상위 종목에는 알테오젠(390억원), 삼천당제약(270억원), 삼성바이오로직스(270억원), 리가켐바이오(190억원), 펩트론(180억원), <b>유한양행</b>(160억원) 등 바이오 종목이 대거 포진했다. 증권가에서도 바이오... ",
            pubDate: "Tue, 06 Aug 2024 19:50:00 +0900"
        },
        {
            name: "삼성바이오로직스",
            title: "외인 기관, 삼성전자 7천억원 매도...코스피, 외인 기관 매도에...",
            originallink: "https://www.getnews.co.kr/news/articleView.html?idxno=687191",
            link: "https://www.getnews.co.kr/news/articleView.html?idxno=687191",
            description: "LG에너지솔루션과 <b>삼성바이오로직스</b> 현대차 <b>삼성</b>SDI 등도 4%대의 상승률을 나타내며 지수 상승을 견인했다. 업종별로는  의료정밀이 6%대 오르며 가장 큰 폭으로 상승했고, 화학과 기계, 운수장비가 5%대 오름세로... ",
            pubDate: "Tue, 06 Aug 2024 15:56:00 +0900"
        },
        {
            name: "한화에어로스페이스",
            title: "창원시의회, 호주 질롱시 시장단과 교류",
            originallink: "http://www.gnnews.co.kr/news/articleView.html?idxno=559413",
            link: "http://www.gnnews.co.kr/news/articleView.html?idxno=559413",
            description: "협정을 체결하고 지속적인 교류를 이어오고 있다. 현재 <b>한화에어로스페이스</b>가 질롱시에 대규모 장갑차 생산시설을 건설하고 있다. 이은수기자 eunsu@gnnews.co.kr 호주 질롱시 시장단 방문. 호주 질롱시 시장단 방문.",
            pubDate: "Tue, 06 Aug 2024 21:22:00 +0900"
        },
    ];
    const kr_down_news_list = [
        {
            name: "삼성중공업",
            title: "창업도시 부산…亞 '스타트업 허브'로 도약",
            originallink: "https://www.hankyung.com/article/2024080658841",
            link: "https://n.news.naver.com/mnews/article/015/0005018875?sid=102",
            description: "이번 바운스에는 <b>삼성중공업</b>, 롯데건설 등 국내 대기업 및 중견기업 23곳이 참여를 확정 지었다. 지난해 이 행사에선 16개 대기업 및 중견기업이 60곳의 스타트업을 만나 직접 투자를 결정하거나, 스타트업이 보유한... ",
            pubDate: "Tue, 06 Aug 2024 18:43:00 +0900"
        },
        {
            name: "HD현대",
            title: "&quot;HD<b>현대건설기계</b>, 하반기는 실적 성장세가 나타날 전망&quot;",
            originallink: "https://www.insightkorea.co.kr/news/articleView.html?idxno=206727",
            link: "https://www.insightkorea.co.kr/news/articleView.html?idxno=206727",
            description: "키움증권은 6일 HD<b>현대건설기계</b>에 대해 2분기 영업이익은 586억원으로 컨센서스를 하회했다고 전했다. 이한결 키움증권 연구원은 &quot;HD<b>현대건설기계</b>의 2분기 매출액은 전년 동기대비 17.4% 줄어든 8530억원, 영업이익은 39.3... ",
            pubDate: "Tue, 06 Aug 2024 14:48:00 +0900"
        },
        {
            name: "HMM",
            title: "30대그룹 CEO 평균 연령 58.2세 [경제 레이더]",
            originallink: "http://www.segye.com/newsView/20240806519631?OutUrl=naver",
            link: "https://n.news.naver.com/mnews/article/022/0003957714?sid=101",
            description: "이어 포스코그룹 62.1세, CJ그룹 61.5세, 중흥건설 61.0세, GS그룹 60.9세, 영풍그룹 60.7세, 농협그룹 60.4세, <b>HMM</b> 60세 순이었다. CEO 평균 연령 상승 폭이 가장 큰 곳은 LS그룹으로, 계열사 CEO 15명의 평균 연령이 지난해... ",
            pubDate: "Tue, 06 Aug 2024 20:08:00 +0900"
        },
    ];
    const us_up_news_list = [
        {
            name: "Toyota",
            title: "2024년 영국 자동차산업 정보",
            originallink: "http://dream.kotra.or.kr/kotranews/cms/news/actionKotraBoardDetail.do?SITE_NO=3&MENU_ID=200&CONTENTS_NO=1&bbsGbn=403&bbsSn=403&pNttSn=217853",
            link: "http://dream.kotra.or.kr/kotranews/cms/news/actionKotraBoardDetail.do?SITE_NO=3&MENU_ID=200&CONTENTS_NO=1&bbsGbn=403&bbsSn=403&pNttSn=217853",
            description: "자동차 산업은 영국 경제의 중요한 산업 중 하나로, 영국 자동차산업협회(Society of <b>Motor</b> Manufacturers... 도요타(<b>Toyota</b>) 등이 있다. 영국의 대표적인 상용 자동차 기업으로는 레이랜드 트럭(Leyland Trucks), LEVC... ",
            pubDate: "Fri, 02 Aug 2024 17:05:00 +0900"
        },
        {
            name: "Eli Lilly and Company",
            title: "목마른 '바이오텍 펀딩' 이제 살아날까",
            originallink: "https://www.kpanews.co.kr/article/show.asp?idx=252482&category=D",
            link: "https://www.kpanews.co.kr/article/show.asp?idx=252482&category=D",
            description: "마이릭스 바이오 (Myricx Bio) - 투자금액: 1억 1,400만 달러 - 시리즈: 시리즈 A - 투자시기: 7월 8일 - 투자회사: Abingworth, Novo Holdings, 영국 정부의 경제 개발 은행, <b>Eli Lilly</b>, 창립 투자자인 Brandon Capital과 Sofinnova... ",
            pubDate: "Tue, 06 Aug 2024 12:34:00 +0900"
        },
        {
            "name": "Caterpillar Inc.",
            "title": "대모, 주가 급등…우크라-러시아 협상 소식에 재건 기대감↑",
            "originallink": "http://www.thebigdata.co.kr/view.php?ud=20240725045944318cd1e7f0bdf_23",
            "link": "http://www.thebigdata.co.kr/view.php?ud=20240725045944318cd1e7f0bdf_23",
            "description": "혜인은 중장비·엔진·부품 수입 판매업체로 세계적인 건설기계 제조업체 캐터필라(<b>Caterpillar</b>), 멧초(Metso), 융하인리히(Jungheinrich), 버미어(Vermeer) 등의 제품을 국내 독점 판매하고 있어 굴착기, 불도저 등 건설기계 공급에... ",
            "pubDate": "Thu, 25 Jul 2024 05:00:00 +0900"
        },
    ];
    const us_down_news_list = [
        {
            name: "NVIDIA Corporation",
            title: "Calming the shocks from Black Monday",
            originallink: "https://koreajoongangdaily.joins.com/news/2024-08-06/opinion/editorials/Calming-the-shocks-from-Black-Monday/2107242",
            link: "https://n.news.naver.com/mnews/article/640/0000057385?sid=110",
            description: "The markets are hurriedly factoring in a recession scenario from the softening economic data on top of disappointing news from big-tech majors like <b>Nvidia</b> whose new AI chips are expected to be... ",
            pubDate: "Tue, 06 Aug 2024 20:19:00 +0900"
        },
        {
            name: "Eaton Corporation plc",
            title: "신유빈·안세영 등 팀 삼성 갤럭시 선수들, 선수촌 내 삼성 올림픽 체험관 방...",
            originallink: "https://www.siminilbo.co.kr/news/newsview.php?ncode=1160288144613276",
            link: "https://www.siminilbo.co.kr/news/newsview.php?ncode=1160288144613276",
            description: "(Jagger <b>Eaton</b>, 미국, 스케이트보드) 등 여러 선수들이 올림픽 선수촌 내 삼성 올림픽 체험관을 방문했다.... 미국의 재거 이튼(Jagger <b>Eaton</b>, 스케이트보드) 선수는 &quot;'삼성 올림픽 체험관'에서 팀 삼성 갤럭시 선수들과 함께... ",
            pubDate: "Tue, 06 Aug 2024 16:48:00 +0900"
        },
        {
            name: "Broadcom Inc.",
            title: "[특징주] 센서뷰, 장 초반 상한가… 브로드컴에 케이블 조립체 공급",
            originallink: "http://www.wolyo.co.kr/news/articleView.html?idxno=244864",
            link: "http://www.wolyo.co.kr/news/articleView.html?idxno=244864",
            description: "업게에서는 센서뷰의 주가 급등과 관련해 오늘 오전 센서뷰 측이 글로벌 반도체 기업 브로드컴(<b>Broadcom</b>)에 고주파 RF 계측 및 측정용 케이블 조립체를 공급할 예정이라고 밝힌 영향으로 분석하고 있다. 센서뷰는... ",
            pubDate: "Tue, 06 Aug 2024 10:42:00 +0900"
        },
    ];
    // const calender = {
    //     'Jan' : '01',
    //     'Feb' : '02',
    //     'Mar' : '03',
    //     'Apr' : '04',
    //     'May' : '05',
    //     'Jun' : '06',
    //     'Jul' : '07',
    //     'Aug' : '08',
    //     'Sep' : '09',
    //     'Oct' : '10',
    //     'Nov' : '11',
    //     'Dec' : '12',
    // };

    // let country_code = country;
    // if (country == 'us')
    //     country_code = 'EN';
    
    // const up_ticker_list = ['000100', '207940', '012450']
    // const down_ticker_list = ['010140', '267250', '011200']
    
    // useEffect(() => {
    //     // apis.getNewsTop3Upticker(country_code)
    //     //     .then(response => {
    //     //         const data = response.data;
    //     //         const temp_list = [];
    //     //         for(let i = 0; i < 3; i++) temp_list.push(data[i].ticker)
    //     //         setRiseData(temp_list);
    //     //     })
    //     //     .catch(error => {
    //     //         console.error("Error fetching news data:", error);
    //     // });
    //     apis.getNewsTop3Downticker(country_code)
    //         .then(response => {
    //             const data = response.data;
    //             const temp_list = [];
    //             for(let i = 0; i < 3; i++) temp_list.push(data[i].ticker)
    //             setDropData(temp_list);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching news data:", error);
    //     });
    //     for(let i = 0; i < 3; i++) {
    //         apis.getNewsTop3(country_code, up_ticker_list[i]).then(response => {
    //             const data = response.data;
    //             let temp_dict = {};
    //             let date;
    //             temp_dict['name'] = data[0].name;
    //             temp_dict['title'] = data[0].title;
    //             temp_dict['link'] = data[0].link;
    //             date = data[0].pubDate.split(' ');
    //             const year = date[3];
    //             const month = calender[date[2]];
    //             const day = date[1];
    //             temp_dict['date'] = year + '.' + month + '.' + day
    //         })
    //         .catch(error => {
    //             console.error("Error fetching news data:", error);
    //         })
    //     };
    // }, []);
    const truncateDescription = (description) => {
        return description.length >50 ? description.substring(0, 50) + "..." : description;
    };
    return (
        <ContentsLayer>
            <div className={styles.newscontainer}>
            <h1 className={styles.h1}>실시간 주요 뉴스 TOP3</h1>
                <div className={styles.contentscontainer}>
                    <h2>많이 오른 종목 📈</h2>
                    <ul className={styles.nncontainer}>
                        {country == 'kr' && kr_up_news_list.map((it, index) => (
                            <li key={index} className={styles.ncontainer}>
                                <h3>{it.name}</h3>
                                <div className={styles.risenews}>
                                    <a href={it.link} className={styles.newsLink} target="_blank" rel="noopener noreferrer">
                                        <h4 className={styles.headline}>{it.title}</h4>
                                        <p className={styles.description}>{truncateDescription(it.description)}</p>
                                        <br />
                                        <p className={styles.date}>{it.pubDate.slice(0, -9)}</p>
                                    </a>
                                </div>
                            </li>
                        ))}
                        {country == 'us' && us_up_news_list.map((it, index) => (
                            <li key={index} className={styles.ncontainer}>
                                <h3>{it.name}</h3>
                                <div className={styles.risenews}>
                                    <a href={it.link} className={styles.newsLink} target="_blank" rel="noopener noreferrer">
                                        <h4 className={styles.headline}>{it.title}</h4>
                                        <p className={styles.description}>{truncateDescription(it.description)}</p>
                                        <br />
                                        <p className={styles.date}>{it.pubDate.slice(0, -9)}</p>
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                    <div className={styles.contentscontainer}>
                        <h2>많이 내린 종목 📉</h2>
                        <ul className={styles.nncontainer}>
                        {country == 'kr' && kr_down_news_list.map((it, index) => (
                            <li key={index} className={styles.ncontainer}>
                                <h3>{it.name}</h3>
                                <div className={styles.dropnews}>
                                    <a href={it.link} className={styles.newsLink} target="_blank" rel="noopener noreferrer">
                                        <h4 className={styles.headline}>{it.title}</h4>
                                        <p className={styles.description}>{truncateDescription(it.description)}</p>
                                        <br />
                                        <p className={styles.date}>{it.pubDate.slice(0, -9)}</p>
                                    </a>
                                </div>
                            </li>
                        ))}
                        {country == 'us' && us_down_news_list.map((it, index) => (
                            <li key={index} className={styles.ncontainer}>
                                <h3>{it.name}</h3>
                                <div className={styles.dropnews}>
                                    <a href={it.link} className={styles.newsLink} target="_blank" rel="noopener noreferrer">
                                        <h4 className={styles.headline}>{it.title}</h4>
                                        <p className={styles.description}>{truncateDescription(it.description)}</p>
                                        <br />
                                        <p className={styles.date}>{it.pubDate.slice(0, -9)}</p>
                                    </a>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </div>
            </div>
        </ContentsLayer>

    )
    
}

export default News;