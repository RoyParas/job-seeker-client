import React from "react";

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="border-b-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-5 mb-5 bg-slate-200 rounded-lg shadow-xl">
        <div className="detail flex flex-col gap-2 w-full md:w-1/2">
          <p>
            <span className="font-roboto text-lg font-semibold text-slate-600">
              Name:
            </span>{" "}
            {element.name}
          </p>
          <p>
            <span className="font-roboto text-lg font-semibold text-slate-600">
              Email:
            </span>{" "}
            {element.email}
          </p>
          <p className="text-justify">
            <span className="font-roboto text-lg font-semibold text-slate-600">
              Cover Letter:
            </span>{" "}
            {element.coverLetter}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:w-1/2 gap-5 justify-evenly">
          <div className="resume flex flex-col h-56 max-sm:h-[280px] sm:h-54 md:w-1/2 lg:w-2/6">
            <img
              className="h-full cursor-pointer"
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => deleteApplication(element._id)}
              className="bg-red-500 text-white rounded-lg p-2"
            >
              Delete Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerCard;