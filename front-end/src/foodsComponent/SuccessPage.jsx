import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../redux/Auth";
import { boxActions } from "../redux/boxSlice";
import sucIcon from "../image/suc.webp";

function SuccessPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successMsg = useSelector(state => state.box.successMessage);

  const closeLoginForm = ()=>{
    dispatch(authActions.showLogin())
  }
  const closeSuccess = ()=>{
    dispatch(boxActions.showSuccess(""))
  }
  return (
    <div className=" w-full h-screen flex justify-center m-auto fixed items-center inset-0  backdrop-blur-sm bg-black/50 ">
      <div className="h-[300px] w-80 lg:w-[40%] md:w-[60%]  m-auto mt-8 shadow-lg rounded-md bg-white mx-3 p-4 relative flex  items-center justify-center ">
        <img
          className=" w-[60px] h-[60px] object-cover text-center absolute top-0 right-[45%] -mt-5"
          // src="https://cdn.pixabay.com/photo/2013/07/12/12/17/check-145512_1280.png"
          src={sucIcon}
          alt=""
        />
        <div className="font-bold  text-2xl text-center ">
          <p>{successMsg}</p>
        </div>
        <button
          onClick={closeSuccess}
          className=" absolute bottom-5 w-[90%] bg-green-500 text-white text-2xl font-extrabold hover:bg-green-600 rounded px-2 py-2 "
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;

// className="flex items-center justify-center  m-auto fixed inset-0  backdrop-blur-0
//        focus:outline-none shadow-lg rounded  bg-black/50 "
