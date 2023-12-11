import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/Auth";
import { boxActions } from "../redux/boxSlice";
import jwtDecode from "jwt-decode";
export default function RegisterForm() {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    email: "",
    password2: "",
    role:"",
  });
  const [errorMsg,setErrorMsg] = useState('')
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState(false);
  const success = useSelector((state) => state.box.isSuccessShow);
  const dispatch = useDispatch();

  const registerInputHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const closeRegisterForm = (e) => {
    dispatch(authActions.showRegisterForm);
  };

  const gotoLogin = () => {
    dispatch(authActions.showLogin);
    dispatch(authActions.showRegisterForm);
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    var formData = new FormData(e.currentTarget);
    if (registerFormData.password !== registerFormData.password2) {
      setFormErrors(true);
      setErrorMsg("Passwords do not match");
      setTimeout(() => {
        setErrorMsg("Try again");
      }, 3000);
    } else {
      axios
        .post(`http://127.0.0.1:8000/api/customers/register`, formData)
        .then(function (response) {
          if (response.data.bool == false) {
            setFormErrors(true);
            setErrorMsg(response.data.null);
            setTimeout(() => {
              setErrorMsg("Try again");
            }, 3000);

            console.log(response.data);
          } else {
            setFormErrors(false);
            setSuccessMsg("You have registered successfully");
            dispatch(
              boxActions.showSuccess("You have registered successfully")
            );
            dispatch(authActions.showLogin());
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // const RegisterForm = useSelector((state) => state.auth.loginForm);

  const disableRegisterButton =
    registerFormData.username === "" ||
    registerFormData.password === "" ||
    registerFormData.email === "" ||
    registerFormData.password2 === "" ||
    registerFormData.role === "";

  const shortPassword = registerFormData.password.length < 8;
  return (
    <div
      // onClick={closeLoginForm}
      className="modal-wrapper  "
    >
      <div className="modal-box ">
        <div className="form-headers ">
          <div>Register</div>
          <div>
            <AiOutlineClose
              id="close"
              size={35}
              onClick={closeRegisterForm}
              className="close-icon"
            />
          </div>
        </div>

        <div
          color="gray"
          className="mt-4 font-normal text-2xl font text-center"
        >
          Enter your credentials.
        </div>
        {formErrors && (
          <div className=" text-red-500 text-center font-bold ">
            {formErrors}
          </div>
        )}
        <form
          method="post"
          className="form-wrapper"
          onSubmit={registerSubmitHandler}
        >
          <div className="mb-4 flex flex-col gap-2">
            <div className="grid">
              <label className="text-black font-bold" htmlFor="">
                Username
              </label>
              <input
                size="lg"
                label="Name"
                className={`${formErrors && `form-error`} form-input`}
                name="username"
                value={registerFormData.username}
                onChange={registerInputHandler}
              />
            </div>

            <>
              <div className="grid">
                <label className="text-black font-bold" htmlFor="">
                  Email
                </label>
                <input
                  type="email"
                  size="lg"
                  label="Email"
                  name="email"
                  className=" form-input"
                  value={registerFormData.email}
                  onChange={registerInputHandler}
                />
              </div>
            </>

            <div className="grid">
              <label className="text-black font-bold" htmlFor="">
                Password
              </label>
              <input
                type="password"
                size="lg"
                label="Password"
                className={`${formErrors && `form-error`} form-input`}
                name="password"
                value={registerFormData.password}
                onChange={registerInputHandler}
              />
            </div>

            <>
              <div className="grid">
                <label className="text-black font-bold" htmlFor="">
                  Confirm Password{" "}
                </label>
                <input
                  type="password"
                  size="lg"
                  label="Password"
                  className=" form-input"
                  name="password2"
                  value={registerFormData.password2}
                  onChange={registerInputHandler}
                />
                <input type="text" name="" />
              </div>
            </>
          </div>
          <div>
            <label htmlFor="category">Register as</label>
            <select name="role" id="" className="">
              <option value="CUSTOMER">Client/Customer</option>
              <option value=" MANAGER">Manager of Restuarant</option>
              <option value="DELIVERER">Delivery Person</option>
            </select>
          </div>
          <div>
            {disableRegisterButton && (
              <div className=" text-red-500 text-center font-bold ">
                All fields are required!{" "}
              </div>
            )}
            {shortPassword && !disableRegisterButton && (
              <div className=" text-red-500 text-center font-bold">
                Password must be atleast 8 characters
              </div>
            )}
          </div>

          <>
            <button
              // onClick={registerSubmitHandler}
              disabled={disableRegisterButton || shortPassword}
              className={`mt-6 w-full  ${
                !disableRegisterButton && !shortPassword
                  ? `submit-btn`
                  : `disable-btn`
              } `}
            >
              Register
            </button>
            <div color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <span
                onClick={() => {
                  gotoLogin();
                }}
                className="cursor-pointer font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Login
              </span>
            </div>
          </>

          
        </form>
      </div>
    </div>
  );
}
