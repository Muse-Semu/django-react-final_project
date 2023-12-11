import React, { useEffect, useState } from "react";
import { AiFillCalculator } from "react-icons/ai";
// import { useCountries } from "use-react-countries";
import {} from "react-icons/fa";
import { BsCardImage, BsLockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import MapContainer from "../foodsComponent/MapContainer";
import { addOrder, addOrderItem } from "../services/APIservice";
import ChapaComponent from "./ChapaComponent";
import { cartActions } from "../redux/cartSlice";
import axios from "axios";
import { boxActions } from "../redux/boxSlice";

function CheckOutForm() {
  // const { countries } = useCountries();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.auth.user);
  const [order, setOrder] = useState();
  const dispatch = useDispatch();

  const updateQty = (action, id) => {
    if (action === "add") {
      dispatch(
        cartActions.addItem({
          id: id,
        })
      );
    } else if (action === "remove") {
      dispatch(cartActions.removeItem(id));
    }
  };

  // console.log(user)

  const saveOrder = (e) => {
    e.preventDefault();
    const orderData = {
      customer: user && user.user_id,
      items: [],
      order_time: new Date().toISOString(),
      payment_method: "Cash",
      total_price: total,
    };

    addOrder(orderData).then((res) => {
      addOrderItems(res.id);
    });

     dispatch(
       boxActions.showSuccess(`Order Added successfully`)
     );
  };

  const addOrderItems = (newOrderId) => {
    for (let i = 0; i < cart.length; i++) {
      const data = {
        food: cart[i].id,
        quantity: cart[i].quantity,
        order: newOrderId,
        order_status: "PENDING",
        price: cart[i].price,
        restuarant: cart[i].restuarant,
      };
      addOrderItem(data);
    }
  };

  // cart.forEach((element) => print(element));

  // function print(element) {
  //   console.log("yes it is working");
  //   console.log(element);
  // }


  

  return (
    <div className=" m-4 ">
      {/* <div className="bg-orange-500 p-3 w-full text-white font-extrabold text-2xl ">
        Checkout
      </div> */}
      {/* <div>
        <img src="" alt="" className="w-full h-[200px] object-cover" />
      </div> */}
      <div className="grid lg:grid-cols-5 gap-2 mt-2 ">
        <div className=" border rounded shadow-md lg:col-span-4 grid  list-none gap-3 lg:h-screen ">
          <div className="shadow-sm text-2xl font-extrabold text-blue-500">
            <p className="p-2  bg-orange-400">Your Cart</p>

            <div className="max-h-[700px] overflow-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className=" rounded p-2 text-xl text-gray-500 hover:text-gray-600 font-bold "
                >
                  <div className="border  rounded  lg:flex gap-6 md:flex ">
                    <img
                      src={item.image}
                      className="h-[250px] w-full object-cover rounded border p-1"
                      alt=""
                    />
                    <div className=" flex  items-center w-full  rounded  ">
                      <div className="ml-4">
                        <p>Name : {item.name}</p>
                        <p>Price : {item.price}</p>
                        <div className="flex gap-2">
                          <p>Quantity: </p>
                          <div>
                            <button
                              onClick={() => updateQty("add", item?.id)}
                              className="px-4  border"
                            >
                              +
                            </button>
                          </div>
                          {item.quantity}
                          <div>
                            <button
                              onClick={() => updateQty("remove", item?.id)}
                              className="px-4  border"
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <p>Subtotal :{item.quantity * item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="shadow-sm text-blue-500  text-2xl font-extrabold">
            <p className=" bg-orange-400 p-2">Delivery Information</p>
            <MapContainer />
          </div> */}
        </div>
        <div className=" p-2 rounded ">
          <div className="shadow-md max-h-[400px] w-full lg:sticky lg:top-[90px] ">
            <div className="w-full rounded p-1 bg-slate-50 font-semibold  ">
              <div className="flex w-full justify-between text-blue-500">
                <p>Subtotal</p>
                <p></p>
              </div>

              <div className="flex w-full justify-between text-blue-500">
                <p>Delivery</p>
                <p>$ 2.5</p>
              </div>

              <div className="flex w-full justify-between text-blue-500">
                <p>Tax</p>
                <p>$ 0</p>
              </div>
              <div className="flex w-full justify-between text-orange-500 pt-2 border-t border-orange-500">
                <p>Total</p>
                <p>${parseFloat(total + 2.5).toFixed(2)}</p>
              </div>
              {/* <ChapaComponent total={total} user={user} /> */}
              <button
                // type="submit"
                className="border rounded bg-blue-500 hover:bg-blue-600 px-3 py-2 w-full text-white font-bold"
                onClick={saveOrder}
              >
               Finish Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutForm;
