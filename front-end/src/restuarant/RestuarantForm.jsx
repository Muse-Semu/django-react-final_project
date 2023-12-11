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
import MapContainer from "../foodsComponent/MapContainer";
import { addRestuarant } from "../services/APIservice";

function RestuarantForm(props) {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const success = useSelector((state) => state.box.isSuccessShow);
  const [image, setImage] = useState();
  // const [saveImg, setSaveImg] = useState();
  const user = useSelector((state) => state.auth.user);

  const [restFormData, setRestFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    openenig_time: "",
    closing_time: "",
    manager: null,
    image: null,
    description: "",
  });

  const restInputHandler = (e) => {
    setRestFormData({
      ...restFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    //  setSaveImg(e.target.files[0]);
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }

    setRestFormData({
      ...restFormData,
      image: imageFile,
    });
  };

  const handleRestuarantSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

     console.log(restFormData.phone);
    if (restFormData.openenig_time > restFormData.closing_time) {
      console.log("Wrong range is given");
    } else if (
      restFormData.phone.charAt(0) !== "0" ||
      restFormData.phone.charAt(1) !== "9" ||
      restFormData.phone.length !== 10
    ) {
      console.log("Invalid phone number");
    } else {
      addRestuarant(formData).then((res) => {
        if (res.status === 200) {
          setSuccessMsg(`${res.name}  registered successfully`);
          dispatch(boxActions.showSuccess(successMsg));
          res &&
            setRestFormData({
              name: "",
              phone: "",
              email: "",
              address: "",
              openenig_time: "",
              closing_time: "",
              manager: null,
              image: null,
              description: "",
            });
        } else if (res.status === 400) {
          const error = res.data;
          error.name && setFormErrors(res.data.name[0]);
          error.phone && setFormErrors(res.data.phone[0]);
          error.email && setFormErrors(res.data.email[0]);
        }
      });
    }
  };

  const disableRestButton =
    restFormData.name === "" ||
    restFormData.phone === "" ||
    restFormData.email === "" ||
    restFormData.address === "" ||
    restFormData.openenig_time === "" ||
    restFormData.closing_time === "";

  return (
    <div className=" modal-wrapper ">
      <div className="modal-box w-[100%] mt-2 lg:w-[80%]">
        <div action="">
          <div className="flex justify-between bg-orange-500 p-2  rounded-t-md text-white sticky top-0">
            <h1 className="text-2xl font-extrabold"> Add Restuarant </h1>

            <AiOutlineClose
              size={30}
              className="flex justify-center items-center bg-black/50 rounded-full p-2 cursor-pointer"
              onClick={() => dispatch(restActions.showRestuarantForm())}
            />
          </div>
          {/* <div className="bg-blue-500 p-2 text-white font-bold text-xl sticky top-[50px] ">
            Restaurant Information
          </div> */}

          {formErrors && (
            <div className="bg-slate-200 font-bold text-center text-xl sticky mx-2 top-[60px] rounded p-3 mt-2 text-red-600">
              {formErrors}
            </div>
          )}
          {/* MAIN FORM WITH REST AND MANGER */}
          <div className="grid  mx-2 gap-3 h-[] ">
            {/* MANAGER FORM */}
            <div className=" ">
              <form className="  " onSubmit={handleRestuarantSubmit}>
                <div className="grid lg:grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <div className="">
                      <span className="font-bold  capitalize">
                        restuarant name
                      </span>
                      {disableRestButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}
                      <input
                        type="text"
                        name="name"
                        id=""
                        className="border-2 rounded w-full p-2 outline-none"
                        value={restFormData.name}
                        onChange={restInputHandler}
                      />
                    </div>
                    <div className="">
                      <span className="font-bold  capitalize">email</span>
                      {disableRestButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}

                      <input
                        name="email"
                        type="email"
                        className="border-2 rounded w-full p-2 outline-none"
                        value={restFormData.email}
                        onChange={restInputHandler}
                      />
                    </div>

                    <div className="">
                      <span className="font-bold  capitalize">
                        Phone Number
                      </span>
                      {disableRestButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}

                      <input
                        type="number"
                        name="phone"
                        className="border-2 rounded w-full p-2 outline-none"
                        value={restFormData.phone}
                        onChange={restInputHandler}
                      />
                    </div>

                    <div className="">
                      <span className="font-bold  capitalize">
                        Openning Time
                      </span>
                      {disableRestButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}

                      <input
                        type="time"
                        name="openenig_time"
                        className="border-2 rounded w-full p-2 outline-none"
                        value={restFormData.openenig_time}
                        onChange={restInputHandler}
                      />
                    </div>

                    <div className="">
                      <span className="font-bold  capitalize">
                        Closing Time
                      </span>
                      {disableRestButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}

                      <input
                        type="time"
                        name="closing_time"
                        className="border-2 rounded w-full p-2 outline-none"
                        value={restFormData.closing_time}
                        onChange={restInputHandler}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="grid gap-2 ">
                    {/* <MapContainer/> */}

                    <div className="">
                      <span className="font-bold  capitalize">description</span>
                      <textarea
                        name="description"
                        className="border-2 rounded w-full p-2 outline-none"
                        value={restFormData.description}
                        onChange={restInputHandler}
                      />
                    </div>
                    <div className="">
                      <span className="font-bold  capitalize">address</span>
                      {disableRestButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}

                      <textarea
                        name="address"
                        className="border-2 rounded w-full p-2 outline-none"
                        value={restFormData.address}
                        onChange={restInputHandler}
                      />
                    </div>
                    <div className="hidden">
                      <label htmlFor="manager">Manager:</label>
                      <select
                        id="manager"
                        name="manager"
                        // value={restFormData.manager?restFormData.manager:undefined}
                        onChange={restInputHandler}
                      >
                        {/* {user.map((manager) => (
                          <option key={manager.id} value={manager.id}>
                            {manager.name}
                          </option>
                        ))} */}
                        <option
                          key={user.user_id}
                          value={user ? user.user_id : undefined}
                        >
                          {user.username}
                        </option>
                      </select>
                    </div>

                    <div className="">
                      <span className="font-bold  capitalize">image</span>
                      <div className="border">
                        <div className="flex items-center justify-center  p-2 rounded">
                          {image ? (
                            <div className="grid w-full">
                              <img
                                src={image}
                                alt=""
                                className="h-[250px] w-full object-cover  rounded border"
                              />
                              <button className=" rounded bg-red-500 hover:bg-red-600 px-3 py-2 mt-2 w-full font-bold text-white ">
                                Remove
                              </button>
                            </div>
                          ) : (
                            <div className="h-[250px] border w-full rounded items-center flex justify-center">
                              <p>Image preview</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
                    onChange={handleImageChange}
                  />
                </div>
                <button
                  disabled={disableRestButton}
                  className={`mt-6 w-full px-2 py-2 rounded-sm text-white font-bold  ${
                    !disableRestButton
                      ? `bg-blue-500 hover:bg-blue-600`
                      : `bg-blue-200`
                  } `}
                >
                  ADD{" "}
                </button>
              </form>{" "}
            </div>
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

export default RestuarantForm;
