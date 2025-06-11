import React from 'react';

const Footer = () => {
    return (
        <div className="relative w-full h-auto z-30">
            <div className="absolute top-0 left-0 w-full h-full bg-white"/>
            <div className="w-full lg:px-60 px-5 py-20 flex lg:flex-row lg:justify-between flex-col gap-5 relative">
                <div className="flex flex-col lg:justify-between gap-5 lg:min-h-[200px]">
                    <div className="flex flex-col lg:gap-10 gap-5">
                        <img src="/photos/main/MNEIDET_BLACK.svg" alt="" className="w-[150px]"/>
                        <p className="font-montserrat uppercase text-[20px] font-light">Email</p>
                    </div>
                    <p className="font-montserrat uppercase text-[12px] font-light">
                        ИП Трофимова Мария Андреевна<br/>ИНН 230115188508<br/>ОГРНИП 319237500065543
                    </p>
                </div>
                <div className="flex flex-col lg:justify-between gap-5 lg:min-h-[250px]">
                    <div className="flex flex-col gap-2">
                        <p className="font-montserrat  text-[16px] font-light cursor-pointer">Преимущества</p>
                        <p className="font-montserrat  text-[16px] font-light cursor-pointer">О сервисе</p>
                        <p className="font-montserrat  text-[16px] font-light cursor-pointer">Ответы на вопросы</p>
                        <p className="font-montserrat  text-[16px] font-light cursor-pointer">Результаты</p>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-5">
                        <img src="/photos/main/TG.png" alt="" />
                        <img src="/photos/main/YT.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="w-[90%] border-b border-black relative" />
            </div>

            <div className="w-full lg:px-60 px-5 pt-10 pb-20 flex lg:flex-row flex-col items-center justify-start lg:gap-16 gap-5 relative">
                <p className="font-montserrat text-[14px] font-light underline cursor-pointer">Условия использования</p>
                <p className="font-montserrat text-[14px] font-light underline cursor-pointer">Политика конфиденциальности</p>
            </div>

        </div>
    );
};

export default Footer;