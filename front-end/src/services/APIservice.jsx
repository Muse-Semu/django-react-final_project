import axios from "axios";

// const url = "http://127.0.0.1:8000/api/";

export const addFood = async (Food) => {
  const inp = await axios
    .post("http://127.0.0.1:8000/api/foods/", Food)
    .then((res) => res.data);
  return inp;
};

export const editProduct = async (id, Product) => {
  const url = `http://127.0.0.1:8000/api/products/${id}/`;
  const edit = await axios.put(url, Product).then((res) => res.data);
  return edit;
};

export const getSingleProduct = async (id) => {
  const data = await axios
    .get(`http://127.0.0.1:8000/api/products/${id}/`)
    .then((res) => res.data);
  return data;
};

export const deleteProduct = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/products/${id}/`)
    .then((res) => res.data);
};

export const getAllFood = async () => {
  try {
    const data = await axios
      .get("http://127.0.0.1:8000/api/foods/")
      .then((res) => res.data);
    return data;
  } catch (error) {}
};

export const getFoodById = async (id) => {
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/foods/${id}/`)
      .then((res) => res.data);
    return data;
  } catch {}
};

export const getAllRestuarant = async () => {
  try {
    const data = await axios
      .get("http://127.0.0.1:8000/api/restuarants/")
      .then((res) => res.data);
    return data;
  } catch (error) {}
};
export const getRestuarantById = async (id) => {
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/restuarants/${id}/`)
      .then((res) => res.data);
    return data;
  } catch (error) {}
};

export const getPrevOrder = async () => {
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/orders/`)
      .then((res) => res.data);
    return data;
  } catch (error) {}
};

export const addOrder = async (order) => {
  try {
    const inp = await axios
      .post("http://127.0.0.1:8000/api/orders/", order)
      .then((res) => res.data);

    return inp;
  } catch (error) {}
};

export const addOrderItem = async (data) => {
  try {
    const response = await axios
      .post("http://127.0.0.1:8000/api/order_items/", data)
      .then((response) => response.data);

    return response;
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export const getAllOrder = async () => {
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/orders/`)
      .then((res) => res.data);
    return data;
  } catch (error) {}
};

export const getRestuarantByManager = async (man_id) => {
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/rest/${man_id}`)
      .then((res) => res.data);

    const ver = data ? data.length : 0;
    ver > 0 && localStorage.setItem("rest", JSON.stringify(data[0]));
    //  localStorage.setItem("user", JSON.stringify(response.data));

    return ver > 0 && data[0];
  } catch (error) {}
};

export const addRestuarant = async (restuarant) => {
  // console.log(restuarant);
  try {
    const inp = await axios
      .post("http://127.0.0.1:8000/api/restuarants/", restuarant)
      .then((res) => res.data)
      .catch((error) => error.response);

    return inp;
  } catch (error) {}
};

export const getManager = async (id) => {
  console.log(id);
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/managers/${id}`)
      .then((res) => res.data);
    return data;
  } catch (error) {}
};

export const getCategories = async () => {
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/categories/`)
      .then((res) => res.data);
    return data;
  } catch (error) {}
};

export const getMenuOfRestuarant = async (rest_id) => {
  // restuarant/<int:pk>/menu
  // console.log(rest_id);
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/restuarant/${rest_id && rest_id}/menu`)
      .then((res) => res.data);
    data && localStorage.setItem("menu", JSON.stringify(data));
    return data;
  } catch (error) {}
};

export const getOrderByCustomerId = async (customer_id) => {
  try {
    const data = await axios
      .get(
        `http://127.0.0.1:8000/api/orders/customer/${
          customer_id && customer_id
        }/`
      )
      .then((res) => res.data);
    data && localStorage.setItem("menu", JSON.stringify(data));
    return data;
  } catch (error) {}
};

export const editFood = async (id, Food) => {
  try {
    const url = `http://127.0.0.1:8000/api/foods/${id}/`;
    const edit = await axios.put(url, Food).then((res) => res.data);
    return edit;
  } catch (error) {}
};

export const getOrderItemsOfRestuarant = async (rest_id) => {
  try {
    const data = await axios
      .get(`http://127.0.0.1:8000/api/orders/restuarant/${rest_id}/`)
      .then((res) => res.data);
    data && localStorage.setItem("menu", JSON.stringify(data));
    console.log(data);
    return data;
  } catch (error) {}
};
