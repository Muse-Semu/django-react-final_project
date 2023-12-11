import React, { useEffect } from "react";
import { useState } from "react";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFood,
  getCategories,
  getMenuOfRestuarant,
  getRestuarantById,
} from "../services/APIservice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { cartActions } from "../redux/cartSlice";
import FoodDetail from "./FoodDetail";
import { useParams } from "react-router-dom";

function Food() {
  const param = useParams();
  const [food, setFood] = useState([]);
  const foodLength = food && food.length;
  const [foodCategory, setFoodCategory] = useState();
  const [category, setCategory] = useState();
  const [foodCount, setFoodCount] = useState(foodLength);
  const [numberOfFood, setNumberOfFoods] = useState(4);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(false);
  const [foodId, setFoodId] = useState();
  const [rest, setRest] = useState();
  const showDetail = (e, id) => {
    if (e.target.id === "detail") {
      setDetail(true);
      setFoodId(id);
    } else if (e.target.id !== "favButton") {
    }
  };

  function handleLoadMore() {
    setNumberOfFoods(numberOfFood + 4);
  }

   const handeleAddToBasket = (food) => {
    dispatch(
      cartActions.addItem({
        id: food.id,
        name: food.name,
        price: food.price,
        image: food.image,
        quantity: 1,
        restuarant:food.restuarant,
      })
    );
  };

  useEffect(() => {
    if (!param.id) {
      getAllFood().then((response) => setFood(response));
    } else {
      getMenuOfRestuarant(param.id).then((res) => setFood(res));
      getRestuarantById(param.id).then((res) => setRest(res));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    getCategories().then((res) => setCategory(res));
  }, []);

  const filterByType = (category) => {
    
    if (category === "All") {
      setFood(food);
    } else {
      const temp = food.filter((item) => item.category === category);
      setFood(temp);
    }
  };
  // const fR = param.id ? food.filter((item) => item.restuarant.id == param.id ):food;

  return (
    <div className="mx-2 mt-6 mb-9 ">
      <div className="bg-orange-500 p-3 w-full text-white font-extrabold text-2xl ">
        {rest ? rest.name : "All Foods"}
      </div>
      <div>
        {rest && (
          <img
            src={rest.image}
            alt=""
            className="w-full h-[200px] object-cover"
          />
        )}
      </div>

      {/* <div className="mx-2 mt-6 grid lg:grid-cols-6 gap-2">
        {category &&
          category.map((item) => (
            <div className="" key={item.id}>
              <div onClick={()=>filterByType(item.id)} className="flex items-center justify-center border p-3 rounded-full ">
                <button>{item.title}</button>
              </div>
            </div>
          ))}
      </div> */}
      <div>
        {foodLength > 0 ? (
          <>
            {" "}
            <h3 className="ml-6 font-bold text-2xl text-black">
              {foodCategory}
            </h3>
            {/*ALL FOOD DISPLAY  */}
            <div className="grid grid-cols-1 m-3 md:grid-cols-3 items-center justify-center sm:grid-cols-1 lg:grid-cols-4 pt-4 gap-6">
              {food.slice(0, numberOfFood).map((item) => (
                <div
                  key={item.id}
                  className=" bg-gray-50 rounded-lg   shadow-md cursor-pointer
                hover:scale-[1.03] duration-500 relative "
                  onClick={(e) => showDetail(e, item.id)}
                >
                  <img
                    id="detail"
                    className="w-full h-[250px]  object-cover rounded-t-lg cursor-pointer "
                    src={item.image}
                    alt=""
                  />
                  <div className="absolute top-0 h-[50px] w-full  bg-black/50 rounded-t-lg  ">
                    <p className=" m-2 text-center  text-2xl text-white capitalize font-bold">
                      {item.name}
                      {item.restuarant}
                      {/* {item.category.title} */}
                    </p>
                  </div>

                  <div className="flex justify-between items-center  py-3 px-2 rounded-b-lg">
                    <div className="flex gap-2 items-center">
                      <button
                        id="cartButton"
                        onClick={() => handeleAddToBasket(item)}
                        className="border-right  bg-white rounded 
                                font-bold duration-300 p-2 border-2 "
                      >
                        <AiOutlineShoppingCart
                          id="cartButton"
                          size={28}
                          title="Add to Cart"
                          className="font-extrabold  text-yellow-500 hover:text-blue-500 "
                        />{" "}
                      </button>

                      {/* <button id="favButton" className=" p-2 border-2 rounded">
                        <FaHeart
                          id="favButton"
                          size={28}
                          className="text-red-500 font-extrabold hover:text-red-600"
                          onClick={(e) => {
                            console.log(e.target.id);
                          }}
                        />
                      </button> */}
                      {""}
                    </div>

                    <div className="">
                      <span className="text-white    rounded-lg bg-orange-600 text-xl p-1 font-bold">
                        {item.price} ETB
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* {foodLength > numberOfFood && (
              <div>
                <button
                  onClick={handleLoadMore}
                  className="ml-4 border px-4 py-2 flex justify-center items-center"
                >
                  Load More ....
                </button>
              </div>
            )} */}
          </>
        ) : (
          <div className="flex flex-col  my-7 justify-center items-center ">
            <img
              className="w-[150px] h-[150px] "
              src="https://cdn.pixabay.com/photo/2019/02/19/07/23/graphic-4006221_960_720.png"
              alt=""
            />
            <h3 className="flex font-bold text-4xl my-2">
              Not found {foodCategory}
            </h3>
          </div>
        )}
      </div>
      {detail && <FoodDetail setDetail={setDetail} id={foodId} />}
    </div>
  );
}

export default Food;
