import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { addProduct, getCategories } from "../services/APIservice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { restActions } from "../redux/RestuarantSlice";
function ProductForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentRest = useSelector((state) => state.rest.restId);
  const [categories, setCategories] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);
    console.log(data);

    addProduct(formData);
    // navigate("/dashboard");
  };

  const handleShowForm = () => {
    dispatch(restActions.showFoodForm());
  };

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  return (
    <div
      className="flex items-center justify-center w-full m-auto fixed inset-0 z-20 backdrop-blur-sm
       focus:outline-none shadow-lg rounded "
    >
      <div className="lg:w-[50%] md:w-[60%] sm:w-full m-auto mt-8 shadow-lg rounded-md bg-white mx-3 ">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-between bg-orange-500 py-3 px-2 rounded-t-md text-white">
            <h1 className="text-2xl font-extrabold capitalize"> Add Food</h1>

            <AiOutlineClose
              size={30}
              className="flex justify-center items-center bg-black/50 rounded-full p-1 cursor-pointer"
              onClick={handleShowForm}
            />
          </div>
          <div className="mt-3 mx-2 grid gap-2 ">
            <div className="">
              <span className="font-bold pt-2 capitalize">name</span>
              <input
                type="text"
                name="name"
                id=""
                className="border-2 rounded w-full p-1 outline-none"
              />
            </div>
            <div className="">
              <span className="font-bold pt-2 capitalize">detail</span>
              <textarea
                type="text"
                name="detail"
                className="border-2 rounded w-full p-1 outline-none"
              />
            </div>
            <div className="">
              <span className="font-bold pt-2 capitalize">price</span>
              <input
                type="number"
                name="price"
                className="border-2 rounded w-full p-1 outline-none"
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
                // onChange={handleImageChange}
              />
            </div>

            <div className=" ">
              
              <select
                id="category"
                name="category"
                // value={restFormData.manager}
                // onChange={restInputHandler}
              >
                {categories.map((cat) => (
                  <option
                    className="p-2 outline-none"
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
                <option className="p-2 outline-none" value={currentRest.id}>
                  {currentRest.name}
                </option>
              </select>
            </div>
          </div>
          <div className="p-2 mt-4">
            <button className="px-3 py-2 bg-blue-500 rounded w-full font-bold capitalize text-white ">
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
