import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Appwrapper";
import { Navigate, useNavigate } from "react-router-dom";
import { FaLocationDot, FaMoneyBill } from "react-icons/fa6";

const Jobs = () => {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const isAuthorized = useContext(Context);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/job/getAllJobs", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs);
        });
    } catch (error) {
      console.log(err);
    }
  }, []);
  if (!isAuthorized) <Navigate to={"/"} />;
  return (
    <>
      <div className="max-container p-5">
        <div className=" grid grid-cols-2 max-sm:grid-cols-1 gap-10">
          {jobs.map((job) => {
            return (
              <div
                className="bg-slate-100 p-3 rounded-lg shadow-lg cursor-pointer"
                key={job._id} onClick={() => navigate(`/job/${job._id}`)}
              >
                <p className="font-montserrat font-semibold">{job.title}</p>
                <p className="font-palanquin text-slate-400 font-semibold">{job.company}</p>
                <div className="flex justify-between font-roboto">
                  <p className="flex justify-center items-center gap-x-1">
                    <FaLocationDot className="text-xs" />
                    {job.city}
                  </p>
                  {job.fixedSalary ? (
                    <p className="flex justify-center items-center gap-x-2 text-sm text-slate-700">
                      <FaMoneyBill /> ₹{job.fixedSalary}
                    </p>
                  ) : (
                    <p className="flex justify-center items-center gap-x-2 text-sm text-slate-700">
                      <FaMoneyBill />₹{job.salaryFrom} - ₹{job.salaryTo}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Jobs;
