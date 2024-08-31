import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../../Appwrapper";
import logo from "../../Assets/logo.png";
import login from "../../Assets/login.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/login",
        { email, role, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setRole("");
      setPassword("");
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setIsAuthorized(true);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <>
      <div className="max-container flex justify-evenly items-center w-full min-h-screen ">
        <div className="w-96 px-4 font-montserrat">
          <div className="flex flex-col items-center">
            <img src={logo} alt="logo" className="mb-3" />
            <h3 className=" mb-3 font-semibold text-lg">Login to your Account</h3>
          </div>
          <form>
            <div className="mb-2">
              <label
                className="text-xs font-semibold text-slate-500"
                htmlFor="role"
              >
                Login As
              </label>
              <div className="flex">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-8 rounded-s-lg bg-slate-200 px-2 w-full text-sm focus:outline-none"
                >
                  <option value="" className="text-sm">
                    Select Role
                  </option>
                  <option value="Employer" className="text-sm">
                    Employer
                  </option>
                  <option value="Job Seeker" className="text-sm">
                    Job Seeker
                  </option>
                </select>
                <div className="w-1/12 py-2 px-1 bg-green-300 rounded-e-lg ">
                  <FaRegUser />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <label
                className="text-xs font-semibold text-slate-500"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="h-8 bg-slate-200 px-2 w-full rounded-s-lg text-sm focus:outline-none"
                />
                <div className="w-1/12 py-2 px-1 bg-green-300 rounded-e-lg">
                  <MdOutlineMailOutline />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <label
                className="text-xs font-semibold text-slate-500"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="h-8 bg-slate-200 px-2 w-full rounded-s-lg text-sm focus:outline-none "
                />
                <div className="w-1/12 py-2 px-1 bg-green-300 rounded-e-lg">
                  <RiLock2Fill />
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full bg-green-300 rounded-lg p-1 mt-5 mb-1 focus:outline-none"
            >
              Login
            </button>
          </form>
          <div className="flex justify-end text-sm ">
            <p className="text-slate-600 ">Don't have an account?</p>
            <Link
              to={"/register"}
              className="text-green-600 ps-1 underline hover:text-green-800"
            >
              Register Now
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={login} alt="register-banner" width={400} />
        </div>
      </div>
    </>
  );
};

export default Login;
