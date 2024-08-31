import React from "react";

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="border-b-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-5 mb-5 bg-slate-200 rounded-lg shadow-xl">
        <div className="detail flex flex-col gap-2 w-full md:w-1/2">
          <p>
            <span className="font-roboto text-lg font-semibold text-slate-600">Name:</span>{" "}
            {element.name}
          </p>
          <p>
            <span className="font-roboto text-lg font-semibold text-slate-600">Email:</span>{" "}
            {element.email}
          </p>
          <p className="text-justify">
            <span className="font-roboto text-lg font-semibold text-slate-600">Cover Letter:</span>{" "}
            {element.coverLetter}
          </p>
        </div>
        <div className="resume flex flex-col md:w-1/2 items-center justify-center">
          <img
            className="cursor-pointer h-56 object-cover rounded-lg"
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployerCard;
