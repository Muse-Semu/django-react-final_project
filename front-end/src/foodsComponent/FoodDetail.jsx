import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { editFood, getCategories, getFoodById } from "../services/APIservice";
import { useDispatch, useSelector } from "react-redux";
import { boxActions } from "../redux/boxSlice";
import { cartActions } from "../redux/cartSlice";

function FoodDetail(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [foodInfo, setfoodInfo] = useState();
  const [image, setImage] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    getFoodById(props.id).then((res) => setfoodInfo(res));
  }, []);
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
  const user = useSelector((state) => state.auth.user);
  const handleClose = (e) => {
    if (e.target.id === "close") {
      props.setDetail(false);
    }
  };

  const handeleAddToBasket = (food) => {
    dispatch(
      cartActions.addItem({
        id: food.id,
        name: food.name,
        price: food.price,
        image: food.image,
        quantity: 1,
        restuarant: food.restuarant,
      })
    );
  };
  const [foodFormData, setFoodFormData] = useState({
    name: "",
    price: null,
    restuarant: null,
    category: "",
    image: null,
    detail: "",
  });

  const foodInputHandler = (e) => {
    setFoodFormData({
      ...foodFormData,
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

    // setFoodFormData({
    //   ...foodFormData,
    //   image: imageFile,
    // });
  };

  const showEdit = () => {
    setEdit(!edit);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // console.log(data);
     editFood(props.id,formData).then((res) => {
        console.log(res);
        props.setDetail(false)
        dispatch(boxActions.showSuccess("Eddited Successfully"))

     })
  };

  return (
    <div
      id="close"
      className="modal-wrapper "
      onClick={handleClose}
    >
      <div className=" w-[1200px] modal-box pb-3 h-fit">
        <div className="bg-orange-500 p-3  text-white font-extrabold text-2xl flex justify-between rounded-t sticky top-0 capitalize ">
          <div>{foodInfo && foodInfo.name}</div>
          <div>
            <AiOutlineClose
              size={35}
              onClick={() => props.setDetail(false)}
              className="flex justify-center items-center bg-black/50 rounded-full p-1 cursor-pointer"
            />
          </div>
        </div>
        <div>
          <img
            src={foodInfo && foodInfo.image}
            alt=""
            className="w-full object-cover  h-[300px]"
          />
          <div>
            <p>{foodInfo && foodInfo.price} ETB</p>
            <p>{foodInfo && foodInfo.name}</p>
            <p>{foodInfo && foodInfo.detail}</p>
         
          </div>
          <div className="flex items-center justify-center">
            {user && user.user_role === "MANAGER" ? (
              <button
                onClick={showEdit}
                className={`px-3 py-2 bg-orange-500 hover:bg-orange-600 ${
                  edit && "hidden"
                } rounded w-full mx-2 lg:w-[50%]`}
              >
                EDIT
              </button>
            ) : (
              <button className=""></button>
            )}
          </div>
        </div>

        {edit && (
          <div className=" p-2 my-3">
            <div className="bg-blue-500 p-2  text-white font-extrabold text-2xl flex justify-between rounded-t  capitalize ">
              <div>Edit {foodInfo && foodInfo.name}</div>
              <div>
                <AiOutlineClose
                  size={35}
                  onClick={() => showEdit()}
                  className="flex justify-center items-center bg-black/50 rounded-full p-1 cursor-pointer"
                />
              </div>
            </div>
            <form
              action=""
              onSubmit={handleEdit}
              className=" grid lg:grid-cols-2  gap-3"
            >
              <div className="shadow ">
                <div className="grid  p-3 gap-3">
                  <div className="">
                    <span className="font-bold  capitalize">food name</span>

                    <input
                      type="text"
                      name="name"
                      id=""
                      className="border-2 rounded w-full p-2 outline-none"
                      placeholder={foodInfo && foodInfo.name}
                      onChange={foodInputHandler}
                    />
                  </div>

                  <div className="">
                    <span className="font-bold pt-2 capitalize">price</span>

                    <input
                      type="number"
                      name="price"
                      className="border-2 rounded w-full p-1 outline-none"
                      onChange={foodInputHandler}
                      placeholder={foodInfo && foodInfo.price}
                    />
                  </div>

                  <div className=" ">
                    <label className="font-bold  capitalize" htmlFor="category">
                      Category:
                    </label>
                    {/* {disableFoodButton && (
                  <div className=" text-red-500 font-bold text-[10px] ">
                    required
                  </div>
                )} */}
                    <select
                      id="category"
                      name="category"
                      onChange={foodInputHandler}
                      className="p-2 rounded border-none outline-none   flex items-center justify-center w-full font-extrabold text-green-500"
                    >
                      {categories &&
                        categories.map((cat) => (
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

                  <div className="hidden ">
                    <label htmlFor="category">Restuarant:</label>
                    <select
                      id="restuarant"
                      name="restuarant"
                      // value={restFormData.manager}
                      // onChange={restInputHandler}
                    >
                      <option
                        className="p-2 outline-none"
                        value={props.rest.id}
                      >
                        {props.rest.name}
                      </option>
                    </select>
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
                </div>
              </div>

              <div className=" shadow p-2">
                <div className=" ">
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
                  <button
                    // disabled={disableFoodButton}
                    className={`mt-6 w-full px-2 py-2 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-bold `}
                  >
                    Save Changes{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodDetail;
