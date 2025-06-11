import React from 'react';
import TopMain from "./ui/TopMain.jsx";
import CenterFirst from "./ui/CenterFirst.jsx";
import WhyMain from "./ui/WhyMain.jsx";
import Carusel from "./ui/Carusel.jsx";
import Qwestions from "./ui/Qwestions.jsx";
import Carusel2 from "./ui/Carusel2.jsx";
import Flower from "./ui/Flower.jsx";

const HomePage = () => {
    return (
        <div>
            <TopMain />
            <CenterFirst />
            <WhyMain />
            <Carusel />
            <Qwestions />
            <Carusel2 />
            <Flower />
        </div>
    );
};

export default HomePage;