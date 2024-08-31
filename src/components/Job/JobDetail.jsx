import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../Appwrapper";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const JobDetail = () => {
  const [job, setJob] = useState({});
  const { isAuthorized, user } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:4000/job/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setJob(res.data.job);
        });
    } catch (error) {
      return <Navigate to="/notfound" />;
    }
  }, []);

  if (!isAuthorized) return <Navigate to={"/login"} />;
  return (
    <>
      <section className="max-container px-5">
        <div>
          <h3 className="font-montserrat font-semibold text-5xl text-center mb-10">
            Job Details
          </h3>
          <div className="flex flex-col justify-between items-start bg-slate-100 p-5 rounded-lg shadow-xl ">
            <div className="flex max-md:flex-col w-full mb-2">
              <div className="flex max-lg:flex-col justify-start items-baseline w-full">
                <p className="font-palanquin font-bold text-lg w-40">Title: </p>
                <input type="text" defaultValue={job.title} disabled className="font-roboto border-b-2 border-slate-400 h-8 max-md:w-full w-64 p-2" />
              </div>
              <div className="flex max-lg:flex-col justify-start items-baseline w-full">
                <p className="font-palanquin font-bold text-lg w-40">Company: </p>
                <input type="text" disabled defaultValue={job.company} className="font-roboto border-b-2 border-slate-400 h-8 max-md:w-full w-64 p-2" />
              </div>
            </div>
            <div className="flex max-lg:flex-col justify-start items-baseline w-full mb-2">
              <p className="font-palanquin font-bold text-lg w-44">Description: </p>
              <textarea disabled defaultValue={job.description} className="font-roboto w-full p-2 border-b-2 border-slate-400" />
            </div>
            <div className="flex max-md:flex-col w-full mb-2">
              <div className="flex max-lg:flex-col justify-start items-baseline w-full">
                <p className="font-palanquin font-bold text-lg w-40">Category: </p>
                <input type="text" disabled defaultValue={job.category} className="font-roboto border-b-2 border-slate-400 h-8 max-md:w-full w-64 p-2" />
              </div>
              <div className="flex max-lg:flex-col justify-start items-baseline w-full">
                <p className="font-palanquin font-bold text-lg w-40">Location: </p>
                <input type="text" disabled defaultValue={job.location} className="font-roboto border-b-2 border-slate-400 h-8 max-md:w-full w-64 p-2" />
              </div>
            </div>
            <div className="flex max-md:flex-col w-full mb-2">
              <div className="flex max-lg:flex-col justify-start items-baseline w-full">
                <p className="font-palanquin font-bold text-lg w-40">City: </p>
                <input type="text" disabled defaultValue={job.city} className="font-roboto border-b-2 border-slate-400 h-8 max-md:w-full w-64 p-2" />
              </div>
              <div className="flex max-lg:flex-col justify-start items-baseline w-full">
                <p className="font-palanquin font-bold text-lg w-40">Country: </p>
                <input type="text" disabled defaultValue={job.country} className="font-roboto border-b-2 border-slate-400 h-8 max-md:w-full w-64 p-2" />
              </div>
            </div>
            <div className="flex max-md:flex-col w-full mb-2">
              <div className="flex max-lg:flex-col justify-start items-baseline w-full">
                <p className="font-palanquin font-bold text-lg w-40">Job Posted On:</p>
                <input type="text" disabled defaultValue={job.jobPostedOn} className="font-roboto border-b-2 border-slate-400 h-8 max-md:w-full w-64 p-2" />
              </div>
              <div className="flex max-lg:flex-col justify-start items-baseline w-full">
                <p className="font-palanquin font-bold text-lg w-40">Salary: </p>
                {job.fixedSalary ? (
                  <input type="text" disabled defaultValue={`₹ ${job.fixedSalary}`} className="font-roboto border-b-2 border-slate-400 h-8 max-md:w-full w-64 p-2"/>
                ) : (
                  <p className="font-roboto h-8 border-b-2 border-slate-400 max-md:w-full w-64 p-2">
                    ₹{job.salaryFrom} - ₹{job.salaryTo}
                  </p>
                )}
              </div>
            </div>
          </div>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <div className="my-6 text-center">
              <Link
                className="border border-black hover:bg-slate-800 hover:text-white transition duration-400 py-2 px-3 rounded-lg"
                to={`/application/${job._id}`}
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobDetail;
