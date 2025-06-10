import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const clients = [
    "photos/main/womans/Woman1.png",
    "photos/main/womans/Woman2.png",
    "photos/main/womans/Woman3.png",
    "photos/main/womans/Woman4.png",
    "photos/main/womans/Woman5.png",
];

const Carusel = () => {
    return (
        <div className="w-full flex justify-center mt-32 px-4">
            <div className="w-full max-w-[1000px]">
                <p className="text-[40px] lg:text-[53px] font-unbounded font-light uppercase text-[#1B3C4D] leading-tight">
                    Клиенты, которые уже работают по системе{" "}
                    <span className="text-[#8296A6] font-medium">MNE IDET</span>
                </p>

                <p className="text-[12px] uppercase pt-10">
                    Нажмите на фото, чтобы посмотреть кейс
                </p>



                <div className="mt-10 relative pb-24">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation={{
                            nextEl: ".swiper-next",
                            prevEl: ".swiper-prev",
                        }}
                        pagination={{
                            el: ".swiper-pagination",
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className} inline-block w-4 h-4 mx-1 rounded-full !bg-black transition-all duration-300"></span>`;
                            },
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1.2 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                    >
                        {clients.map((src, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={src}
                                    alt={`client-${index}`}
                                    className="rounded-3xl w-full h-[400px] object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="swiper-next absolute -right-20 top-[45%] -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center cursor-pointer bg-white">
                        <img className="w-full" src="/photos/main/NextButton.png" />
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="swiper-pagination absolute border-2 border-black bottom-2 left-0 w-full flex justify-center z-10" />
                    </div>

                    <p className="absolute top-[420px] left-10 text-[12px] underline cursor-pointer">
                        Смотреть больше фото
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Carusel;