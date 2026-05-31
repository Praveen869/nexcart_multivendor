import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { products } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  // Remove from wish list
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  // add to wish list
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  // Add to cart
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart Successfully!");
      }
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  // Send message
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] py-10`}>
          <div className="w-full">
            <div className="block w-full 800px:flex gap-12">
              {/* Left Column: Images */}
              <div className="w-full 800px:w-[50%] flex flex-col items-center">
                <div className="w-full max-w-[500px] aspect-square rounded-2xl border border-pink-50 flex items-center justify-center bg-pink-50/5 overflow-hidden mb-6">
                  <img
                    src={`${backend_url}${data && data.images[select]}`}
                    alt={data.name}
                    className="w-full h-full object-contain max-h-[450px]"
                  />
                </div>
                <div className="w-full flex justify-start gap-4 overflow-x-auto pb-2">
                  {data &&
                    data.images.map((i, index) => (
                      <button
                        key={index}
                        onClick={() => setSelect(index)}
                        className={`w-24 h-24 flex-shrink-0 border-2 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1 transition duration-200 ${
                          select === index ? "border-pink-400 shadow-sm shadow-pink-200/20" : "border-pink-50/60 hover:border-pink-100"
                        }`}
                      >
                        <img
                          src={`${backend_url}${i}`}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                </div>
              </div>

              {/* Right Column: Info */}
              <div className="w-full 800px:w-[50%] pt-5 800px:pt-0 flex flex-col justify-between">
                <div>
                  <h1 className="text-[28px] font-sans font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                    {data.name}
                  </h1>
                  <p className="text-slate-600 font-sans text-[15px] leading-relaxed mb-6">
                    {data.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-8">
                    <span className="text-3xl font-sans font-extrabold text-pink-600">
                      US${data.discountPrice}
                    </span>
                    {data.originalPrice && (
                      <span className="text-lg font-sans text-slate-400 line-through">
                        US${data.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="flex items-center border border-pink-100/60 rounded-xl overflow-hidden bg-pink-50/10 p-1">
                      <button
                        className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-white hover:text-pink-500 hover:shadow-xs rounded-lg font-bold text-lg transition duration-200 cursor-pointer"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-slate-800 font-sans font-semibold text-[16px]">
                        {count}
                      </span>
                      <button
                        className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-white hover:text-pink-500 hover:shadow-xs rounded-lg font-bold text-lg transition duration-200 cursor-pointer"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => (click ? removeFromWishlistHandler(data) : addToWishlistHandler(data))}
                      className={`p-3 rounded-full border transition duration-300 flex items-center justify-center cursor-pointer ${
                        click
                          ? "bg-red-50 border-red-100 text-red-500 hover:bg-red-100"
                          : "bg-pink-50/10 border-pink-100/60 text-pink-500 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200"
                      }`}
                      title={click ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {click ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                    </button>
                  </div>

                  {/* Actions Grid */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button
                      className="flex-1 py-4 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 hover:from-pink-400 hover:to-rose-400 text-white font-sans font-semibold text-[16px] rounded-xl shadow-md hover:shadow-lg hover:shadow-pink-300/20 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer border-0"
                      onClick={() => addToCartHandler(data._id)}
                    >
                      <span>Add to Cart</span>
                      <AiOutlineShoppingCart size={20} />
                    </button>
                    
                    <button
                      className="px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-[15px] rounded-xl active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                      onClick={handleMessageSubmit}
                    >
                      <span>Send Message</span>
                      <AiOutlineMessage size={18} />
                    </button>
                  </div>
                </div>

                {/* Seller Mini Card */}
                <div className="flex items-center p-4 border border-pink-50/60 bg-pink-50/5 rounded-2xl">
                  <Link to={`/shop/preview/${data?.shop._id}`} className="flex-shrink-0">
                    <img
                      src={data?.shop?.avatar ? `${backend_url}${data?.shop?.avatar}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt={data.shop.name}
                      className="w-[52px] h-[52px] rounded-full object-cover border border-pink-100 shadow-sm"
                    />
                  </Link>

                  <div className="pl-4 flex-1">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h4 className="font-sans font-bold text-slate-800 hover:text-pink-600 transition duration-200">
                        {data.shop.name}
                      </h4>
                    </Link>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <Ratings rating={parseFloat(averageRating)} />
                      <span className="text-slate-500 font-sans text-xs">({averageRating}/5 Ratings)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details info */}
          <div className="mt-16">
            <ProductDetailsInfo
              data={data}
              products={products}
              totalReviewsLength={totalReviewsLength}
              averageRating={averageRating}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-white border border-pink-50/80 p-8 rounded-2xl shadow-sm shadow-pink-200/5">
      <div className="w-full flex flex-wrap gap-6 border-b border-pink-50 pb-4 mb-8">
        <button
          onClick={() => setActive(1)}
          className={`relative pb-2 font-sans font-bold text-[16px] transition duration-300 cursor-pointer ${
            active === 1 ? "text-pink-600" : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Product Details
          {active === 1 && <div className="absolute bottom-[-5px] left-0 h-[2.5px] w-full bg-pink-500 rounded-full" />}
        </button>

        <button
          onClick={() => setActive(2)}
          className={`relative pb-2 font-sans font-bold text-[16px] transition duration-300 cursor-pointer ${
            active === 2 ? "text-pink-600" : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Product Reviews ({data?.reviews?.length || 0})
          {active === 2 && <div className="absolute bottom-[-5px] left-0 h-[2.5px] w-full bg-pink-500 rounded-full" />}
        </button>

        <button
          onClick={() => setActive(3)}
          className={`relative pb-2 font-sans font-bold text-[16px] transition duration-300 cursor-pointer ${
            active === 3 ? "text-pink-600" : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Seller Information
          {active === 3 && <div className="absolute bottom-[-5px] left-0 h-[2.5px] w-full bg-pink-500 rounded-full" />}
        </button>
      </div>

      {active === 1 && (
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 font-sans text-[16px] leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </div>
      )}

      {/* Product Reviews */}
      {active === 2 && (
        <div className="w-full min-h-[30vh] flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2">
          {data && data.reviews.length > 0 ? (
            data.reviews.map((item, index) => (
              <div className="w-full flex items-start gap-4 p-4 border border-pink-50/30 bg-pink-50/5 rounded-xl" key={index}>
                <img
                  src={item.user.avatar ? `${backend_url}/${item.user.avatar}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={item.user.name}
                  className="w-11 h-11 rounded-full object-cover border border-pink-50 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h5 className="font-sans font-bold text-slate-800 text-sm">{item.user.name}</h5>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="text-slate-600 font-sans text-sm leading-relaxed">{item.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-10">
              <span className="font-sans text-[15px]">No reviews available for this product yet.</span>
            </div>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <Link to={`/shop/preview/${data.shop._id}`}>
                <img
                  src={data?.shop?.avatar ? `${backend_url}${data?.shop?.avatar}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  className="w-14 h-14 rounded-full object-cover border border-pink-100"
                  alt={data.shop.name}
                />
              </Link>
              <div>
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <h3 className="font-sans font-bold text-slate-800 text-[17px] hover:text-pink-600 transition">
                    {data.shop.name}
                  </h3>
                </Link>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <Ratings rating={parseFloat(averageRating)} />
                  <span className="text-slate-500 font-sans text-xs">({averageRating}/5 Ratings)</span>
                </div>
              </div>
            </div>
            <p className="text-slate-600 font-sans text-sm leading-relaxed whitespace-pre-line mt-4">
              {data.shop.description}
            </p>
          </div>

          <div className="w-full md:w-auto md:min-w-[240px] border border-pink-50/60 bg-pink-50/5 p-6 rounded-2xl flex flex-col gap-4">
            <div>
              <span className="text-xs font-sans font-semibold uppercase text-slate-400 block">Joined on</span>
              <span className="text-[15px] font-sans font-bold text-slate-700 block mt-0.5">
                {data.shop?.createdAt?.slice(0, 10)}
              </span>
            </div>
            <div>
              <span className="text-xs font-sans font-semibold uppercase text-slate-400 block">Total Products</span>
              <span className="text-[15px] font-sans font-bold text-slate-700 block mt-0.5">
                {products && products.length}
              </span>
            </div>
            <div>
              <span className="text-xs font-sans font-semibold uppercase text-slate-400 block">Total Reviews</span>
              <span className="text-[15px] font-sans font-bold text-slate-700 block mt-0.5">
                {totalReviewsLength}
              </span>
            </div>
            <Link to={`/shop/preview/${data.shop._id}`} className="mt-2 block">
              <button
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-sans font-semibold text-sm transition-all duration-300 shadow-sm"
              >
                Visit Shop
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

