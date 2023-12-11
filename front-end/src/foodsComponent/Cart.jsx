import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ItemsInBasket from "./ItemsInCart";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, addOrderItem, getAllOrder, getOrderByCustomerId } from "../services/APIservice";
import ConfirmationBox from "./ConfirmationBox";
import { boxActions } from "../redux/boxSlice";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { authActions } from "../redux/Auth";
import { cartActions } from "../redux/cartSlice";

function Basket({ showBasket, setShowBasket }) {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.auth.user);
  const box = useSelector((state) => state.box.show);
  const dispatch = useDispatch();
  // const prevOrder = useSelector((state) => state.order.prevOrders);
  // console.log(prevOrder)
  const [previousOrder,setPreviousOrder ] =useState()
  const navigate = useNavigate();

  const clearAll = () => {
    dispatch(boxActions.showBox());
  };

  const showCartHandler = () => {
    dispatch(cartActions.showCart());
  };

  const foods_id = cart.map((item) => item.id);

  
  const gotoLogin = (e) => {
    dispatch(authActions.showLogin());
    showCartHandler()
    // console.log("User doesnot exist");
  };
  
 const  goToCheckOut = (e) => {
     navigate('/checkout')
     showCartHandler()
 }

  // console.log(previousOrder)

 useEffect(()=>{
  //  getAllOrder().then(res=>setPreviousOrder(res))
 },[])

  return (
    <div
      className="flex items-center justify-center  m-auto fixed inset-0  backdrop-blur-0 
       focus:outline-none shadow-lg   bg-black/50 "
    >
     <div
        className={`fixed  top-0 w-full md:w-[400px] h-screen  z-10 duration-300 overflow-y-auto  bg-white shadow-lg  
           right-0  `}
      >
        <div className="sticky top-0 z-30 bg-orange-500 shadow-sm ">
          <AiOutlineClose
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
            onClick={showCartHandler}
          />
          <div className="p-3">
            <div className="grid ">
              <div className="flex justify-between items-center mr-4">
                <h2 className="text-2xl text-blue-500 font-semibold ">
                  Your
                  <span className="text-white"> Cart({cart.length})</span>
                </h2>
              </div>

              {cart.length > 0 && (
                <button
                  className=" py-2 px-2 w-fit border rounded"
                  onClick={() => clearAll()}
                  title="Clear your cart "
                >
                  <div className="  flex gap-2">
                    <FaTrashAlt size={20} className="text-red-500" />
                    Clear All
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* BAKET ITEMS HERE */}
        <div className="">
          <ItemsInBasket />
        </div>

        <div className="flex flex-col  items-center w-full  p-4">
          {cart.length > 0 && (
            <>
              <button
                onClick={user.isLoggedIn ? goToCheckOut : gotoLogin}
                className="px-4 py-2 mt-2 rounded  bg-yellow-500 w-full font-bold"
              >
                Check Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Basket;
