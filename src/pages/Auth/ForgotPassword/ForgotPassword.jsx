import React, {useRef, useState} from 'react';

const ForgotPassword = () => {

    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const isEmailReady = (email) => {
        if (email.length >= 1) setStep(1);
        else alert("Please enter a valid email");
    };

    const handleCodeChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value) {
            if (index < code.length - 1) {
                inputRefs.current[index + 1]?.focus();
            } else {
                const newCode = [...code];
                newCode[index] = value;

                if (newCode.every(c => c !== '')) {
                    setStep(2);
                }
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div>
            {step === 0 && (
                <div className="w-full min-h-screen flex justify-center items-center">
                    <div className="sm:w-[400px] w-full sm:p-0 p-5 h-[780px]">
                        <div className="w-full h-full flex flex-col justify-between gap-10">
                            <div className="w-full flex flex-col gap-10 relative">
                                <div className="md:hidden flex flex-row items-center justify-between w-full">
                                    <img src="/photos/Auth/Back.svg" alt="" className="cursor-pointer"/>
                                    <img src="/photos/Auth/Star.svg" alt="" />
                                </div>

                                <img className="md:block hidden absolute -left-20" src="/photos/Auth/Back.svg" alt=""/>

                                <p className="font-unbounded text-left md:uppercase font-medium text-[20px]">забыли пароль?</p>
                                <p className="uppercase text-[10px] font-medium font-montserrat w-full text-[#607E96]">не волнуйтесь! такое случается. Пожалуйста, введите адрес электронной почты , связанный с вашей учетной записью.</p>
                                <div className="w-full flex flex-col gap-2">
                                    {[
                                        { label: "email" }
                                    ].map(({ label }) => (
                                        <div key={label} className="w-full flex flex-col gap-1">
                                            <p className="uppercase font-montserrat text-[12px] font-medium text-[#1B3C4D]">{label}</p>
                                            <input className="border-b px-3 py-2 rounded-2xl" onInput={(e) => setEmail(e.currentTarget.value)}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-10">
                                <button className="w-full bg-[#1B3C4D] py-5 rounded-2xl">
                                    <p className="uppercase font-unbounded font-light text-white" onClick={() => isEmailReady(email)}>отправить</p>
                                </button>
                                <div className="w-full flex justify-center">
                                    <img src="/photos/Auth/Register/cross-svgrepo-com.svg" className="w-8 cursor-pointer" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step === 1 && (
                <div className="w-full min-h-screen flex justify-center items-center">
                    <div className="sm:w-[400px] w-full sm:p-0 p-5 h-[780px]">
                        <div className="w-full h-full flex flex-col justify-between gap-10">
                            <div className="w-full flex flex-col gap-10 relative">
                                <div className="md:hidden flex flex-row items-center justify-between w-full">
                                    <img src="/photos/Auth/Back.svg" alt="" className="cursor-pointer"/>
                                    <img src="/photos/Auth/Star.svg" alt="" />
                                </div>

                                <img className="md:block hidden absolute -left-20" src="/photos/Auth/Back.svg" alt=""/>

                                <p className="font-unbounded text-left md:uppercase font-medium text-[20px]">пожалуйста, проверьте свою электронную почту</p>
                                <p className="uppercase text-[10px] font-medium font-montserrat w-full text-[#607E96]">мы отправили код по адресу {email}</p>

                                <div className="w-full flex justify-between gap-4">
                                    {code.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleCodeChange(e.target.value, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="w-full aspect-square text-center text-2xl font-bold rounded-2xl border border-gray-300 focus:border-black outline-none transition-all"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-10">
                                <button className="w-full bg-[#1B3C4D] py-5 rounded-2xl">
                                    <p className="uppercase font-unbounded font-light text-white">отправить</p>
                                </button>
                                <div className="w-full flex justify-center">
                                    <img src="/photos/Auth/Register/cross-svgrepo-com.svg" className="w-8 cursor-pointer" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="w-full min-h-screen flex justify-center items-center">
                    <div className="sm:w-[400px] w-full sm:p-0 p-5 h-[780px]">
                        <div className="w-full h-full flex flex-col justify-between gap-10">
                            <div className="w-full flex flex-col gap-10 relative">
                                <div className="md:hidden flex flex-row items-center justify-between w-full">
                                    <img src="/photos/Auth/Back.svg" alt="" className="cursor-pointer"/>
                                    <img src="/photos/Auth/Star.svg" alt="" />
                                </div>

                                <img className="md:block hidden absolute -left-20" src="/photos/Auth/Back.svg" alt=""/>

                                <p className="font-unbounded text-left md:uppercase font-medium text-[20px]">забыли пароль?</p>
                                <p className="uppercase text-[10px] font-medium font-montserrat w-full text-[#607E96]">не волнуйтесь! такое случается. Пожалуйста, введите адрес электронной почты , связанный с вашей учетной записью.</p>
                            </div>
                            <div className="w-full flex flex-col gap-10">
                                <button className="w-full bg-[#1B3C4D] py-5 rounded-2xl">
                                    <p className="uppercase font-unbounded font-light text-white" onClick={() => isEmailReady(email)}>отправить</p>
                                </button>
                                <div className="w-full flex justify-center">
                                    <img src="/photos/Auth/Register/cross-svgrepo-com.svg" className="w-8 cursor-pointer" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;