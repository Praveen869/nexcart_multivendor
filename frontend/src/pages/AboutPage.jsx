import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="bg-slate-50/50 min-h-screen flex flex-col justify-between">
            <Header />
            <AboutContent />
            <Footer />
        </div>
    );
};

const AboutContent = () => {
    const values = [
        {
            title: "Premium Quality",
            description: "We curate only the finest multi-vendor products, ensuring high standard craftsmanship and materials in every order.",
            icon: "💎"
        },
        {
            title: "Secure Shopping",
            description: "Your trust is our priority. We employ state-of-the-art payment encryption and vendor verification protocols.",
            icon: "🛡️"
        },
        {
            title: "Customer Centricity",
            description: "With 24/7 client care, responsive dispute resolutions, and streamlined tracking, we put you first.",
            icon: "🤝"
        },
        {
            title: "Global Reach",
            description: "Bridging elite independent sellers with global shoppers seamlessly under a singular, modern portal.",
            icon: "🌍"
        }
    ];

    return (
        <div className="flex-1 py-16">
            <div className={`${styles.section}`}>
                {/* Hero Banner Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs font-sans">Our Identity</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans mt-2 mb-6 leading-tight">
                            Redefining Modern <br />
                            <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 bg-clip-text text-transparent">E-Commerce Ecosystems</span>
                        </h1>
                        <p className="text-slate-600 font-sans text-base leading-relaxed mb-6">
                            Welcome to <strong>NexCart</strong>, a premier multivendor shopping platform engineered for modern lifestyles. Founded in 2026, we specialize in curating and delivering high-quality products across tech, fashion, lifestyle, and pets, directly from independent premium retailers directly to your doorstep.
                        </p>
                        <p className="text-slate-600 font-sans text-base leading-relaxed mb-8">
                            We believe that shopping should be fluid, engaging, and elegant. Our ecosystem empowers independent small-to-medium sellers, providing them a state-of-the-art digital storefront while guaranteeing buyers an uncompromised level of security, authenticity, and design excellence.
                        </p>
                        <Link to="/products">
                            <button className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold font-sans rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 transition-all duration-300">
                                Explore Our Store
                            </button>
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
                            alt="NexCart Team Collaborating" 
                            className="relative rounded-3xl shadow-2xl object-cover h-[450px] w-full border border-white"
                        />
                    </div>
                </div>

                <hr className="border-slate-100 mb-16" />

                {/* Values Section */}
                <div className="mb-16">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs font-sans">Core Values</span>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-sans">What We Stand For</h2>
                        <p className="text-slate-500 font-sans mt-3">Our actions are guided by standard merchant principles that prioritize security, beauty, and premium standard reliability.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/60 transition duration-300">
                                <span className="text-3xl mb-4 block">{v.icon}</span>
                                <h3 className="text-lg font-bold text-slate-800 font-sans mb-3">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-sans">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Story Panel */}
                <div className="bg-gradient-to-r from-[#e2e9f3]/60 via-[#f7fafc]/60 to-[#e2e9f3]/60 shadow-[inset_0_1px_4px_rgba(255,255,255,0.9)] p-8 md:p-12 rounded-3xl border border-slate-200/40 text-center max-w-3xl mx-auto">
                    <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs font-sans">Empowering Retail</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 mb-4 font-sans">Are You A Seller?</h2>
                    <p className="text-slate-600 font-sans leading-relaxed mb-6 max-w-xl mx-auto">
                        Launch your premium online retail operations in minutes. With state-of-the-art seller tooling, dashboard controls, lightning fast setup, and automatic audience discovery, NexCart is your ultimate business companion.
                    </p>
                    <Link to="/shop-create">
                        <button className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-white font-semibold font-sans rounded-lg shadow-sm transition-all duration-300">
                            Register As Seller
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
