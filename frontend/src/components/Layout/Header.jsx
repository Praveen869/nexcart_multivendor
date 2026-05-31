import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { productData, categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu

  // Handle search change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter products
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#e2e9f3] via-[#f7fafc] to-[#e2e9f3] shadow-[inset_0_1px_4px_rgba(255,255,255,0.9)] py-4 border-b border-slate-200/40 hidden 800px:block">
        <div className={`${styles.section} flex items-center justify-between`}>
          <div>
            <Link to="/">
              <img
                src="/logo.svg"
                alt="NexCart"
              />
            </Link>
          </div>
          {/*Search box  */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search for product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[44px] w-full px-4 pr-12 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg outline-none text-[14px] text-slate-800 transition duration-200 ease-in-out placeholder-slate-400 font-sans shadow-sm"
            />
            <AiOutlineSearch
              size={24}
              className="absolute right-4 top-2.5 text-slate-400 hover:text-indigo-600 transition cursor-pointer"
            />
            {
              // Search data if length is not 0 then show
              searchData && searchData.length !== 0 ? (
                <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-slate-100 z-[99] max-h-[50vh] overflow-y-auto p-2">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`} key={index}>
                          <div className="w-full flex items-center p-2 hover:bg-slate-50 transition rounded-lg">
                            <img
                              src={`${backend_url}${i.images[0]}`}
                              alt="img"
                              className="w-[40px] h-[40px] rounded-md object-cover mr-[12px] border border-slate-100"
                            />
                            <h1 className="text-sm font-[500] text-slate-700">{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null
            }
          </div>
          {/* Search end */}

          {/* Become a Seller */}
          <div className="h-[44px] px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-[600] text-[14px] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg hover:shadow-indigo-500/10 active:scale-95">
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
          {/* Become a Seller end */}
        </div>
      </div>

      {/*  2nd part of header start */}
      <div
        className={`${
          active == true ? "shadow-md fixed top-0 left-0 z-50" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-white h-[70px] border-b border-slate-100`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Catagories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={22} className="absolute top-5 left-4 text-indigo-600 z-10" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-12 bg-slate-50 font-sans text-[14px] font-semibold text-slate-800 select-none rounded-t-xl shadow-xs hover:bg-slate-100 transition cursor-pointer border border-b-0 border-slate-200/50`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={16}
                className="absolute right-4 top-5.5 cursor-pointer text-slate-500 z-10"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* NavItems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={28} className="text-slate-700 hover:text-indigo-600 transition-colors duration-200" />
                <span className="absolute right-[-4px] top-[-4px] rounded-full bg-indigo-600 text-white w-4 h-4 p-0 m-0 font-sans font-bold text-[10px] leading-tight text-center flex items-center justify-center shadow-xs">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={28}
                  className="text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                />
                <span className="absolute right-[-4px] top-[-4px] rounded-full bg-indigo-600 text-white w-4 h-4 p-0 m-0 font-sans font-bold text-[10px] leading-tight text-center flex items-center justify-center shadow-xs">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            {/* avatar */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    {user?.avatar ? (
                      <img
                        src={`${backend_url}${user.avatar}`}
                        className="w-[35px] h-[35px] rounded-full object-cover border-2 border-slate-200 shadow-xs"
                        alt=""
                      />
                    ) : (
                      <CgProfile size={28} className="text-slate-700 hover:text-indigo-600 transition-colors duration-200" />
                    )}
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={28} className="text-slate-700 hover:text-indigo-600 transition-colors duration-200" />
                  </Link>
                )}
              </div>
            </div>
            {/* Avatar end */}
            {/* card  popup start */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* card popup end */}

            {/* Wish list pop uo Start */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
            {/* Wish list pop uo end */}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
            w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 text-slate-800"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="/logo.svg"
                alt="NexCart"
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>

          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="text-slate-800" />
              <span className="absolute right-0 top-0 rounded-full bg-indigo-600 w-4 h-4 p-0 m-0 text-white font-sans text-[10px] leading-tight text-center flex items-center justify-center font-bold">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/*  side bar*/}
      {open ? (
        <div className="fixed w-full bg-slate-900/40 backdrop-blur-xs z-50 h-full top-0 left-0">
          <div className="fixed w-[75%] sm:w-[50%] bg-white h-screen top-0 left-0 z-10 overflow-y-auto rounded-r-2xl shadow-2xl flex flex-col p-6">
            <div className="w-full justify-between flex items-center mb-6">
              <div>
                <div
                  className="relative cursor-pointer"
                  onClick={() => setOpenWishlist(true) || setOpen(false)}
                >
                  <AiOutlineHeart size={30} className="text-slate-700" />
                  <span className="absolute right-[-4px] top-[-4px] rounded-full bg-indigo-600 w-4 h-4 p-0 m-0 text-white font-sans text-[10px] leading-tight text-center flex items-center justify-center font-bold">
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>

              <button
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <RxCross1 size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-8 w-full relative">
              <input
                type="search"
                placeholder="Search for products..."
                className="h-[40px] w-full px-4 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-sans text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />

              {searchData && searchData.length !== 0 && (
                <div className="absolute bg-[#fff] z-10 shadow-lg rounded-xl border border-slate-100 w-full left-0 mt-2 p-2 max-h-[40vh] overflow-y-auto">
                  {searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`} key={index} onClick={() => setOpen(false)}>
                        <div className="flex items-center p-2 hover:bg-slate-50 transition rounded-lg">
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] rounded-md object-cover mr-[12px] border border-slate-100"
                          />
                          <h5 className="text-sm text-slate-700 font-medium">{i.name}</h5>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <Navbar active={activeHeading} />
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`} onClick={() => setOpen(false)} className="block w-full">
                <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-sans font-semibold rounded-xl text-sm transition shadow-md">
                  {isSeller ? "Go Dashboard" : "Become Seller"}
                </button>
              </Link>
            </div>

            {/* Mob Login */}
            <div className="flex w-full justify-center border-t border-slate-100 pt-6 mt-6">
              {isAuthenticated ? (
                <div>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    {user?.avatar ? (
                      <img
                        src={`${backend_url}${user.avatar}`}
                        alt="Profile img"
                        className="w-[50px] h-[50px] rounded-full border-2 border-indigo-600 object-cover shadow-sm"
                      />
                    ) : (
                      <CgProfile size={50} className="text-indigo-600" />
                    )}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="text-[15px] font-sans font-bold text-slate-600 hover:text-indigo-600 transition"
                  >
                    Login
                  </Link>
                  <span className="text-slate-200">|</span>
                  <Link
                    to="/sign-up"
                    onClick={() => setOpen(false)}
                    className="text-[15px] font-sans font-bold text-slate-600 hover:text-indigo-600 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
