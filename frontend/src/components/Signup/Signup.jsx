import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";


const Signup = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);

    // const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = { headers: { "Content-Type": "application/json" } };

        const newForm = {
            name: name,
            email: email,
            password: password
        };

        axios
            .post(`${server}/user/create-user`, newForm, config)
            .then((res) => {
                toast.success(res.data.message);
                setName("");
                setEmail("");
                setPassword("");
            }).catch((error) => {
                toast.error(error.response.data.message);
            })
    }

    return (
        <div className='min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Register as new user
                </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-10 px-6 shadow-xl rounded-2xl border border-slate-100 sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit} >
                        {/* Full Name start */}
                        <div>
                            <label htmlFor="name"
                                className='block text-sm font-semibold text-slate-700 mb-1.5'
                            >
                                Full Name
                            </label>
                            <div className='mt-1'>
                                <input type="text"
                                    name='name'
                                    autoComplete='name'
                                    required
                                    placeholder='john doe'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm'
                                />
                            </div>
                        </div>
                        {/* Full Name end */}

                        {/* Email address */}
                        <div>
                            <label htmlFor="email"
                                className='block text-sm font-semibold text-slate-700 mb-1.5'
                            >
                                Email Address
                            </label>
                            <div className='mt-1 relative'>
                                <input
                                    type="email"
                                    name='email'
                                    autoComplete='email'
                                    required
                                    placeholder='Enter valid email address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm'
                                />
                            </div>
                        </div>
                        {/* Email address end */}
                        {/* Password start */}
                        <div>
                            <label htmlFor="password"
                                className='block text-sm font-semibold text-slate-700 mb-1.5'
                            >
                                Password
                            </label>
                            <div className='mt-1 relative'>
                                <input type={visible ? "text" : "password"}
                                    name='password'
                                    autoComplete='password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 pr-10 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition duration-200 text-sm shadow-sm'
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
                        {/* Password end */}




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
                            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 transition pl-2 font-medium">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup



