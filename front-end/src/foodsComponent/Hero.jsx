import React, { useEffect, useState } from "react";
import { categories } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { restActions } from "../redux/RestuarantSlice";
import imgOne from "../image/sushi1.jpg";
function Hero() {
  const [index, setIndex] = useState(0);
  const showManager = useSelector((state) => state.rest.managerForm);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (index === categories.length - 1) {
  //       setIndex(0);
  //     } else {
  //       setIndex(index + 1);
  //     }
  //   }, 3000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [index]);

  const handleShowManagerForm = () => {
    dispatch(restActions.showManagerForm());
  };
  return (
    <div className=" m-auto relative">
      <div className="h-[800px] relative rounded-t">
        <div
          className="absolute  w-full h-full text-gray-200  
              bg-black/40 flex flex-col justify-center rounded "
        >
          <div className="grid lg:grid-cols-2 gap-2">
            <div className="items-center justify-center">
              <h1
                className="text-4xl px-4 sm:text-5xl md:text-6xl 
                  lg:text-7xl font-bold"
              >
                {" "}
                The
                <span className="text-orange-500"> Best</span>
              </h1>

              <h1
                className="text-4xl px-4 sm:text-5xl md:text-6xl 
                  lg:text-7xl font-bold"
              >
                <span className="text-orange-500"> Foods </span>
                Delivery In <span className="text-orange-500">Gondar</span>
              </h1>
              <p className="font-bold text-2xl pl-5 max-w-4xl mt-1">
                Ethiopian food makes people think of big family dinners.
              </p>
            </div>
            {/* <div className=" flex justify-center items-center">
              <img
                // src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/Online-delivery-1.png"
                className="h-[400px] object-cover"
                alt="Not FOund"
              />
            </div> */}
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleShowManagerForm}
              className="mx-3 bg-blue-500/40 hover:bg-blue-500/60  font-extrabold px-3 py-2 rounded-md text-xl duration-300 "
            >
              Register Your Restuarant{" "}
            </button>
          </div>
        </div>
        <img
          className="w-full h-full  object-cover p-0 duration-500 ease-in-out"
          // src={categories[index].image}
        src={imgOne}
          alt="/"
        />
      </div>
    </div>
  );
}

export default Hero;
