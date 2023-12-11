import React from "react";

function Dashboard() {
  const restuarant = JSON.parse(localStorage.getItem("rest"));

  return (
    <div>
      
      <div>
        <div className=" w-full text-gray-500 bg-blue-300/30 border  font-extrabold z-30  ">
          <p className="text-3xl p-2 ml-3">Dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div></div>
      </div>
    </div>
  );
}

export default Dashboard;
