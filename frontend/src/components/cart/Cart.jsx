import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { backend_url } from "../../server";
import { addTocart, removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //remove from cart
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  // Total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/40 backdrop-blur-sm h-screen z-50">
      <div className="fixed top-0 right-0 h-full w-[85%] sm:w-[50%] md:w-[35%] lg:w-[28%] bg-white flex flex-col justify-between shadow-2xl rounded-l-2xl border-l border-slate-100 overflow-hidden">
        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
            <button
              onClick={() => setOpenCart(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition duration-200 cursor-pointer"
            >
              <RxCross1 size={20} />
            </button>
            <div className="w-20 h-20 bg-pink-50/50 rounded-full flex items-center justify-center mb-6 border border-pink-100/50">
              <IoBagHandleOutline size={40} className="text-pink-400" />
            </div>
            <h5 className="text-[18px] font-sans font-bold text-slate-800 tracking-tight mb-2">
              Your cart is empty
            </h5>
            <p className="text-slate-500 font-sans text-sm text-center max-w-[240px] mb-8">
              Add premium items to your cart to kickstart your shopping.
            </p>
            <button
              onClick={() => setOpenCart(false)}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl font-sans font-semibold text-sm transition-all duration-300 shadow-md shadow-pink-500/10"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className={`${styles.noramlFlex} space-x-2.5`}>
                  <div className="text-pink-600">
                    <IoBagHandleOutline size={24} />
                  </div>
                  <h5 className="text-[18px] font-sans font-extrabold text-slate-900 tracking-tight">
                    Shopping Cart ({cart && cart.length} {cart.length === 1 ? 'item' : 'items'})
                  </h5>
                </div>
                <button
                  onClick={() => setOpenCart(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition duration-200 cursor-pointer"
                >
                  <RxCross1 size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      data={i}
                      key={index}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="px-6 py-6 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 font-sans text-sm font-medium">Subtotal</span>
                <span className="text-pink-600 font-sans text-xl font-extrabold tracking-tight">
                  US${totalPrice.toFixed(2)}
                </span>
              </div>
              <Link to="/checkout" className="block w-full">
                <button
                  className="w-full py-4 flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-sans font-semibold text-[16px] tracking-wide rounded-xl shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      const newValue = value + 1;
      setValue(newValue);
      const updateCartData = { ...data, qty: newValue };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      const updateCartData = { ...data, qty: newValue };
      quantityChangeHandler(updateCartData);
    }
  };

  return (
    <div className="p-5 hover:bg-slate-50/40 transition-colors duration-200">
      <div className="w-full flex items-center space-x-4">
        {/* Quantity Controls */}
        <div className="flex flex-col items-center justify-center bg-slate-100/80 rounded-full py-1 px-1 flex-shrink-0">
          <button
            className="w-7 h-7 bg-white hover:bg-pink-50 border border-slate-200/50 rounded-full flex items-center justify-center text-slate-700 hover:text-pink-600 active:scale-90 transition duration-200 cursor-pointer shadow-sm"
            onClick={() => increment(data)}
          >
            <HiPlus size={14} />
          </button>
          <span className="font-sans font-bold text-slate-800 text-sm py-1.5 min-w-[20px] text-center">
            {value}
          </span>
          <button
            className={`w-7 h-7 rounded-full flex items-center justify-center transition duration-200 shadow-sm ${
              value === 1
                ? "bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed"
                : "bg-white hover:bg-pink-50 border border-slate-200/50 text-slate-700 hover:text-pink-600 active:scale-90 cursor-pointer"
            }`}
            onClick={() => decrement(data)}
            disabled={value === 1}
          >
            <HiOutlineMinus size={14} />
          </button>
        </div>

        {/* Thumbnail */}
        <div className="w-[80px] h-[80px] bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
          <img
            src={`${backend_url}${data?.images[0]}`}
            className="w-full h-full object-cover"
            alt={data.name}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="font-sans font-bold text-slate-800 text-sm truncate leading-tight mb-1" title={data.name}>
            {data.name}
          </h4>
          <div className="flex items-baseline space-x-1.5 mb-1.5">
            <span className="text-slate-400 font-sans text-xs">
              US${data.discountPrice.toFixed(2)} × {value}
            </span>
          </div>
          <span className="font-sans font-extrabold text-pink-600 text-sm tracking-tight">
            US${totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Delete button */}
        <button
          onClick={() => removeFromCartHandler(data)}
          className="p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition duration-200 cursor-pointer flex-shrink-0"
        >
          <RxCross1 size={16} />
        </button>
      </div>
    </div>
  );
};

export default Cart;

