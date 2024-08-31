import React, { useContext } from "react";
import { Context } from "../../Appwrapper";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer
      className={
        isAuthorized
          ? "w-full flex max-sm:flex-col justify-center items-center gap-x-36 bg-slate-900 text-white font-montserrat py-5"
          : "hidden"
      }
    >
      <div className="max-sm:mb-2">&copy; All Rights Reserved.</div>
      <div className="flex gap-12 text-lg">
        <Link to={""} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={""}>
          <FaYoutube />
        </Link>
        <Link to={""}>
          <FaLinkedin />
        </Link>
        <Link to={""}>
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
