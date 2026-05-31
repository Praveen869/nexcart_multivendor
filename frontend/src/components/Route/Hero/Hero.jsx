import React from 'react'
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h-[85vh] w-full bg-cover bg-center ${styles.noramlFlex}`}
            style={{
                backgroundImage:
                    "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
            }}
        >
            {/* Elegant overlay to enhance readability and premium feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50/60 via-white/40 to-transparent pointer-events-none" />

            <div className={`${styles.section} relative z-10 w-[95%] 800px:w-[55%] py-12`}>
                {/* Floating Shady Pink Glassmorphic Card */}
                <div className="bg-white/75 backdrop-blur-md border border-pink-100/50 rounded-3xl shadow-2xl shadow-pink-300/10 p-8 800px:p-12 max-w-[620px] transform hover:scale-[1.01] transition-all duration-500">
                    <span className="text-pink-500 text-xs 800px:text-sm font-semibold uppercase tracking-widest block mb-3 font-sans">
                        Premium Curation
                    </span>
                    <h1
                        className="text-[32px] leading-[1.1] 800px:text-[52px] text-slate-900 font-sans font-extrabold tracking-tight capitalize"
                    >
                        Best Collection for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600">
                            Home Decoration
                        </span>
                    </h1>
                    <p className="pt-5 text-[14px] 800px:text-[16px] font-sans font-normal text-slate-600 leading-relaxed">
                        Elevate your living space with our thoughtfully designed, premium quality artisanal home accents. Discover timeless aesthetics curated for the modern collector.
                    </p>
                    <Link to="/products" className="inline-block mt-8">
                        <button className="px-8 py-3.5 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-rose-600 text-white font-sans text-[15px] font-bold rounded-xl hover:shadow-lg hover:shadow-pink-400/25 transition-all duration-300 ease-out cursor-pointer shadow-md active:scale-95 transform hover:-translate-y-0.5">
                            Shop Collection
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero