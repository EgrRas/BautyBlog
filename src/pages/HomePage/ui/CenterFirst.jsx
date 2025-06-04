import React from 'react';

const CenterFirst = () => {
    return (
        <div className="w-full flex justify-center ">
            <div className="w-[1000px] flex flex-col gap-5">
                <p className="text-[30px] font-extrabold text-[#1B3C4D] pt-32">
                    Как это работает?
                </p>
                <p className="text-[60px] font-unbounded text-[#1B3C4D] uppercase">
                    Загрузи своё фото, <br/> и наш <br/>
                    AI про<span className="text-[#8296A6]">анализирует </span> твои
                    <span className="text-[#8296A6]"> черты лица </span> и определит типаж
                </p>
            </div>
        </div>
    );
};

export default CenterFirst