import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
import { addTocart } from '../../../redux/actions/cart';
import { toast } from 'react-toastify';
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

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

    // Add to cart
    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);

        if (isItemExists) {
            toast.error("item already in cart!")
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addTocart(cartData));
                toast.success("Item added to cart Successfully!")
            }
        }
    }

    return (
        <>
            <div className="w-full h-[400px] bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 p-4 relative cursor-pointer flex flex-col justify-between shadow-sm group hover:-translate-y-1">
                <div className="relative w-full flex items-center justify-center pt-2">
                    <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`} className="w-full flex items-center justify-center">
                        <img
                            src={`${backend_url}${data.images && data.images[0]}`}
                            alt="prd"
                            className="w-full h-[180px] object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </Link>

                    {/* Floating Side actions on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute right-0 top-0 flex flex-col gap-2 z-10">
                        {click ? (
                            <button 
                                className="w-9 h-9 bg-white shadow-md border border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-50 transition active:scale-90"
                                onClick={() => removeFromWishlistHandler(data)}
                                title="Remove from wishlist"
                            >
                                <AiFillHeart size={20} color="red" />
                            </button>
                        ) : (
                            <button 
                                className="w-9 h-9 bg-white shadow-md border border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-50 transition active:scale-90"
                                onClick={() => addToWishlistHandler(data)}
                                title="Add to wishlist"
                            >
                                <AiOutlineHeart size={20} color="#475569" />
                            </button>
                        )}
                        <button 
                            className="w-9 h-9 bg-white shadow-md border border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-50 transition active:scale-90"
                            onClick={() => setOpen(!open)}
                            title="Quick view"
                        >
                            <AiOutlineEye size={20} color="#475569" />
                        </button>
                        <button 
                            className="w-9 h-9 bg-white shadow-md border border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-50 transition active:scale-90"
                            onClick={() => addToCartHandler(data._id)}
                            title="Add to cart"
                        >
                            <AiOutlineShoppingCart size={20} color="#475569" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-4">
                    <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                        <h5 className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">{data.shop.name}</h5>
                    </Link>
                    <Link to={`/product/${data._id}`}>
                        <h4 className="text-[15px] font-semibold text-slate-800 line-clamp-2 hover:text-indigo-600 transition min-h-[44px] leading-snug">
                            {data.name}
                        </h4>
                    </Link>
                    
                    {/* Star Rating */}
                    <div className="flex mt-1">
                        <Ratings rating={data?.ratings} />
                    </div>

                    <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-baseline">
                            <h5 className={`${styles.productDiscountPrice}`}>
                                {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}$
                            </h5>
                            <h4 className={`${styles.price}`}>
                                {data.originalPrice ? data.originalPrice + " $" : null}
                            </h4>
                        </div>
                        <span className="font-semibold text-[13px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {data?.sold_out} sold
                        </span>
                    </div>
                </div>
                {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
            </div>
        </>
    );
}

export default ProductCard;