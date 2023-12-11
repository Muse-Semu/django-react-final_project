import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlinePlusCircle } from "react-icons/ai";
import Menu from "./Menu";
import Dashboard from "./Dashboard";
import ResturantSideMenu from "./ResturantSideBar";
import OredersForRestuarant from "./OredersForRestuarant";
import { getRestuarantByManager } from "../services/APIservice";
import { restActions } from "../redux/RestuarantSlice";
import RestuarantDetail from "./RestuarantDetail";
import CategoryForm from "./CategoryForm";

function RestuarantPage() {
  const isShowMenu = useSelector((state) => state.rest.restMenu);
  const isShowOrders = useSelector((state) => state.rest.showOrders);
  const dashboard = useSelector((state) => state.rest.dashboard.show);
  const showRestDetail = useSelector((state) => state.rest.restDetail);
  const cat = useSelector((state) => state.rest.categoryForm);

  const [sideBar, setSideBar] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const [restuarant, setRest] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getRestuarantByManager(user.user_id).then((res) => setRest(res));
  });

  const handleRestForm = () => {
    dispatch(restActions.showRestuarantForm());
  };

  // console.log(restuarant)

  // const restuarant =
  //   localStorage.getItem("rest") !== "undefined"
  //     ? JSON.parse(localStorage.getItem("rest"))
  //     : JSON.parse(localStorage.getItem("rest", []));

  return (
    <div className=" mb-72 ">
      <div className="sticky z-10 lg:hidden top-[70px]  w-full">
        <div className="bg-orange-500 p-3  text-white font-extrabold text-2xl flex gap-2 items-center ">
          Restuarant Dashboard
        </div>
      </div>
      <div className={`flex  gap-3   lg:m-2 `}>
        <div
          className={`sticky rounded w-0   left-0 list-none  lg:w-[300px] hidden lg:block   z-10 p-2 gap-1 overflow-y-auto`}
        >
          {restuarant ? (
            <ResturantSideMenu setSideBar={setSideBar} />
          ) : (
            <>
              <>
                {/* <AiOutlineMenu size={30} onClick={() => setSideBar(!sideBar)} /> */}
              </>
            </>
          )}
        </div>
        <div
          className={` border rounded  ${
            sideBar ? "" : ""
          }   grid m-2 list-none gap-3 w-[100%] lg:w-[80%]`}
        >
          {restuarant ? (
            <div>
              <div className="relative">
                <img
                  src={restuarant ? restuarant.image : undefined}
                  alt=""
                  className="w-full h-[100px] object-cover"
                />
                <div className="absolute top-0 h-[100px] w-full bg-black/60 text-white font-extrabold flex items-center justify-center ">
                  <div className="text-5xl">
                    {restuarant ? restuarant.name : <></>}
                  </div>
                </div>
              </div>
              {dashboard && <Dashboard />}
              {isShowMenu && (
                <>
                  <Menu />
                </>
              )}
              {isShowOrders && (
                <>
                  <OredersForRestuarant />
                </>
              )}
              {showRestDetail && (
                <>
                  <RestuarantDetail restId={restuarant && restuarant.id} />
                </>
              )}
              {cat && (
                <div>
                  <CategoryForm />
                </div>
              )}
            </div>
          ) : (
            <>
              <h1>No Restuarant is Found</h1>
              <div
                className="px-2 py-1  font-bold capitalize w-full cursor-pointer hover:text-slate-100  flex flex-wrap gap-2 items-center"
                onClick={handleRestForm}
              >
                <AiOutlinePlusCircle />
                Add Restuarant
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestuarantPage;
