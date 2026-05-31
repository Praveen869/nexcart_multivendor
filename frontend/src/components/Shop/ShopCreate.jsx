import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from 'react-icons/rx';


const ShopCreate = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState();
    const [avatar, setAvatar] = useState();
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = { headers: { "Content-Type": "application/json" } };

        const newForm = {
            name: name,
            email: email,
            password: password,
            zipCode: zipCode,
            address: address,
            phoneNumber: phoneNumber
        };

        axios
            .post(`${server}/shop/create-shop`, newForm, config)
            .then((res) => {
                toast.success(res.data.message);
                setName("");
                setEmail("");
                setPassword("");
                setZipCode();
                setAddress("");
                setPhoneNumber();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
        navigate("/shop-login")
        window.location.reload();
    }

    return (
        <div className='min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Register as a seller
                </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]'>
                <div className='bg-white py-10 px-8 shadow-xl rounded-2xl border border-slate-100 sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit} >
                        {/* Shop Name */}
                        <div>
                            <label htmlFor="name"
                                className='block text-sm font-semibold text-slate-700 mb-1.5'
                            >
                                Shop Name
                            </label>
                            <div className='mt-1'>
                                <input type="text"
                                    name='name'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm'
                                />
                            </div>
                        </div>
                        {/* Phone number */}
                        <div>
                            <label htmlFor="phone-number"
                                className='block text-sm font-semibold text-slate-700 mb-1.5'
                            >
                                Phone Number
                            </label>
                            <div className='mt-1 relative'>
                                <input
                                    type="number"
                                    name='phone-number'
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm'
                                />
                            </div>
                        </div>
                        {/* Phone number end */}

                        {/* Email start */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-slate-700 mb-1.5"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-2.5 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-semibold text-slate-700 mb-1.5"
                            >
                                Address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="appearance-none block w-full px-4 py-2.5 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm"
                                />
                            </div>
                        </div>

                        {/* ZipCode */}
                        <div>
                            <label
                                htmlFor="zipcode"
                                className="block text-sm font-semibold text-slate-700 mb-1.5"
                            >
                                Zip Code
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="zipcode"
                                    required
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className="appearance-none block w-full px-4 py-2.5 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-slate-700 mb-1.5"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-2.5 pr-10 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm"
                                />
                                {visible ? (
                                    <AiOutlineEye
                                        className="absolute right-3 top-3.5 cursor-pointer text-slate-400 hover:text-slate-600 transition"
                                        size={20}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-3 top-3.5 cursor-pointer text-slate-400 hover:text-slate-600 transition"
                                        size={20}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>





                        <div>
                            <button
                                type='submit'
                                className='group relative w-full h-[44px] flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-sm hover:shadow active:scale-95 cursor-pointer'
                            >
                                Submit
                            </button>
                        </div>

                        <div className={`${styles.noramlFlex} w-full text-sm text-slate-600`} >
                            <h4>Already have an account?</h4>
                            <Link to="/shop-login" className="text-indigo-600 hover:text-indigo-700 transition pl-2 font-medium">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShopCreate





