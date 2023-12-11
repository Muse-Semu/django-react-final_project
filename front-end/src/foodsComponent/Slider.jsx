import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { categories } from "../data/data";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

import { RxDotFilled } from "react-icons/rx";

function Footer() {
  const [index, setIndex] = useState(0);
   useEffect(() => {
      
   },[])
  return (
    <div className=" max-w-[800px] h-[600px]  w-full m-auto relative py-16 px-4 group">
      <div
        style={{ backgroundImage: `url(${categories[index].image})` }}
        className="w-full h-full rounded-md bg-center bg-cover duration-500  bg-black/40 "
      ></div>
      {index > 0 && (
        <div
          className="hidden group-hover:block absolute top-[50%] left-5 cursor-pointer text-2xl rounded text-white bg-black/20"
          onClick={() => setIndex(index - 1)}
        >
          <FiChevronLeft size={40} />
        </div>
      )}
      {index < categories.length - 1 && (
        <div
          className="hidden group-hover:block absolute top-[50%] right-5 cursor-pointer text-2xl rounded text-white bg-black/20"
          onClick={() => setIndex(index + 1)}
        >
          <FiChevronRight size={40} />
        </div>
      )}

      <div className="flex items-center justify-center text-2xl cursor-pointer">
        {categories.map((category, index) => (
          <div key={index}>
            <RxDotFilled onClick={()=>setIndex(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
