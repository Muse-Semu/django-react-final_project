import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { restActions } from "../redux/RestuarantSlice";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";

function CategoryForm() {
  const dispatch = useDispatch();
  return (
    <div>
      <>
        <div className="modal-wrapper">
          <div className="lg:w-[80%] md:w-[60%]  w-full modal-box">
            <div className="flex justify-between bg-orange-500 p-2  rounded-t-md text-white sticky top-0">
              <h1 className="text-2xl font-extrabold capitalize">
                {" "}
                Add Category{" "}
              </h1>

              <AiOutlineClose
                size={30}
                className="flex justify-center items-center bg-black/50 rounded-full p-2 cursor-pointer"
                onClick={() => dispatch(restActions.handleCategoryForm())}
              />
            </div>

            <form action="">
             
              <div className="mt-3 mx-2 grid gap-2 ">
                <div className="">
                  <span className="font-bold pt-2 capitalize">Title</span>
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
                  <label htmlFor="category">Category:</label>
                </div>
                <div className=" ">
                  <label htmlFor="category">Restuarant:</label>
                  <select
                    id="restuarant"
                    name="restuarant"
                    // value={restFormData.manager}
                    // onChange={restInputHandler}
                  >
                    <option className="p-2 outline-none"></option>
                  </select>
                </div>
              </div>
              <div className="p-2 mt-4">
                <button className="  w-full submit-btn ">ADD</button>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}

export default CategoryForm;
