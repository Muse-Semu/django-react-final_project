import React from 'react'
import { BsFillCartFill, BsFillSafeFill } from "react-icons/bs";
import { TbHome, TbTruckDelivery } from "react-icons/tb";
import {
  MdFastfood,
  MdFavorite,
  MdHelp,
  MdRestoreFromTrash,
  MdShoppingBasket,
} from "react-icons/md";
import { FaShoppingBasket, FaUserFriends, FaWallet } from "react-icons/fa";
import { AiFillTag, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ResturantSideMenu from '../restuarant/ResturantSideBar';
function SideMenuComponent(props) {
     const navigate = useNavigate();
     const user = useSelector(state=>state.auth.user)

  return (
    <div
      onClick={() => props.setSideBar(false)}
      className="flex items-center justify-center  m-auto fixed inset-0  backdrop-blur-0  z-10
             focus:outline-none  rounded  bg-black/50 "
    >
      <div
        className={`fixed  top-0  w-[300px] h-screen  z-10 duration-300 overflow-y-auto bg-white backdrop-blur-sm  left-0`}
      >
        <nav>
          <ul className="grid   text-gray-500 font-semibold ">
            {user.user_role === "CUSTOMER" || !user.isLoggedIn ? (
              <>
                <div className="w-full top-0 z-30 bg-white shadow-sm border">
                  <AiOutlineClose
                    size={30}
                    className="absolute right-4 top-4 cursor-pointer"
                    onClick={() => props.setSideBar(false)}
                  />
                 
                </div>
                <li
                  onClick={() => navigate("/")}
                  className="text-xl py-3 flex cursor-pointer hover:text-gray-700 duration-500"
                >
                  <TbHome size={25} className="mr-4" />
                  Home
                </li>
                <li
                  className="text-xl py-3 flex cursor-pointer hover:text-gray-700 duration-500"
                  onClick={() => navigate("/foods")}
                >
                  <MdFastfood size={25} className="mr-4" />
                  Foods
                </li>
                <li className="text-xl py-3 flex cursor-pointer hover:text-gray-700 duration-500">
                  <MdFavorite size={25} className="mr-4" />
                  Favorites
                </li>

               

                <li className="text-xl py-3 flex cursor-pointer hover:text-gray-700 duration-500">
                  <BsFillSafeFill size={25} className="mr-4" />
                  Best Ones
                </li>
                <li className="text-xl py-3 flex cursor-pointer hover:text-gray-700 duration-500">
                  <FaUserFriends size={25} className="mr-4" />
                  Invite a friend{" "}
                </li>
              </>
            ) : (
              <>
                <ResturantSideMenu />
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
    
}

export default SideMenuComponent