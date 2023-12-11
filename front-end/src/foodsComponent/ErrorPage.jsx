import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../redux/Auth";
import { boxActions } from "../redux/boxSlice";

function ErrorPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeLoginForm = () => {
    dispatch(authActions.showLogin());
  };
  const errMsg = useSelector(state=>state.box.errorMessage)
  const closeError = () => {
    dispatch(boxActions.showError(""));
  };
  return (
    <div className=" w-full h-screen flex justify-center fixed items-center inset-0  backdrop-blur-md bg-black/50  ">
      <div className="h-[300px] w-80 lg:w-[40%] md:w-[60%] flex items-center justify-center shadow-lg rounded-md bg-white mx-3 p-4 relative ">
        <p className="font-extrabold bg-red-600 text-5xl border rounded-full text-white  w-[60px] h-[60px] object-cover text-center absolute top-0 right-[45%] -mt-5">
          !{" "}
        </p>

        <div className="font-bold mb-3 text-2xl   text-red-600 ">
          <p>{errMsg}</p>
        </div>

        <button
          onClick={closeError}
          className="  w-[90%] bg-red-500 text-white text-2xl font-bold hover:bg-red-600 rounded px-2 py-2 absolute bottom-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;

// className="flex items-center justify-center  m-auto fixed inset-0  backdrop-blur-0
//        focus:outline-none shadow-lg rounded  bg-black/50 "
