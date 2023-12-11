import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaBeer, FaHeart, FaShoppingCart } from "react-icons/fa";
import { categories } from "../data/data";
import { useEffect, useState } from "react";
import { data } from "../data/data";
import { getAllRestuarant } from "../services/APIservice";
import RestuarantDetail from "./RestuarantDetail";
import { restActions } from "../redux/RestuarantSlice";
import { useDispatch, useSelector } from "react-redux";
import HowItWork from "../components/HowItWork";

function RestaurantComponent() {
  const [restaurant, setRestaurant] = useState();
  const showRestDetail = useSelector((state) => state.rest.restDetail);
  const [restId,setRestId] = useState()
  const dispatch = useDispatch();
  let tempData;
  const sizeOfData = restaurant && restaurant.length;
  if (sizeOfData) {
    if (sizeOfData < 6) {
      tempData = 3;
    } else if (sizeOfData > 6) {
      tempData = 6;
    }
  }

  const [numberOfFood, setNumberOfFoods] = useState(tempData);
  function handleLoadMore() {
    setNumberOfFoods(numberOfFood + 3);
  }


  const showDetail= (id)=>{
    dispatch(restActions.showRestDetail())
   setRestId(id)
  }

  useEffect(() => {
    getAllRestuarant().then((response) => setRestaurant(response));
  }, []);


  return (
    <div className=" mx-4 mt-4 mb-9">
      <div className="p-2 text-4xl text-white capitalize  font-extrabold mb-4 bg-orange-400 ">
        Top Restaurants
      </div>{" "}
      <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-6 ">
        {restaurant &&
          restaurant.slice(0, numberOfFood).map((rest, index) => (
            <div
              className="rounded-xl relative h-[330px] w-full "
              key={index}
              onClick={() => showDetail(rest.id)}
            >
              <div className="absolute w-full h-full bg-black/50 rounded-xl text-white pt-0">
                <p className="font-bold text-2xl px-2 pt-2">{rest.name}</p>
                <p className="px-2">{rest.description} </p>

                <div className="absolute bottom-4">
                  {/* <button
                    onClick={() => console.log(rest.name)}
                    className="border-right text-black mx-2  bottom-4 bg-white rounded p-2 font-bold h"
                  >
                    <FaShoppingCart className="hover:text-green-400 duration-100" />
                  </button>
                  <button
                    onClick={() => console.log(rest.name)}
                    className="border-right text-black mx-2  bottom-4 bg-white rounded p-2 font-bold h"
                  >
                    <FaHeart className="hover:text-blue-400 duration-75 text-red-500" />
                  </button> */}
                </div>
              </div>

              <img
                className="w-full max-h-[350px] md:max-h-[330px] h-full object-cover rounded-xl"
                src={rest.image}
                alt="/"
              />
            </div>
          ))}
      </div>
      {/* <div>
        {sizeOfData !== numberOfFood && (
          <button onClick={handleLoadMore} className="p-2 rounded">
            Load More
          </button>
        )}
      </div> */}
      {showRestDetail && <RestuarantDetail restId={restId} />}
      <HowItWork />
    </div>
  );
}

export default RestaurantComponent;
