import React, { useEffect, useState } from "react";
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
import {
  addFood,
  getCategories,
} from "../services/APIservice";

function FoodForm(props) {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.box.isSuccessShow);
  const [image, setImage] = useState();
  const currentRest = useSelector((state) => state.rest.restId);
  const user = useSelector((state) => state.auth.user);

  const [foodFormData, setFoodFormData] = useState({
    name: "",
    price: null,
    restuarant: null,
    category: '',
    image: null,
    detail: "",
  });

  const foodInputHandler = (e) => {
    setFoodFormData({
      ...foodFormData,
      [e.target.name]: e.target.value,
    });
  };
  const [categories, setCategories] = useState([]);

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

    setFoodFormData({
      ...foodFormData,
      image: imageFile,
    });
  };

  const handleFoodSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    addFood(formData).then((res) => {
      console.log(res);
      if (res) {
        dispatch(restActions.showFoodForm(null))
        dispatch(boxActions.showSuccess(`${res.name}  Added Successfully`));
          setFoodFormData({
            name: "",
            price: '',
            restuarant: null,
            category: null,
            image: null,
            detail: "",
          });
          setImage(null)
      }
    });
  };
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);


  // console.log(currentRest)
  const disableFoodButton =
    foodFormData.name === "" ||
    foodFormData.price === null ||
    foodFormData.category === ''

  return (
    <div className=" modal-wrapper bg-black/50 ">
      <div className="lg:w-[60%] md:w-[70%] w-[100%] modal-box">
        <div action="">
          <div className="flex justify-between bg-orange-500 p-2  rounded-t-md text-white sticky top-0">
            <h1 className="text-2xl font-extrabold capitalize">
              {" "}
              Add New Food{" "}
            </h1>

            <AiOutlineClose
              size={30}
              className="flex justify-center items-center bg-black/50 rounded-full p-2 cursor-pointer"
              onClick={() => dispatch(restActions.showFoodForm())}
            />
          </div>

          {/* MAIN FORM WITH REST AND MANGER */}
          <div className="grid  mx-2 gap-3  ">
            {/* MANAGER FORM */}
            <div className=" mt-3 ">
              <form className=" mt-3 " onSubmit={handleFoodSubmit}>
                <div className="grid lg:grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <div className="">
                      <span className="font-bold  capitalize">food name</span>
                      {disableFoodButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}
                      <input
                        type="text"
                        name="name"
                        id=""
                        className="border-2 rounded w-full p-2 outline-none"
                        value={foodFormData.name}
                        onChange={foodInputHandler}
                      />
                    </div>

                    <div className="">
                      <span className="font-bold pt-2 capitalize">price</span>
                      {disableFoodButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}
                      <input
                        type="number"
                        name="price"
                        className="border-2 rounded w-full p-1 outline-none"
                        onChange={foodInputHandler}
                      />
                    </div>
                    <div className="">
                      <span className="font-bold  capitalize">detail</span>
                      <textarea
                        name="detail"
                        className="border-2 rounded w-full p-2 outline-none"
                        value={foodFormData.detail}
                        onChange={foodInputHandler}
                      />
                    </div>
                    <div className=" ">
                      <label
                        className="font-bold  capitalize"
                        htmlFor="category"
                      >
                        Category:
                      </label>
                      {disableFoodButton && (
                        <div className=" text-red-500 font-bold text-[10px] ">
                          required
                        </div>
                      )}
                      <select
                        id="category"
                        name="category"
                        value={foodFormData.category}
                        onChange={foodInputHandler}
                        className="p-2 rounded border-none outline-none   flex items-center justify-center w-full font-extrabold text-green-500"
                      >
                        <option value="" className="text-red-500 capitalize">
                          select category
                        </option>
                        {categories.map((cat) => (
                          <option
                            className="p-2 outline-none font-bold text-blue-500"
                            key={cat.id}
                            value={cat.id}
                          >
                            {cat.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className=" ">
                      <label htmlFor="category">Restuarant:</label>
                      <select
                        id="restuarant"
                        name="restuarant"
                        // value={restFormData.manager}
                        // onChange={restInputHandler}
                      >
                        <option
                          className="p-2 outline-none"
                          value={currentRest && currentRest.id}
                        >
                          {currentRest && currentRest.name}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="grid gap-2 ">
                    {/* <MapContainer/> */}

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
                              <input
                                onClick={() => setImage(null)}
                                type="button"
                                value="Remove"
                                className=" rounded bg-red-500 hover:bg-red-600 px-3 py-2 mt-2 w-full font-bold text-white "
                              />
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
                <div className="mt-2">
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
                  disabled={disableFoodButton}
                  className={`mt-6 w-full px-2 py-2 rounded-sm text-white font-bold  ${
                    !disableFoodButton
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

export default FoodForm;
