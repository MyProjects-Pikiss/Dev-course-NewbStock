import React from 'react';
import ContentsLayer from '../components/layout/ContentsLayer';
import '../styles/index.module.css'

export default function Home({ isClient }) {
    return (
        <ContentsLayer>
            <div className="project-container">
                <div className="project-description">
                    <h2>데브코스 데이터 엔지니어링 3기 최종 프로젝트</h2>
                    <p>NewbStock은 주식 데이터의 실시간 & 배치 처리로 데이터 파이프라인을 구성하여 주식에 대한 다양한 정보를 제공합니다</p>
                    <p>실시간 급락 종목 뉴스에서부터 만약 과거에 투자했다면 얻을 수 있는 수익률 계산기, 주린이를 위한 모든 정보까지!</p> 
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
    );
}