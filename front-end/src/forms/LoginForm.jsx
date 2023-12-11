import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/Auth";
import { boxActions } from "../redux/boxSlice";
import jwtDecode from "jwt-decode";
export default function LoginForm() {
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    email: "",
    password2: "",
    role:""
  });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [register, setRegister] = useState(false);
  const success = useSelector((state) => state.box.isSuccessShow);
  const dispatch = useDispatch();

  const loginInputHandler = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const registerInputHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    var formData = new FormData(e.currentTarget);
   
    axios
      .post(`http://127.0.0.1:8000/api/token/`, formData)
      .then((response) => {
        {
          localStorage.setItem("token", JSON.stringify(response.data));
          setFormErrors(false);
          setErrorMsg("");
          setSuccessMsg("Login Successful");
          const decoded = jwtDecode(response.data.access)
        
          dispatch(
            authActions.login({
              username: decoded.username,
              role: decoded.role,
              user_id: decoded.user_id,
              email: decoded.email
            })
          );
         
          if (decoded.role === "MANAGER") {
            navigate(`rest/${decoded.user_id}`);
          }

           dispatch(authActions.showLogin());
           dispatch(
            boxActions.showSuccess(
              `${decoded.username} logged successfully`
            )
          );
        }
      })
      .catch((err) => {
        setFormErrors("enter valid username/password");
        setTimeout(() => {
          setFormErrors("Try Again");
        }, [3000]);
      });

    // axios
    //   .post(`http://127.0.0.1:8000/api/user/login`, formData)
    //   .then((response)=> {
    //     if (response.data.bool == false) {
    //       setFormErrors(true);
    //       setErrorMsg(response.data.null);
    //       setTimeout(() => {
    //         setErrorMsg("Try again");
    //       }, 3000);

    //       console.log(response.data.null);
    //     } else {
    //       setFormErrors(false);
    //       setErrorMsg("");
    //       setSuccessMsg("Login Successful");

    //       dispatch(
    //         authActions.login({
    //           username: response.data.username,
    //           role: response.data.role,
    //           user_id: response.data.user_id,
    //         })
    //       );

    //       // setTimeout(() => {
    //       //   dispatch(boxActions.showSuccess("Logged in "));
    //       // }, 5000);

    //       dispatch(authActions.showLogin());
    //       dispatch(
    //         boxActions.showSuccess(
    //           `${response.data.username} logged successfully`
    //         )
    //       );
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //       if (response.data.role === "MANAGER") {
    //         navigate(`rest/${response.data.user_id}`);
    //       }
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
        .post(`http://127.0.0.1:8000/api/customer/register`, formData)
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

  // const loginForm = useSelector((state) => state.auth.loginForm);

  const closeLoginForm = (e) => {
    dispatch(authActions.showLogin());
  };
  const disableLoginButton =
    loginFormData.username === "" || loginFormData.password === "";
  const disableRegisterButton =
    registerFormData.username === "" ||
    registerFormData.password === "" ||
    registerFormData.email === "" ||
    registerFormData.password2 === "";
  const shortPassword = registerFormData.password.length < 8;
  return (
    <div
      // onClick={closeLoginForm}
      className="modal-wrapper  "
    >
      <div className="modal-box ">
        <div className="form-header">
          <div>{register ? <>Register</> : <>Login</>}</div>
          <div>
            <AiOutlineClose
              id="close"
              size={35}
              onClick={closeLoginForm}
              className="flex justify-center items-center bg-black/50 rounded-full p-1 cursor-pointer"
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
          className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96 p-3"
          onSubmit={register ? registerSubmitHandler : loginSubmitHandler}
        >
          <div className="mb-4 flex flex-col gap-2">
            <div className="grid">
              <label className="form-label" htmlFor="">
                Username
              </label>
              <input
                size="lg"
                label="Name"
                className={`border ${
                  formErrors && `border-red-500`
                } rounded-md p-2 outline-none`}
                name="username"
                value={
                  register ? registerFormData.username : loginFormData.username
                }
                onChange={register ? registerInputHandler : loginInputHandler}
              />
            </div>

            {register && (
              <>
                <div className="grid">
                  <label className="form-label" htmlFor="">
                    Email
                  </label>
                  <input
                    type="email"
                    size="lg"
                    label="Email"
                    name="email"
                    className=" border rounded-md p-2 outline-none"
                    value={registerFormData.email}
                    onChange={registerInputHandler}
                  />
                </div>
              </>
            )}

            <div className="grid">
              <label className="form-label" htmlFor="">
                Password
              </label>
              <input
                type="password"
                size="lg"
                label="Password"
                className={`border ${
                  formErrors && `border-red-500`
                } rounded-md p-2 outline-none`}
                name="password"
                value={
                  register ? registerFormData.password : loginFormData.password
                }
                onChange={register ? registerInputHandler : loginInputHandler}
              />
            </div>
            {register && (
              <>
                <div className="grid">
                  <label className="form-label" htmlFor="">
                    Confirm Password{" "}
                  </label>
                  <input
                    type="password"
                    size="lg"
                    label="Password"
                    className=" border rounded-md p-2 outline-none"
                    name="password2"
                    value={registerFormData.password2}
                    onChange={registerInputHandler}
                  />
                  <input type="text" name="" />
                </div>
                <div className="">
                  <label htmlFor="category" className="form-label">Register as</label>
                  <select name="role" id="role" className="">
                    <option value="CUSTOMER">Client/Customer</option>
                    <option value="DELIVERER">Delivery Person</option>
                  </select>
                </div>
              </>
            )}
          </div>
          {register && (
            <>
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
            </>
          )}
          {register ? (
            <>
              <button
                // onClick={registerSubmitHandler}
                disabled={disableRegisterButton || shortPassword}
                className={`mt-6 w-full px-2 py-2 rounded-sm text-white font-bold  ${
                  !disableRegisterButton && !shortPassword
                    ? `bg-blue-500 hover:bg-blue-600`
                    : `bg-blue-200`
                } `}
              >
                Register
              </button>
              <div color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setRegister(false);
                    setErrorMsg("");
                  }}
                  className="cursor-pointer font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Login
                </span>
              </div>
            </>
          ) : (
            <>
              <button
                disabled={disableLoginButton}
                // onClick={loginSubmitHandler}
                className={`mt-6 w-full px-2 py-2 rounded-sm text-white font-bold  ${
                  !disableLoginButton
                    ? `bg-blue-500 hover:bg-blue-600`
                    : `bg-blue-200`
                } `}
              >
                Login
              </button>
              <div color="gray" className="mt-4 text-center font-normal">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setRegister(true);
                    setErrorMsg("");
                    setFormErrors(false);
                  }}
                  className="cursor-pointer font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Register
                </span>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
