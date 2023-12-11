import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/cartSlice";
import { boxActions } from "../redux/boxSlice";

function ConfirmationBox() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const confirmDelete = () => {
    dispatch(cartActions.clearAll())
    dispatch(boxActions.showBox())
  };

  const cancelOperation=()=>{
        dispatch(boxActions.showBox());

  }
  return (
    <div className=" inset-0 fixed h-screen w-full flex items-center lg:items-start md:items-start justify-center backdrop-blur-sm bg-black/40 ">
      <div className="w-full lg:w-[40%] md:w-[60%] shadow-lg rounded-md bg-white mx-2 p-4  z-20 mt-[10px] ">
        <div className=" mb-3 text-xl text-center mt-2">
          Are you sure to Delete ?
        </div>
        <div className="grid grid-cols-2 gap-2 border-t  ">
          <button
            onClick={() => confirmDelete()}
            className="mt-2 w-full bg-red-500 text-white text-xl font-bold hover:bg-red-600 rounded px-2 py-1 "
          >
            Delete
          </button>
          <button
            onClick={() => cancelOperation()}
            className="mt-2 w-full bg-gray-500 text-white text-xl font-bold hover:bg-gray-600 rounded px-2 py-1 "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationBox;
