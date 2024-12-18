import React, { useState, useEffect } from 'react';
import CommonLayer from '../components/layout/CommonLayer';
import InnerWrapper from '../components/layout/InnerWrapper';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SideBar from '../components/SideBar/SideBar';
import '../styles/global.css';


const App = ({ Component, pageProps }) => {
    const [isClient, setIsClient] = useState(false);
    const [country, setCountry] = useState('kr')

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <CommonLayer>
            <Header
                country={country}
                setCountry={setCountry}
            />
            <SideBar />
            <InnerWrapper>    
                <Component
                    {...pageProps}
                    isClient={isClient}
                    country={country}
                />
                <Footer />
            </InnerWrapper>
        </CommonLayer>
    );
};

export default App;
