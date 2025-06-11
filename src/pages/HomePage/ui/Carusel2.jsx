import React from 'react';

const Carusel2 = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center mt-32 bg-black overflow-hidden">
            <div className="w-full max-w-[1000px] z-10 py-32">
                <p className="text-[25px] font-unbounded font-bold text-white leading-tight w-2/3">
                    Присоединяйтесь к тысячам людей,
                    которые уже нашли свой уникальный
                    стиль с SuitesMe
                </p>
            </div>
            <div className="w-full pb-32 overflow-hidden">
                <div
                    className="flex flex-row"
                    style={{
                        width: 'calc(3 * 3 * 320px)', // 3 картинки * 3 раза по 320px ширина примерно
                        animation: 'scrollLeft 15s linear infinite',
                    }}
                >
                    {[...Array(3)].map((_, i) =>
                        [1, 2, 3].map((n) => (
                            <img
                                key={`${i}-${n}`}
                                className="h-80 w-[1020px] object-cover"
                                src="/photos/main/Circulation.png"
                                alt=""
                            />
                        ))
                    )}
                </div>
            </div>

            <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
        </div>
    );
};

export default Carusel2;