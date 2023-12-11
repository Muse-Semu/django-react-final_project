import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { restActions } from "../redux/RestuarantSlice";
import axios from "axios";
import { boxActions } from "../redux/boxSlice";
import SuccessPage from "../foodsComponent/SuccessPage";
import { authActions } from "../redux/Auth";

function RestuarantManagerForm(props) {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const success = useSelector((state) => state.box.isSuccessShow);

  console.log(success);
  const handleManagerSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData(e.currentTarget);
    axios
      .post(`http://127.0.0.1:8000/api/manager/register`, formData)
      .then(function (response) {
        if (response.data.bool == false) {
          setFormErrors(true);
          setErrorMsg(response.data.null);
          setTimeout(() => {
            setErrorMsg("Try again");
          }, 3000);

          console.log(response.data);
        } else {
          setFormErrors(false);
          setSuccessMsg("");
          dispatch(boxActions.showSuccess("You have registered successfully"));
          dispatch(restActions.showManagerForm())
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className=" fixed w-full h-screen backdrop-blur flex justify-center items-center inset-0 bg-black/50 ">
      <div className="lg:w-[50%] md:w-[60%] lg:max-h-[800px] w-full m-auto mt-8 shadow-lg max-h-[500px] rounded-md bg-white mx-3  overflow-y-auto">
        <div action="">
          <div className="flex justify-between bg-orange-500 p-2  rounded-t-md text-white sticky top-0">
            <h1 className="text-2xl font-extrabold"> Manager Registration</h1>

            <AiOutlineClose
              size={30}
              className="flex justify-center items-center bg-black/50 rounded-full p-2 cursor-pointer"
              onClick={() => dispatch(restActions.showManagerForm())}
            />
          </div>
          {/* MAIN FORM WITH REST AND MANGER */}
          <div className="grid  mx-2 gap-3  ">
            {/* MANAGER FORM */}
            <div className=" mt-3 ">
              <form className="grid gap-2" onSubmit={handleManagerSubmit}>
                <div className="bg-blue-500 p-2 text-white font-bold text-xl ">
                  Manager Information
                </div>
                {formErrors && (
                  <div className=" text-red-500 text-center font-bold border rounded bg-black/10 ">
                    {errorMsg}
                  </div>
                )}
                <div className="">
                  <span className="font-bold  capitalize">username</span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="border-2 rounded w-full p-2 outline-none"
                  />
                </div>
                <div className="">
                  <span className="font-bold  capitalize">email</span>
                  <input
                    type="email"
                    name="email"
                    className="border-2 rounded w-full p-2 outline-none"
                  />
                </div>
                <div className="">
                  <span className="font-bold  capitalize">password</span>
                  <input
                    type="password"
                    name="password"
                    className="border-2 rounded w-full p-2 outline-none"
                  />
                </div>
                <div className="">
                  <span className="font-bold  capitalize">
                    confirm password
                  </span>
                  <input
                    type="password"
                    name="password-2"
                    className="border-2 rounded w-full p-2 outline-none"
                  />
                </div>
                <button
                  // onClick={handleManagerSubmit}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded w-full font-extrabold capitalize text-white "
                >
                 REGISTER
                </button>{" "}
              </form>
            </div>

            {/* RESTUARANT INFORMATION INPUT
            <form className=" mt-3 border-r">
              <div className="grid gap-2">
                <div className="bg-blue-500 p-2 text-white font-bold text-xl ">
                  Restaurant Information
                </div>

                <div className="">
                  <span className="font-bold  capitalize">title</span>
                  <input
                    type="text"
                    name="title"
                    id=""
                    className="border-2 rounded w-full p-2 outline-none"
                  />
                </div>
                <div className="">
                  <span className="font-bold  capitalize">description</span>
                  <textarea
                    type="text"
                    name="detail"
                    className="border-2 rounded w-full p-2 outline-none"
                  />
                </div>
                <div className="">
                  <span className="font-bold  capitalize">price</span>
                  <input
                    type="number"
                    name="price"
                    className="border-2 rounded w-full p-2 outline-none"
                  />
                </div>
                <div className="">
                  <span className="font-bold  capitalize">Add Image</span>

                  <label
                    htmlFor="image"
                    className="flex gap-2 items-center font-bold justify-center border rounded p-2 text-xl"
                  >
                    {" "}
                    <AiOutlinePlusCircle
                      size={35}
                      className="font-extrabold text-blue-500"
                    />{" "}
                    Upload Image
                  </label>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden border-2 rounded w-full p-2 outline-none"
                  />
                </div>
              </div>
            </form> */}
          </div>
          <div className="p-2 mt-2 ">
            {/* <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded w-full font-extrabold capitalize text-white ">
              ADD
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestuarantManagerForm;
