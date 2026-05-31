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
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent pointer-events-none" />

            <div className={`${styles.section} relative z-10 w-[95%] 800px:w-[55%] py-12 800px:pl-0`}>
                <div className="max-w-[620px]">
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
                    <p className="pt-5 text-[14px] 800px:text-[16px] font-sans font-normal text-slate-700 leading-relaxed max-w-[520px]">
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