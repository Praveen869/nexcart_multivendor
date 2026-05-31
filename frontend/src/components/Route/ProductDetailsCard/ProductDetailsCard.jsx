import React, { useEffect, useState } from 'react'
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineMessage,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { addTocart } from "../../../redux/actions/cart"
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';


const ProductDetailsCard = ({ setOpen, data }) => {
    const { cart } = useSelector((state) => state.cart);
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(false)

    const handleMessageSubmit = () => {

    }

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const incrementCount = () => {
        setCount(count + 1)
    }

    // Add to cart
    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);

        if (isItemExists) {
            toast.error("item already in cart!")
        } else {
            if (data.stock < count) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: count };
                dispatch(addTocart(cartData));
                toast.success("Item added to cart Successfully!")
            }
        }
    }


    useEffect(() => {
        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

    // Remove from wish list 
    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    }

    // add to wish list
    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data))
    }


    return (
        <>
            <div className="bg-white">
                {
                    data ? (
                        <div className="fixed w-full h-screen top-0 left-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center">
                            <div className="w-[92%] max-w-[900px] h-[85vh] 800px:h-auto overflow-y-auto bg-white rounded-2xl shadow-2xl relative p-6 md:p-8 border border-slate-100">
                                <RxCross1
                                    size={24}
                                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition cursor-pointer z-50"
                                    onClick={() => setOpen(false)}
                                />

                                <div className="block w-full 800px:flex gap-8 mt-2">
                                    {/* left */}
                                    <div className="w-full 800px:w-[50%] flex flex-col justify-between">
                                        <div className="flex items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <img 
                                                src={`${backend_url}${data.images && data.images[0]}`} 
                                                alt="img" 
                                                className="max-h-[300px] object-contain rounded-xl"
                                            />
                                        </div>
                                        <div className="flex items-center mt-6">
                                            <Link to={`/shop/preview/${data.shop._id}`} className="flex items-center gap-3">
                                                <img
                                                    src={data?.shop?.avatar ? `${backend_url}${data.shop.avatar}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                    alt="Shop"
                                                    className="w-[45px] h-[45px] rounded-full object-cover border border-slate-200"
                                                />
                                                <div>
                                                    <h3 className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition">
                                                        {data.shop.name}
                                                    </h3>
                                                    <h5 className="text-[12px] text-slate-500">
                                                        (4.5) Ratings
                                                    </h5>
                                                </div>
                                            </Link>
                                        </div>
                                        <div
                                            className="w-full h-11 bg-slate-950 hover:bg-slate-900 text-white rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm active:scale-95 mt-5"
                                            onClick={handleMessageSubmit}
                                        >
                                            <span className="flex items-center gap-2">
                                                Send Message <AiOutlineMessage size={18} />
                                            </span>
                                        </div>
                                        <h5 className="text-xs font-semibold text-rose-600 mt-4 bg-rose-50 px-3 py-1 rounded-full w-max">
                                            ({data.total_sell}) Sold out
                                        </h5>
                                    </div>
                                    
                                    {/* right */}
                                    <div className="w-full 800px:w-[50%] pt-5 800px:pt-0 flex flex-col justify-between">
                                        <div>
                                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-3">
                                                {data.name}
                                            </h1>
                                            <p className="text-[14px] text-slate-500 leading-relaxed max-h-[150px] overflow-y-auto mb-5 font-sans">
                                                {data.description}
                                            </p>

                                            <div className="flex items-baseline gap-3 mb-6">
                                                <h4 className="text-2xl font-bold text-indigo-600 font-sans">
                                                    {data.discountPrice}$
                                                </h4>
                                                {data.originalPrice && (
                                                    <h3 className="text-sm text-slate-400 line-through font-sans">
                                                        {data.originalPrice}$
                                                    </h3>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                                <div className="flex items-center">
                                                    <button
                                                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-l-lg px-4 py-2 transition duration-200 active:scale-95"
                                                        onClick={decrementCount}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="bg-slate-50 text-slate-800 font-semibold px-4 py-[7px] border-y border-slate-100 text-[15px]">
                                                        {count}
                                                    </span>
                                                    <button
                                                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-r-lg px-4 py-2 transition duration-200 active:scale-95"
                                                        onClick={incrementCount}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div>
                                                    {click ? (
                                                        <button 
                                                            className="w-10 h-10 bg-rose-50 hover:bg-rose-100 rounded-full flex items-center justify-center transition"
                                                            onClick={() => removeFromWishlistHandler(data)}
                                                            title="Remove from wishlist"
                                                        >
                                                            <AiFillHeart size={22} color="red" />
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center transition"
                                                            onClick={() => addToWishlistHandler(data)}
                                                            title="Add to wishlist"
                                                        >
                                                            <AiOutlineHeart size={22} color="#475569" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg h-11 px-8 flex items-center justify-center cursor-pointer transition shadow-sm active:scale-95 text-[15px] mt-6 w-full"
                                                onClick={() => addToCartHandler(data._id)}
                                            >
                                                <span className="flex items-center gap-2">
                                                    Add to cart <AiOutlineShoppingCart size={18} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </>
    );
};

export default ProductDetailsCard;