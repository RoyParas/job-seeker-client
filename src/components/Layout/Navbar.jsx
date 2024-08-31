import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../../Appwrapper";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.setItem("authToken", "");
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/getUser", {
        withCredentials: true,
      });
      setUser(response.data.user);
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchUser();
    }
  }, [isAuthorized]);

  return (
    <nav
      className={`${
        isAuthorized ? `flex` : `hidden`
      } justify-between items-center py-2 px-10 bg-slate-100 shadow-3xl mb-3 sticky top-0 w-full`}
    >
      <img src={logo} alt="logo" width={60} className="mix-blend-multiply" />
      <ul
        className={`${
          user && user.role == "Employer" ? `max-lg:hidden` : `max-md:hidden`
        } flex-1 flex justify-center items-center gap-12`}
      >
        <li>
          <Link to={"/"} className="font-montserrat">Home</Link>
        </li>
        <li>
          <Link to={"/job/getall"} className="font-montserrat">All Jobs</Link>
        </li>
        <li>
          <Link to={"/application/me"} className="font-montserrat">
            {user && user.role == "Employer"
              ? "Applicant's Applications"
              : "My Applications"}
          </Link>
        </li>
        {user && user.role == "Employer" ? (
          <>
            <li>
              <Link to={"/job/post"} className="font-montserrat">Post New Job</Link>
            </li>
            <li>
              <Link to={"/job/me"} className="font-montserrat">View Your Jobs</Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
      <button
        onClick={handleLogout}
        className={`${
          user && user.role == "Employer" ? `max-lg:hidden` : `max-md:hidden`
        } border  border-black hover:bg-slate-800 hover:text-white transition duration-400 py-1 px-3 rounded-lg font-montserrat`}
      >
        LogOut
      </button>
      <div className={`${
          user && user.role == "Employer" ? `lg:hidden` : `md:hidden`
        }`}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
