import React from 'react';

const WhyMain = () => {
    return (
        <div className="w-full flex justify-center mt-40">
            <div className="w-[1000px] flex flex-col gap-5">
                <p className="text-[30px] font-unbounded text-[#1B3C4D] pt-32">
                    Почему стоит выбирать <br/>
                    MNE IDET?
                </p>
                <div className="w-full flex flex-col gap-[10px] bg-[#90A3AB]/37 shadow-[0_0_60px_20px_rgba(144,163,171,0.5)]">
                    <div className="w-full rounded-xl h-[109px] bg-white flex items-center justify-between px-10">
                        <p className="uppercase"> <span className="text-[#8296A6] font-semibold">Индивидуальность </span> вместо трендов и шаблонов</p>
                        <img className="w-5" src="/photos/main/Subtract.svg" alt="" />
                    </div>
                    <div className="w-full rounded-xl h-[109px] bg-white flex items-center justify-between px-10">
                        <p className="uppercase"> Акцент на <span className="text-[#8296A6] font-semibold"> природных </span> достоинствах </p>
                        <img className="w-5" src="/photos/main/Subtract.svg" alt="" />
                    </div>
                    <div className="w-full rounded-xl h-[109px] bg-white flex items-center justify-between px-10">
                        <p className="uppercase"> <span className="text-[#8296A6] font-semibold"> Экономия </span> времени и денег </p>
                        <img className="w-5" src="/photos/main/Subtract.svg" alt="" />
                    </div>
                    <div className="w-full rounded-xl h-[109px] bg-white flex items-center justify-between px-10">
                        <p className="uppercase"> Легкий и <span className="text-[#8296A6] font-semibold"> эффективный </span> шоппинг </p>
                        <img className="w-5" src="/photos/main/Subtract.svg" alt="" />
                    </div>
                </div>
                <div className="w-full flex justify-center mt-40">
                    <div className="w-[240px] h-[50px] flex items-center justify-center rounded-full bg-[#23274B] text-white uppercase">
                        узнать свой типаж
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyMain;