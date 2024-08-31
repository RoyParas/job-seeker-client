import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import hero from "../../Assets/heroS.jpg";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "123k+",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91k+",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "234k+",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "103k+",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="max-container flex flex-col p-6">
        <div className="flex justify-between items-center max-md:flex-col gap-10 w-full mb-4">
          <div className="flex flex-1 flex-col justify-center max-w-full">
            <h1 className="font-palanquin text-4xl font-bold mb-4">Find a job that suits your interests and skills</h1>
            <p className=" font-montserrat text-lg text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!
            </p>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <img src={hero} alt="hero" width={500}/>
          </div>
        </div>
        <div className='grid sm:grid-cols-4 grid-cols-2 sm:gap-5 gap-10'>
          {details.map((element) => {
            return (
              <div className="flex justify-center items-center" key={element.id}>
                <div className="text-2xl p-2">{element.icon}</div>
                <div>
                  <p className="font-bold font-montserrat">{element.title}</p>
                  <p className="font-roboto text-slate-500">{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;