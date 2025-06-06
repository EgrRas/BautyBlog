import React from 'react';
import TopMain from "./ui/TopMain.jsx";
import CenterFirst from "./ui/CenterFirst.jsx";
import WhyMain from "./ui/WhyMain.jsx";
import Carusel from "./ui/Carusel.jsx";

const HomePage = () => {
    return (
        <div>
            <TopMain />
            <CenterFirst />
            <WhyMain />
            <Carusel />
        </div>
    );
};

export default HomePage;