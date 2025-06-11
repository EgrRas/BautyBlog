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
                    className="flex"
                    style={{
                        width: '200%',
                        animation: 'scrollLeft 30s linear infinite',
                    }}
                >
                    {/* Один набор картинок */}
                    {[1, 2, 3].map((n) => (
                        <img
                            key={`a-${n}`}
                            className="h-80 w-[100vw] object-cover"
                            src="/photos/main/Circulation.png"
                            alt=""
                        />
                    ))}
                    {/* Повтор того же набора */}
                    {[1, 2, 3].map((n) => (
                        <img
                            key={`b-${n}`}
                            className="h-80 w-[100vw] object-cover"
                            src="/photos/main/Circulation.png"
                            alt=""
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </div>
    );
};

export default Carusel2;