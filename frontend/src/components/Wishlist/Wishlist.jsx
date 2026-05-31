import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { backend_url } from "../../server";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/40 backdrop-blur-sm h-screen z-50">
      <div className="fixed top-0 right-0 h-full w-[85%] sm:w-[50%] md:w-[35%] lg:w-[28%] bg-white flex flex-col justify-between shadow-2xl rounded-l-2xl border-l border-slate-100 overflow-hidden">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
            <button
              onClick={() => setOpenWishlist(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition duration-200 cursor-pointer"
            >
              <RxCross1 size={20} />
            </button>
            <div className="w-20 h-20 bg-pink-50/50 rounded-full flex items-center justify-center mb-6 border border-pink-100/50">
              <AiOutlineHeart size={40} className="text-pink-400" />
            </div>
            <h5 className="text-[18px] font-sans font-bold text-slate-800 tracking-tight mb-2">
              Your wishlist is empty
            </h5>
            <p className="text-slate-500 font-sans text-sm text-center max-w-[240px] mb-8">
              Save your favorite custom items here to buy them later.
            </p>
            <button
              onClick={() => setOpenWishlist(false)}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl font-sans font-semibold text-sm transition-all duration-300 shadow-md shadow-pink-500/10"
            >
              Discover Products
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className={`${styles.noramlFlex} space-x-2.5`}>
                <div className="text-pink-600">
                  <AiOutlineHeart size={24} />
                </div>
                <h5 className="text-[18px] font-sans font-extrabold text-slate-900 tracking-tight">
                  My Wishlist ({wishlist && wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
                </h5>
              </div>
              <button
                onClick={() => setOpenWishlist(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition duration-200 cursor-pointer"
              >
                <RxCross1 size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {wishlist &&
                wishlist.map((i, index) => (
                  <CartSingle
                    data={i}
                    key={index}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  return (
    <div className="p-5 hover:bg-slate-50/40 transition-colors duration-200">
      <div className="w-full flex items-center space-x-4">
        {/* Remove button */}
        <button
          onClick={() => removeFromWishlistHandler(data)}
          className="p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition duration-200 cursor-pointer flex-shrink-0"
        >
          <RxCross1 size={16} />
        </button>

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
          <span className="font-sans font-extrabold text-pink-600 text-sm tracking-tight">
            US${data.discountPrice.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={() => addToCartHandler(data)}
          className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-pink-50 hover:text-pink-600 active:scale-95 transition-all duration-200 cursor-pointer flex-shrink-0 border border-slate-100"
          title="Add to cart"
        >
          <BsCartPlus size={18} />
        </button>
      </div>
    </div>
  );
};

export default Wishlist;

