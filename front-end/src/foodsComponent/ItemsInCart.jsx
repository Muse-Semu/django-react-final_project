import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/cartSlice";
function ItemsInBasket() {

  const cart = useSelector(state=>state.cart.items)
  const total = useSelector(state=>state.cart.totalPrice)
  const dispatch = useDispatch()
  const updateQty = (action, id) => {
    if (action === "add") {
      dispatch(cartActions.addItem({
        id:id
      }))
  
    } else if (action === "remove") {
       dispatch(cartActions.removeItem(id))
    }
  };

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(cart));
    const tt = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
  
  }, [cart]);
  return (
    <div>
      <div className=" ">
        <div className="mt-3 h-[400px] overflow-y-auto ">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className=" ">
                <div className="ml-2 my-1 flex gap-2 p-2 items-center border rounded justify-between">
                  <div className="flex gap-2">
                    <img src={item.image} alt="" className="w-10 h-10" />
                    <div className="flex items-start flex-col justify-center ">
                      <p className="font-semibold ">{item.name}</p>
                      <div className="flex gap-2 items-center">
                        <p className="text-[10px]">pr : {item.price}</p>
                        <p className="font-semibold text-[10px] font-mono text-orange-500">
                         
                         { item.price * item.quantity}
                         
                        </p>
                        {/* <p>{item.restuarant}</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 ">
                    <button
                      onClick={() => updateQty("remove", item?.id)}
                      className="px-4  border"
                    >
                      -
                    </button>
                    <p className="font-bold text-orange-600">{item.quantity}</p>
                    <button
                      onClick={() => updateQty("add", item?.id)}
                      className="px-4  border"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center mt-4">
              <img
                className="h-[230px] "
                src="https://cdn.pixabay.com/photo/2017/01/31/21/59/cap-2027575_960_720.png"
                alt=""
              />
              <p className="font-bold  font-mono py-4 text-red-500">
                No foods in your cart
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col  items-center w-full  p-4">
          {cart.length > 0 && (
            <>
              <div className="w-full rounded p-1 bg-slate-50 font-semibold  ">
                <div className="flex w-full justify-between text-blue-500">
                  <p>Subtotal</p>
                  <p></p>
                </div>

                <div className="flex w-full justify-between text-blue-500">
                  <p>Delivery</p>
                  <p> 2.5</p>
                </div>

                <div className="flex w-full justify-between text-blue-500">
                  <p>Tax</p>
                  <p> 0</p>
                </div>
                <div className="flex w-full justify-between text-orange-500 pt-2 border-t border-orange-500">
                  <p>Total</p>
                  <p>${parseFloat(total + 2.5).toFixed(2)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemsInBasket;
