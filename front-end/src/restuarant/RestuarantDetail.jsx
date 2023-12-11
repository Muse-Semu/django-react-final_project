import React, { useEffect, useState } from "react";
import { getRestuarantById } from "../services/APIservice";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { restActions } from "../redux/RestuarantSlice";

function RestuarantDetail(props) {
  const navigate = useNavigate();
  // const restInfo = useSelector(state=>state.rest.getRestDetail);
  const [restInfo, setRestInfo] = useState();
  const dispatch = useDispatch();
  const handleShowDetail = () => {
    dispatch(restActions.showRestDetail());
  };
  console.log(props)
  useEffect(() => {
    getRestuarantById(props.restId).then((res) => setRestInfo(res));
  }, []);
  return (
    <div className="w-full h-screen flex fixed justify-center items-center inset-0 backdrop-blur-sm z-20  ">
      <div className="h-[600px] w-[1200px] shadow-md bg-white rounded overflow-y-auto m-2">
        <div className="bg-orange-500 p-3 text-white font-extrabold text-2xl flex justify-between rounded-t sticky top-0">
          <div>Restuarant Detail</div>
          <div>
            <AiOutlineClose
              size={35}
              onClick={handleShowDetail}
              className="flex justify-center items-center bg-black/50 rounded-full p-1 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <img
            src={restInfo && restInfo.image}
            alt=""
            className="w-full object-cover  h-[300px]"
          />
          <div>{restInfo && restInfo.name}</div>
          <div>{restInfo && restInfo.phone}</div>
        </div>
        <button
          onClick={() => {
            navigate(`foods/${props.restId}`);
            handleShowDetail();
          }}
          className=" flex justify-center items-center mt-2 px-2 py-1 w-[50%] border rounded bg-green-500 hover:bg-green-600 "
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

export default RestuarantDetail;
