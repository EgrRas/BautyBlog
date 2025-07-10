import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {$authHost} from "../../app/indexAPI.js";
import {LK} from "../../app/routes/constans.js";

const WhereMoney = () => {
    const [step, setStep] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    const nav = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    //-----------API

    const getInfo = async () => {
        try {
            const response = await $authHost.get("style/info");
            return { status: response.status, data: response.data };
        } catch (error) {
            if (error.response) {
                return { status: error.response.status };
            } else {
                console.log("Unexpected error:", error);
                return { status: 500 };
            }
        }
    };

    const getLink = async () => {
        try {
            const response = await $authHost.get("payment/link");
            return response.data;
        } catch (error) {
            console.log(error);
            return { status: ":(" };
        }
    }

    const payNotify = async () => {
        try {
            const response = await $authHost.post("payment/notify");
            return response;
        } catch (error) {
            console.error("PayNotify error:", error);
            throw error;
        }
    };

    const payInfo = async () => {
        try {
            const response = await $authHost.get("payment/info");
            return { status: response.status, data: response.data };
        } catch (error) {
            if (error.response) {
                return { status: error.response.status };
            } else {
                console.log("Unexpected error:", error);
                return { status: 500 };
            }
        }
    };

    //-------------

    const getPaymentStatus = async () => {
        setIsLoading(true);
        try {
            const response = await getInfo();

            if (response.status === 403) {
                setStep(1);
                return { step: 1 };
            } else if (response.status === 404 || response.status === 200) {
                nav(LK);
            } else {
                setStep(0);
                return { step: 0 };
            }
        } finally {
            setIsLoading(false);
        }
    };


    const getPayment = async () => {
        const response = await getLink();
        if (response && response.link) {
            window.location.href = response.link;
        } else {
            setError(true);
        }
    };

    let pollingActive = false; // глобальная переменная или вынеси в useRef, если нужно

    const paymentCheck = async () => {
        if (pollingActive) {
            console.warn("Polling already in progress. Skipping new call.");
            return;
        }

        pollingActive = true;
        setIsLoading(true);
        setError(false);

        try {
            const notifyResponse = await payNotify();

            if (!notifyResponse || ![200, 204].includes(notifyResponse.status)) {
                throw new Error(`Notify failed with status: ${notifyResponse?.status}`);
            }

            let attempts = 0;
            const maxAttempts = 20;
            const interval = 1000;
            let intervalId;

            const poll = async () => {
                try {
                    const info = await payInfo();

                    if (!info || typeof info.status !== "number") {
                        throw new Error("Invalid payInfo structure");
                    }

                    console.log(`Polling attempt ${attempts + 1}/${maxAttempts}, status: ${info.status}`);

                    if ([200, 204].includes(info.status)) {
                        clearInterval(intervalId);
                        pollingActive = false;
                        nav(LK);
                    } else if (++attempts >= maxAttempts) {
                        clearInterval(intervalId);
                        pollingActive = false;
                        setError(true);
                    }
                } catch (err) {
                    console.error("Polling error:", err);
                    clearInterval(intervalId);
                    pollingActive = false;
                    setError(true);
                } finally {
                    setIsLoading(false);
                }
            };

            // Делаем первый вызов с небольшой задержкой — чтобы не обгонять refresh
            setTimeout(() => {
                poll();
                intervalId = setInterval(poll, interval);
            }, 1000);

            return () => {
                if (intervalId) clearInterval(intervalId);
                pollingActive = false;
            };
        } catch (error) {
            console.error("Payment check failed:", error);
            setIsLoading(false);
            setStep(1);
            setError(true);
            pollingActive = false;
        }
    };

    useEffect(() => {
        let cleanup;

        const checkAndPoll = async () => {
            const info = await getPaymentStatus();
            if (info?.step === 0 || status !== "ok") return;
            cleanup = await paymentCheck();
        };

        checkAndPoll();

        return () => {
            if (typeof cleanup === "function") cleanup();
        };
    }, [status]);

    return (
        <div className="w-full h-screen relative">
            <img
                src="/photos/LK/WomanLK.png"
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white opacity-70" />

            {isLoading && (
                <div className="absolute w-full top-[30%] flex flex-col gap-5 items-center justify-center">
                    <img src="/photos/LK/Krutilcka.svg" alt="" className="w-48"/>
                    <p className="text-center text-[#1B3C4D] font-light font-montserrat text-[14px] uppercase">еще пару мгновений,<br />
                        проверяем оплату...</p>
                </div>
            )}

            {step === 0 && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-end lg:gap-6 gap-3 text-[#1B3C4D] lg:h-[75%] h-[60%] max-w-md px-6 w-full">
                        <button
                            className="w-full bg-[#1B3C4D] py-5 rounded-2xl"
                            onClick={() => nav("/login")}
                        >
                            <p className="uppercase font-unbounded font-light text-[14px] text-white">
                                Войти
                            </p>
                        </button>
                        <button
                            className="w-full py-5 rounded-2xl border border-[#1B3C4D]"
                            onClick={() => nav("/register")}
                        >
                            <p className="uppercase font-unbounded font-light text-[14px] text-[#1B3C4D]">
                                Зарегистрироваться
                            </p>
                        </button>
                        <div className="w-full flex justify-center mt-7">
                            <img
                                src="/photos/Auth/Register/cross-svgrepo-com.svg"
                                className="w-8 cursor-pointer"
                                alt=""
                                onClick={() => nav("/")}
                            />
                        </div>
                    </div>
                </div>
            )}

            {step === 1 && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-between lg:gap-6 gap-3 text-[#1B3C4D] lg:h-[75%] h-[60%] max-w-md px-6 w-full relative">
                        <p className="text-[25px] font-unbounded lg:font-medium font-thin lg:text-left text-center uppercase w-full">
                            оплатите доступ <br /> к сервису
                        </p>

                        <p className="text-[15px] font-montserrat lg:font-medium lg:block hidden font-normal uppercase lg:text-left text-center w-full">
                            наш AI проанализирует черты лица <br />
                            и определит типаж
                        </p>

                        <p className="text-[12px] font-montserrat lg:font-medium lg:hidden font-normal uppercase lg:text-left text-center w-full">
                            наш <span className="font-medium">AI</span> проанализирует черты лица <br />
                            и определит типаж
                        </p>

                        <div className="border-x border-[#1B3C4D] lg:block hidden rounded-2xl p-3 text-center w-full">
                            <p className="uppercase text-[15px] text-[#1B3C4D]">
                                В подарок ты получишь мини-гайд <br />
                                о своем типаже
                            </p>
                        </div>

                        <div className="border-x border-[#1B3C4D] lg:hidden rounded-2xl p-3 text-center w-full">
                            <p className="uppercase font-normal text-[12px] text-[#1B3C4D]">
                                <span className="font-medium">В подарок </span> ты получишь мини-гайд <br />
                                о своем типаже
                            </p>
                        </div>

                        <p className="text-[#1B3C4D] font-medium text-[30px] font-unbounded">
                            3990 ₽
                        </p>
                        <div className="flex items-start gap-3 w-full">
                            <img
                                className={`w-5 cursor-pointer ${isActive ? "hidden" : "block"}`}
                                src="/photos/Auth/Register/Checkbox.svg"
                                alt=""
                                onClick={() => setIsActive(!isActive)}
                            />
                            <img
                                className={`w-5 cursor-pointer ${isActive ? "block" : "hidden"}`}
                                src="/photos/Auth/Register/CheckboxActive.svg"
                                alt=""
                                onClick={() => setIsActive(!isActive)}
                            />
                            <a className="font-montserrat text-[10px] font-normal text-[#1B3C4D] uppercase leading-tight cursor-pointer" href="https://mneidet.com/privacy/">
                                Я согласен с условиями <br className="lg:block hidden"/>
                                лицензионного <br className="lg:hidden"/> соглашения
                            </a>
                        </div>
                        <div className="w-full relative">
                            <button
                                className="w-full bg-[#1B3C4D] py-5 rounded-2xl disabled:opacity-50"
                                disabled={!isActive}
                                onClick={() => getPayment()}
                            >
                                <p className="uppercase font-unbounded font-light text-[14px] text-white">
                                    продолжить
                                </p>
                            </button>
                            {error && (
                                <p className={`absolute text-center w-full mt-5 text-red-500 uppercase text-[14px] font-medium`}>ошибка оплаты</p>
                            )}
                        </div>
                        <div className="text-center"></div>
                        <div className="w-full hidden lg:flex justify-center mt-7">
                            <img
                                src="/photos/Auth/Register/cross-svgrepo-com.svg"
                                className="w-8 cursor-pointer"
                                alt=""
                                onClick={() => nav("/")}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhereMoney;