import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const infos = [
    {
      id: 1,
      title: "Create Account",
      subTitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.",
      icon: <FaUserPlus />,
    },
    {
      id: 2,
      title: "Apply For Job/ Recruit Suitable Candidates",
      subTitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.",
      icon: <IoMdSend />
    },
    {
      id: 3,
      title: "Find a Job/ Post a Job",
      subTitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.",
      icon: <MdFindInPage />,
    },
  ]
  return (
    <>
      <div className="bg-slate-200">
        <div className="max-container flex flex-col justify-center items-center p-7">
          <h3 className="mb-7 font-montserrat text-3xl sm:text-4xl font-semibold">How JobZee Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-10">
            {infos.map((info) => {
              return (
                <div className="bg-white flex flex-col justify-between items-center text-center px-4 py-4" key={info.id}>
                  <div className="text-3xl my-4">{info.icon}</div>
                  <p className="font-montserrat font-semibold my-2">{info.title}</p>
                  <p className="font-roboto text-slate-500 my-2">{info.subTitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;