import axios from "axios";
import React, { useEffect, useState } from "react";
import http from "../services/Common-api";
import { useNavigate } from "react-router-dom";
function Categories() {
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/categories/");
    setCat(res.data);
  };

  console.log(cat);

  return (
    <div className=" shadow-sm w-full  p-2">
      <div className=" font-mono font-bold text-3xl  bg-orange-200 text-white px-2 py-2">
        Product Categories
      </div>
      <div className=" w-[60%] ml-2 mt-3">
        {cat.map((cat) => (
          <div key={cat.id}>
            <h1
              className=" font-bold text-xl px-2 py-2 bg-blue-300 text-green-600 rounded-sm "
              onClick={() => navigate(`categories/${cat.id}`)}
            >
              {cat.title}
            </h1>
          </div>
        ))}
        {cat.map((cat) => (
          <div key={cat.id}>
            <h1
              className=" font-bold text-xl px-2 py-2 bg-blue-300 text-green-600 rounded-sm "
              onClick={() => navigate(`categories/${cat.id}`)}
            >
              {cat.title}
            </h1>
          </div>
        ))}
        {cat.map((cat) => (
          <div key={cat.id}>
            <h1
              className=" font-bold text-xl px-2 py-2 bg-blue-300 text-green-600 rounded-sm "
              onClick={() => navigate(`categories/${cat.id}`)}
            >
              {cat.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
