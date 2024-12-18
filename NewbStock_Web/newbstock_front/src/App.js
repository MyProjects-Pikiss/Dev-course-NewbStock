import React, { useState, useEffect } from 'react';
import CommonLayer from '../components/layout/CommonLayer';
import InnerWrapper from '../components/layout/InnerWrapper';
import ContentsLayer from '../components/layout/ContentsLayer';
import Header from '../components/Header/Header'
import SideBar from '../components/SideBar/SideBar'
import styles from './App.css'


const App = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <CommonLayer>
            <Header />
            <InnerWrapper>
                <div style={{ display: 'flex' }}>
                    <SideBar />
                    <ContentsLayer>
                    <div className="project-container">
                            <div className="project-description">
                                <h2>데브코스 데이터 엔지니어링 3기 최종 프로젝트</h2>
                                <p>NewbStock은 주식 데이터의 실시간 처리와 배치 처리를 통해 데이터 파이프라인을 구성하여 주식에 대한 다양한 정보를 제공합니다</p>
                                <p>실시간 급락 종목에 관한 뉴스에서부터 만약 과거에 투자했다면 얻을 수 있는 과거 수익률, 주린이를 위한 모든 정보까지</p> 
                                <p>아래 사용 예시 동영상을 시청해보세요!</p>
                            </div>
                        {isClient && (
                            <video className="project-video" controls>
                            <source src="/videos/video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                    </ContentsLayer>
                </div>
            </InnerWrapper>
        </CommonLayer>
    );
};

export default App;
