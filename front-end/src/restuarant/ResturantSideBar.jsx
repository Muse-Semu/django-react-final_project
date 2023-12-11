import React, { useState } from "react";
import { TbHome, TbTruckDelivery } from "react-icons/tb";
import { MdFastfood, MdHelp } from "react-icons/md";
import { AiFillTag, AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { restActions } from "../redux/RestuarantSlice";

function ResturantSideMenu(props) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  //  console.log(manid)
  const [hide, setHide] = useState(false);
  const rest =
    localStorage.getItem("rest") !== "undefined"
      ? JSON.parse(localStorage.getItem("rest"))
      : JSON.parse(localStorage.getItem("rest", []));
  const handleFoodForm = () => {
    dispatch(restActions.showFoodForm(rest && rest));
  };
  const handleShowDetail = () => {
    dispatch(restActions.showRestDetail());
    
  };
  const goToDashBoard = () => {
    dispatch(restActions.handleDashboard(true));
  };

   const handleCategory = () => {
     dispatch(restActions.handleCategoryForm());
    
   };

  return (
    <div
      className={`${
        hide ? "w-[45px]" : "w-[300px]"
      }  duration-300 overflow-y-auto  h-screen fixed  border rounded  bg-blue-500/10 left-0`}
    >
      <div className="bg-blue-500 p-2">
        <div className="flex justify-between text-white font-extrabold text-2xl">
          {rest && rest.name}
        </div>
      </div>
      <nav>
        <ul className="grid gap-2 mt-4   px-2  text-gray-500 font-extrabold ">
          <li
            onClick={() => goToDashBoard()}
            className="text-2xl  gap-2 flex items-center  p-2 rounded-sm cursor-pointer hover:text-gray-700 duration-500"
          >
            <TbHome size={25} className="" />
            Dashboard
          </li>

          <li
            className="text-2xl  gap-2 flex items-center  p-2 rounded-sm cursor-pointer hover:text-gray-700 duration-500"
            onClick={() => dispatch(restActions.viewMenu(true))}
          >
            <MdFastfood size={25} className="" />
            Menu
          </li>

          <li
            onClick={() => handleShowDetail()}
            className="text-2xl  gap-2 flex items-center  p-2 rounded-sm cursor-pointer hover:text-gray-700 duration-500"
          >
            <AiFillTag size={25} className="" />
            Restuarant
          </li>

          <li
            className="text-2xl  gap-2 flex items-center  p-2 rounded-sm cursor-pointer hover:text-gray-700 duration-500"
            onClick={handleFoodForm}
          >
            <AiOutlinePlusCircle size={25} className="" /> Add New Food
          </li>

          <li
            className="text-2xl  gap-2 flex items-center  p-2 rounded-sm cursor-pointer hover:text-gray-700 duration-500"
            onClick={handleCategory}
          >
            <AiOutlinePlusCircle size={25} className="" /> Add Category
          </li>

          <li
            className="text-2xl  gap-2 flex items-center  p-2 rounded-sm cursor-pointer hover:text-gray-700 duration-500"
            onClick={() => dispatch(restActions.handleShowOrders(true))}
          >
            <TbTruckDelivery size={25} className="" />
            Orders
          </li>

         
        </ul>
      </nav>
    </div>
  );
}

export default ResturantSideMenu;
