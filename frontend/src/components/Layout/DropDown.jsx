import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
    const navigate = useNavigate();
    const submitHandle = (i) => {
        navigate(`/products?category=${i.title}`);
        setDropDown(false);
        window.location.reload();
    };
    return (
        <div className="pb-3 w-[270px] bg-white absolute z-50 rounded-b-xl shadow-lg border border-t-0 border-slate-100 animate-fadeIn transition-all duration-300">
            {categoriesData &&
                categoriesData.map((i, index) => (
                    <div
                        key={index}
                        className="flex items-center px-4 py-2.5 hover:bg-slate-50 transition duration-200 cursor-pointer"
                        onClick={() => submitHandle(i)}
                    >
                        <img
                            src={i.image_Url}
                            style={{
                                width: "20px",
                                height: "20px",
                                objectFit: "contain",
                                userSelect: "none",
                            }}
                            alt="Drop Down img"
                        />
                        <h3 className="ml-3 text-sm text-slate-700 font-[500] cursor-pointer select-none">{i.title}</h3>
                    </div>
                ))}
        </div>
    );
};

export default DropDown;