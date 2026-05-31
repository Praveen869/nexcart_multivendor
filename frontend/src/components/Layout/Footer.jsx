import React from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    footercompanyLinks,
    footerProductLinks,
    footerSupportLinks,
} from "../../static/data";


const Footer = () => {
    return (
        <div className="bg-[#faf6f0] text-slate-700 font-sans border-t border-[#f0e7d8]">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:px-8 px-6 py-16 text-center sm:text-start">
                <ul className="px-0 flex flex-col items-center sm:items-start">
                    <img
                        src="/logo.svg"
                        alt="NexCart"
                        style={{ height: "35px" }}
                    />
                    <p className="text-slate-600 text-sm mt-6 font-[400] leading-relaxed max-w-[280px]">
                        Your modern destination for premium multi-vendor shopping.
                    </p>
                    <div className="flex items-center gap-4 mt-6 text-slate-500">
                        <AiFillFacebook size={22} className="cursor-pointer hover:text-pink-500 transition" />
                        <AiOutlineTwitter size={22} className="cursor-pointer hover:text-pink-500 transition" />
                        <AiFillInstagram size={22} className="cursor-pointer hover:text-pink-500 transition" />
                        <AiFillYoutube size={22} className="cursor-pointer hover:text-pink-600 transition" />
                    </div>
                </ul>

                <ul className="flex flex-col gap-2">
                    <h1 className="text-xs uppercase tracking-wider text-slate-900 font-bold mb-3">Company</h1>
                    {footerProductLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-slate-600 hover:text-pink-500 transition duration-200 text-sm"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="flex flex-col gap-2">
                    <h1 className="text-xs uppercase tracking-wider text-slate-900 font-bold mb-3">Shop</h1>
                    {footercompanyLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-slate-600 hover:text-pink-500 transition duration-200 text-sm"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="flex flex-col gap-2">
                    <h1 className="text-xs uppercase tracking-wider text-slate-900 font-bold mb-3">Support</h1>
                    {footerSupportLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-slate-600 hover:text-pink-500 transition duration-200 text-sm"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t border-[#f0e7d8] max-w-[1400px] mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm text-center">
                <span>© 2026 NexCart. All rights reserved.</span>
                <span className="hover:text-slate-600 cursor-pointer transition">Terms of Service · Privacy Policy</span>
                <div className="flex items-center justify-center">
                    <img
                        src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                        alt="Payments"
                        className="h-[25px] opacity-80"
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;