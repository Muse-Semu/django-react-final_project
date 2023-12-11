import axios from "axios";
import React from "react";

function ChapaComponent(props) {
  const checkout = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);

    axios.post("http://127.0.0.1:8000/api/checkout",formData).then(res=>console.log(res));
  };


  

  return (
    <div>
      <div>
        <form
          method="POST"
          // action="https://api.chapa.co/v1/hosted/pay"
          target="new"
          onSubmit={checkout}
        >
          {/* <input
            type="hidden"
            name="public_key"
            value="CHAPUBK_TEST-8JpMypbef2swKEW7R4xVgVHzKElpTDTl"
          /> */}
          <input
            type="hidden"
            name="username"
            value={props.user.username}
          />
          <input type="hidden" name="amount" value={props.total} />
          <input type="hidden" name="currency" value="ETB" />
          <input type="hidden" name="email" value={props.user.email} />
          <input type="hidden" name="first_name" value={props.user.first_name} />
          <input type="hidden" name="last_name" value={props.user.last_name} />
          {/* <input
            type="hidden"
            name="title"
            value="I am paying for may orders"
          /> */}
          <input
            type="hidden"
            name="description"
            value="Paying with Confidence with cha"
          />
          <input name="phone" type="number" className="outline-none p-2 m-2 border rounded"/>
          {/* <input
            type="hidden"
            name="logo"
            value="https://chapa.link/asset/images/chapa_swirl.svg"
          /> */}
          {/* <input
            type="hidden"
            name="callback_url"
            value="https://example.com/callbackurl"
          />
          <input
            type="hidden"
            name="return_url"
            value="https://example.com/returnurl"
          /> */}
          {/* <input type="hidden" name="meta[title]" value="test" /> */}
          <button
            type="submit"
            className="border rounded bg-blue-500 hover:bg-blue-600 px-3 py-2 w-full text-white font-bold"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChapaComponent;
