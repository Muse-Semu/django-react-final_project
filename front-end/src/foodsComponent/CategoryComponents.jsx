import React from "react";
import {categories} from '../data/data'
function CategoryComponents() {
  
  return (
    <div className="max-w-[1640px] px-4 m-auto py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center">Top Rated Menu Items</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-5 flex justify-between item-center"
          >
            <h2 className="font-bold sm:text-xl">{item.name}</h2>
            <img className="w-20" src={item.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryComponents;
