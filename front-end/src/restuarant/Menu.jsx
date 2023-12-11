import React, { useEffect, useState } from "react";
import { getMenuOfRestuarant } from "../services/APIservice";
import FoodDetail from "../foodsComponent/FoodDetail";
import { FaEdit, FaTrash } from "react-icons/fa";

function Menu() {
  const [menu, setMenu] = useState();
  // const detail = useSelector(state=>state.rest.detail);
  const [detail, setDetail] = useState(false);
  const [foodId, setFoodId] = useState();
  const [edit, setEdit] = useState(false);
  const showDetail = (e, id) => {
    console.log(e.target.id);
    if (e.target.id === "detail") {
      setDetail(true);
      setFoodId(id);
      setEdit(true);
    } else if (e.target.id !== "favButton") {
    }
  };

 const restuarant = JSON.parse(localStorage.getItem("rest"));
  // const [rest,setRest] = useState()
  useEffect(() => {
    // const restId = JSON.parse(localStorage.getItem("rest"));

    // console.log(rest[0].id)
    restuarant && getMenuOfRestuarant(restuarant.id).then((res) => setMenu(res));
  }, [restuarant]);


  return (
    <div>
      {menu && (
        <div>
          <div className=" w-full text-gray-500 bg-blue-300/30 border  font-extrabold z-30  ">
            <p className="text-3xl p-2 ml-3">Menu</p>
          </div>
        </div>
      )}
      {/* <div className=" rounded-md shadow-md col-span-3 grid lg:grid-cols-3 list-none gap-3 h-fit mt-2 mx-2">
        {menu &&
          menu.map((item) => (
            <div key={item.id}>
              <div className="border  m-2 h-[300px] hover:bg-slate-50 rounded text-xl text-gray-500 hover:text-gray-600 font-bold">
                <div className="relative">
                  <img
                    src={item.image}
                    alt=""
                    className="h-[300px] w-full  object-cover"
                  />
                  <div className="absolute h-[250px] bg-black/40 rounded w-full top-0 text-white">
                    <div>{item.name}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div> */}

      <div className="grid grid-cols-1 m-3 md:grid-cols-2 items-center justify-center sm:grid-cols-1 lg:grid-cols-3 pt-4 gap-6">
        {menu &&
          menu.map((item) => (
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
                    // onClick={() => handeleAddToBasket(item)}
                    className="border-right  bg-white rounded 
                                font-bold duration-300 p-2 border-2 "
                  >
                    <FaTrash
                      id="cartButton"
                      size={28}
                      title="Delete"
                      className="font-extrabold  text-yellow-500 hover:text-blue-500 "
                    />{" "}
                  </button>

                  <button id="favButton" className=" p-2 border-2 rounded">
                    <FaEdit
                      id="favButton"
                      size={28}
                      className="text-red-500 font-extrabold hover:text-red-600"
                      // onClick={() => {
                      //   editFood(item.id);
                      // }}
                    />
                  </button>
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
      {detail && (
        <FoodDetail
          setDetail={setDetail}
          id={foodId}
          edit={edit}
          rest={restuarant}
        />
      )}
    </div>
  );
}

export default Menu;
