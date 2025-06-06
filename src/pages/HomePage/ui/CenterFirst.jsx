import React from 'react';

const CenterFirst = () => {

    const [isBouncing, setIsBouncing] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsBouncing(prev => !prev);
        }, 2000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="w-full flex justify-center mb-[900px]">
            <div className="w-[1000px] flex flex-col gap-5">
                <p className="text-[30px] font-extrabold text-[#1B3C4D] pt-32">
                    Как это работает?
                </p>
                <p className="text-[60px] font-unbounded text-[#1B3C4D] uppercase">
                    Загрузи своё фото, <br/> и наш <br/>
                    AI про<span className="text-[#8296A6]">анализирует </span> твои
                    <span className="text-[#8296A6]"> черты лица </span> и определит типаж
                </p>
                <div className="relative w-full mt-5 flex justify-center">
                    <div className="absolute left-0 top-0">
                        <p className="text-[12px] uppercase border-x border-black px-4 py-2 rounded-2xl text-center">
                            <span className="font-bold">В подарок</span> ты получишь <br /> мини-гайд о своем <br /> типаже
                        </p>
                    </div>
                    <img className={`absolute transform ease-in-out duration-2000 ${isBouncing === true ? "-rotate-10 -top-[180px]" : "-rotate-7 -top-[170px]"}`} src="/photoes/main/Soplya2.png" alt="" />
                    <img className="absolute w-80 top-[130px]" src="/photoes/main/Mobilka.png" alt="" />
                    <div className="absolute top-80 right-10 w-52 h-32 rounded-full bg-[#90A3AB]/27 bg-opacity-20 backdrop-blur-md shadow-[0_0_60px_20px_rgba(144,163,171,0.4)] flex items-center justify-center">
                        <p className="text-[#1B3C4D] text-center text-[30px] font-semibold">
                            <span className="uppercase text-[12px] font-normal -ml-1">стоимость</span> <br /> 3990 Р
                        </p>
                    </div>
                    <img className="absolute w-[500px] top-[500px] left-20" src="/photoes/main/MiddleWoman.png" alt=""/>
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[850px] w-[240px] h-[50px] flex items-center justify-center rounded-full bg-[#23274B] text-white uppercase">
                        начать сейчас
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CenterFirst