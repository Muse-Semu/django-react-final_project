import jwtDecode from "jwt-decode";

export const fetchFood = () => {
  const foodInfo =
    localStorage.getItem("cart") !== "undefined"
      ? JSON.parse(localStorage.getItem("cart"))
      : localStorage.clear();

  return foodInfo ? foodInfo : [];
};

export const totPrice = () => {
  const foodInfo =
    localStorage.getItem("cart") !== "undefined"
      ? JSON.parse(localStorage.getItem("cart"))
      : JSON.parse(localStorage.getItem("cart", []));

  return (
    foodInfo &&
    foodInfo.reduce((acc, curr) => {
      return acc + parseFloat(curr.price).toFixed(2) * curr.quantity;
    }, 0)
  );
};

export const loginStatus = () => {
  const token =
    localStorage.getItem("token") !== "undefined"
      ? JSON.parse(localStorage.getItem("token"))
      : null;
       const decoder = token && (jwtDecode(token.refresh))
       console.log(decoder)
      const user = token ?jwtDecode( token.access):null;

  return user && user;
};


