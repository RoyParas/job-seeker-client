import React from "react";
import { Link } from "react-router-dom";
import notfound from "../../Assets/notfound.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={notfound} className=" mt-10" />
      <Link
        to={"/"}
        className="transition duration-500 ease-in-out border rounded-lg px-4 py-2 bg-green-300 md:text-lg  hover:shadow-md hover:shadow-green-900"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
