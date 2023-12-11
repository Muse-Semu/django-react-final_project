import React, { useState } from "react";
import {
  AiFillProfile,
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlinePlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Basket from "./Cart";

import SideMenuComponent from "./SideMenuBar";
import LoginForm from "../forms/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationBox from "./ConfirmationBox";
import { authActions } from "../redux/Auth";
import { cartActions } from "../redux/cartSlice";
import { restActions } from "../redux/RestuarantSlice";
import ErrorPage from "./ErrorPage";
import SuccessPage from "./SuccessPage";
import RestuarantManagerForm from "../restuarant/RetuarantManagerForm";
import RestuarantForm from "../restuarant/RestuarantForm";
import FoodForm from "../restuarant/FoodForm";
import avatar from "../image/avatar1.webp"

function NavbarComponents() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [userOption, setUserOption] = useState(false);
  const [searchOn, setSearchOn] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const showBasket = useSelector((state) => state.cart.isShowCart);
  const user = useSelector((state) => state.auth.user);
  const box = useSelector((state) => state.box.show);
  const err = useSelector((state) => state.box.error)
  const showRestForm = useSelector((state) => state.rest.restuarantForm);
  const showManageForm = useSelector((state) => state.rest.managerForm);
  const dispatch = useDispatch();
  const loginForm = useSelector((state) => state.auth.loginForm);
  const success = useSelector((state) => state.box.isSuccessShow);
  const isFoodForm = useSelector((state) => state.rest.foodForm);
  

  const addRest = localStorage.getItem("rest");
  const logout = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    navigate('/')
    
    
  };

  const showLoginForm = () => {
    dispatch(authActions.showLogin());
  };


  const showCartHandler = () => {
    dispatch(cartActions.showCart());
  };

  const handleRestForm = () => {
    dispatch(restActions.showRestuarantForm());
  };

  const closeSearch = (e) => {
    console.log(e.target.id);

    if (e.target.id === "close") {
      setSearchOn(false);
    }
  };

  // const clearAll = () => {
  //   dispatch({
  //     type: actionType.CLEAR_BASKET,
  //   });
  //   localStorage.setItem("foods", JSON.stringify([]));
  // };


  return (
    // Navigation Bar Component
    <div
      className=" mx-auto flex 
      justify-between items-center p-3 bg-gray-100 shadow-lg sticky top-0 z-20  "
    >
      {/* left-bar  */}

      {
        <div className="flex items-center ">
          <div onClick={() => setSideBar(true)} className="cursor-pointer">
            <AiOutlineMenu className="font-bold pr-3" size={40} />
          </div>

          <h1 className="hidden font-extrabold md:block text-3xl sm:text-3xl lg:text-4xl text-blue-500">
            G
            <span className="font-bold text-orange-500">Foods</span>
          </h1>
        </div>
      }

      {/*  It is for search bar*/}

      {/* <div className="lg:flex gap-1 w-[60%] m-auto hidden ">
        <input
          type="text"
          className="w-full rounded px-3 py-2 border outline-none"
        />
        <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-bold">
          Search
        </button>
      </div>
      <button
        onClick={() => setSearchOn(true)}
        className="px-3 py-2 sm:hidden rounded border "
      >
        Search
      </button>
      {searchOn && (
        <div
          id="close"
          onClick={closeSearch}
          className="w-full  z-10  lg:hidden m-auto h-screen fixed inset-0   items-center  justify-center backdrop-blur-sm "
        >
          <div className="mt-6 flex gap-1 relative group">
            <input
              type="text"
              className="w-full rounded px-3 py-2 border outline-none"
            />
            <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-bold">
              Search
            </button>
            <AiOutlineClose
              id="close"
              onClick={closeSearch}
              size={25}
              className="hidden group-hover:block absolute  right-[89px] top-2 font-extralight"
            />
          </div>
        </div>
      )} */}
      {/*SHOPPING CART BUTTON  */}
      <div className="flex gap-3 items-center justify-between relative ">
        <div>
          {user.isLoggedIn ? (
            <div>
              <div
                onClick={() => setUserOption(!userOption)}
                className="flex gap-1 items-center justify-center cursor-pointer"
              >
                <img
                  src={avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <button className="font-bold font-mono text-green-500">
                  {user.username}
                </button>
              </div>
              {userOption && (
                <div
                  className={`  w-[250px] top-10 right-0 absolute list-none bg-white sahdow-md border px-2 py-1 rounded grid gap-1  `}
                >
                  <li className="px-2 py-1 font-bold capitalize w-full cursor-pointer hover:bg-slate-100 flex gap-2 items-center ">
                    <AiFillProfile />
                    profile
                  </li>
                  {user.user_role === "MANAGER" && (
                    <div>
                      <li className="">
                        {addRest === null ? (
                          <div
                            className="px-2 py-1 font-bold capitalize w-full cursor-pointer hover:bg-slate-100  flex gap-2 items-center"
                            onClick={handleRestForm}
                          >
                            <AiOutlinePlusCircle />
                            Add Restuarant
                          </div>
                        ) : (
                          <div
                            onClick={() => navigate(`rest/${user.user_id}`)}
                            className="px-2 py-1 font-bold capitalize w-full cursor-pointer hover:bg-slate-100 flex gap-2 items-center "
                          >
                            Manage Restuarant
                          </div>
                        )}
                      </li>
                      <li className="px-2 py-1 font-bold capitalize w-full cursor-pointer hover:bg-slate-100 flex gap-2 items-center ">
                        <FaComment /> Generate Report
                      </li>
                    </div>
                  )}
                  {user.user_role === "CUSTOMER" && (
                    <li className="px-2 py-1 font-bold capitalize w-full cursor-pointer hover:bg-slate-100 flex gap-2 items-center ">
                      View Something
                    </li>
                  )}
                  <li
                    className="border px-2 py-1 font-bold capitalize w-full border-t-2 cursor-pointer hover:bg-slate-100 flex gap-2 items-center justify-center "
                    onClick={logout}
                  >
                    <AiOutlineLogout className="text-red-500" />
                    logout
                  </li>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => showLoginForm()}>Login</button>
          )}
        </div>
        {!user.isLoggedIn || user.user_role === "CUSTOMER" ? (
          <>
            <div
              className="relative cursor-pointer mr-4"
              onClick={showCartHandler}
            >
              <AiOutlineShoppingCart size={20} className="text-blue-500 " />
              <div className="-top-3 left-3 bg-orange-500  absolute w-5 h-5 justify-center font-bold flex items-center rounded-full text-white">
                {cart?.length}
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* MOBILE MENU OVERLAYS */}

      {/* VIEW ORDER COMPONNT */}
      {sideBar && <SideMenuComponent setSideBar={setSideBar} />}
      {showBasket && <Basket />}
      {loginForm && <LoginForm />}
      {/* {productForm && <ProductForm setProductForm={setProductForm} />} */}
      {box && <ConfirmationBox />}
      {showRestForm && <RestuarantForm />}
      {showManageForm && <RestuarantManagerForm />}
      {err && <ErrorPage />}
      {success && <SuccessPage />}
      {isFoodForm && <FoodForm />}
    </div>
  );
}

export default NavbarComponents;
