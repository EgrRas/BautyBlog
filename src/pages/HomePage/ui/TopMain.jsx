import React from 'react';

const TopMain = () => {

    const [isBouncing, setIsBouncing] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsBouncing(prev => !prev);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-auto relative bg-white">
            <img className="w-full h-full z-0 object-center top-0" src="/photos/main/main-top.webp" alt="" />
            <div className="backdrop-blur-xl z-10 w-full lg:h-[130px] h-[60px] absolute top-0 left-0 flex flex-row items-center justify-between !px-20">
                <img className="w-[110px]" src="/photos/main/MNEIDET.svg" alt="" />
                <div className="lg:flex flex-row xl:gap-[35px] gap-[20px] items-center justify-end hidden">
                    <button className="font-montserrat font-medium text-[16px] text-white whitespace-nowrap">Преимущества</button>
                    <button className="font-montserrat font-medium text-[16px] text-white whitespace-nowrap">О сервисе</button>
                    <button className="font-montserrat font-medium text-[16px] text-white whitespace-nowrap">Ответы на вопросы</button>
                    <button className="font-montserrat font-medium text-[16px] text-white whitespace-nowrap">Примеры результатов</button>
                    <button className="px-3 py-2 rounded-full !border text-[16px] !border-white uppercase text-white font-unbounded">войти</button>
                </div>
            </div>
            <div className="absolute z-10 top-36 left-[20%] w-[250px]">
                <p className="font-normal font-unbounded xl:text-[40px] text-[30px] uppercase text-white">
                    Узнай, что тебе действи-<br/> тельно идёт
                </p>
                <p className="font-normal mt-5 text-[12px] w-[217px] text-center uppercase text-white border-x border-white px-3 py-2 rounded-2xl">
                    Наш искусственный интеллект анализирует черты лица и определяет типаж по системе
                    <span className="block font-semibold">MNE IDET</span>
                </p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[85%] w-[240px] h-[50px] flex items-center justify-center rounded-full bg-[#23274B] text-white uppercase">
                Узнай свой типаж
            </div>
            <img className={`absolute z-20 left-0 transform ease-in-out duration-2000 ${isBouncing === true ? "top-[10%]" : "top-[5%]" }`} src="/photos/main/Soplya.png" alt=""/>
            <img className={`absolute z-20 right-0 transform ease-in-out duration-2000 ${isBouncing === true ? "top-[0%]" : "-top-[5%]" }`} src="/photos/main/Soplya3.png" alt=""/>

        </div>
    );
};

export default TopMain;