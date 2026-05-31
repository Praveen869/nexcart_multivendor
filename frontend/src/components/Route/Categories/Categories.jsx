import React from 'react'
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from '../../../styles/styles'

const Categories = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`${styles.section} hidden sm:block`}>
                <div
                    className="branding my-12 grid grid-cols-2 lg:grid-cols-4 gap-8 w-full border border-pink-50 bg-white px-8 py-7 rounded-2xl shadow-sm shadow-pink-200/10"
                >
                    {brandingData &&
                        brandingData.map((i, index) => (
                            <div className="flex items-center space-x-4 border-r border-pink-50/50 last:border-r-0" key={index}>
                                <div className="text-pink-400 flex-shrink-0">
                                    {i.icon}
                                </div>
                                <div className="px-1">
                                    <h3 className="font-sans font-bold text-slate-800 text-sm md:text-[15px] tracking-tight">{i.title}</h3>
                                    <p className="text-slate-500 font-sans text-xs mt-0.5">{i.Description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* categories */}
            <div
                className={`${styles.section} bg-white border border-pink-50/80 p-8 rounded-2xl shadow-sm shadow-pink-200/10 mb-12`}
                id="categories"
            >
                <h2 className="text-[22px] font-sans font-bold text-slate-900 tracking-tight mb-6">
                    Browse by Category
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {
                        categoriesData &&
                        categoriesData.map((i) => {
                            const handleSubmit = (i) => {
                                navigate(`/products?category=${i.title}`);
                            }
                            return (
                                <div
                                    className="w-full h-[100px] flex items-center justify-between p-4 cursor-pointer overflow-hidden border border-pink-50/50 bg-pink-50/5 rounded-xl hover:bg-white hover:border-pink-100 hover:shadow-md hover:shadow-pink-300/5 transition-all duration-300 group"
                                    key={i.id}
                                    onClick={() => handleSubmit(i)}
                                >
                                    <h5 className="text-[15px] font-sans font-bold text-slate-800 tracking-tight leading-tight group-hover:text-pink-500 transition-colors duration-300 pr-2">
                                        {i.title}
                                    </h5>
                                    <div className="w-[70px] h-[70px] flex-shrink-0 overflow-hidden rounded-lg bg-white flex items-center justify-center border border-pink-50">
                                        <img
                                            src={i.image_Url}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            alt="category"
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Categories