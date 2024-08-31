import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Appwrapper";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan, FaSquareCheck, FaSquareXmark } from "react-icons/fa6";
// import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const MyJobs = () => {
  const { isAuthorized } = useContext(Context);
  const [jobs, setJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);

  if (!isAuthorized) {
    return <Navigate to={"/"} />
  }

  useEffect(() => {
    try {
      axios
        .get("https://job-seeker-backend-deployment.onrender.com/job/getMyJobs", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs);
        });
    } 
    catch (error) {
      toast.error(error.response.data.message);
      return <Navigate to={"/notfound"} />
    }
  }, []);

  const enableEditing = (id) => {
    setEditingMode(id);
  }

  const disableEditing = (id) => {
    setEditingMode(id);
  }

  const handleUpdate = async(id) => {
    const updatedJob = jobs.find((job) => job._id === id);
    await axios
      .put(`https://job-seeker-backend-deployment.onrender.com/job/update/${id}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  const deleteJob = async (id) => {
    await axios
      .delete(`https://job-seeker-backend-deployment.onrender.com/job/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (id, field, value) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === id ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className = "max-container ">
        <div className = "flex flex-col justify-center items-center p-4">
          <h1 className = "font-montserrat font-semibold text-4xl mb-5">Your Posted Jobs</h1>
          {jobs.length > 0 ? (
            <>
              <div className = "w-full">
                {jobs.map((job) => (
                  <div className="card bg-slate-100 p-3 rounded-lg shadow-lg mb-20" key = {job._id}>
                    <div className="my-2 flex max-sm:flex-col max-sm:items-start items-center">
                      <div className = "text-2xl font-palanquin font-semibold">Title: &nbsp;</div>
                      <input
                        type = "text"
                        className =" text-lg font-roboto pt-2 min-w-72 bg-slate-100"
                        disabled = { editingMode !== job._id ? true : false }
                        value = { job.title }
                        onChange = {(e) => handleInputChange(job._id, "title", e.target.value)}
                      />
                    </div>
                    <div className="my-2 flex max-sm:flex-col max-sm:items-start items-center">
                      <div className = "text-2xl font-palanquin font-semibold">Company: &nbsp;</div>
                      <input
                        type = "text"
                        className =" text-lg font-roboto pt-2 bg-slate-100"
                        disabled = { editingMode !== job._id ? true : false }
                        value = { job.company }
                        onChange = {(e) => handleInputChange(job._id, "title", e.target.value)}
                      />
                    </div>
                    <div className="my-2 flex max-sm:flex-col max-sm:items-start items-center">
                      <div className = "text-2xl font-palanquin font-semibold">Country:  &nbsp;</div>
                      <input
                        type="text"
                        className = " text-lg font-roboto pt-2 bg-slate-100"
                        disabled = { editingMode !== job._id ? true : false }
                        value = {job.country}
                        onChange = {(e) => handleInputChange( job._id, "country", e.target.value )}
                      />
                    </div>
                    <div className="my-2 flex max-sm:flex-col max-sm:items-start items-center">
                      <div className="text-2xl font-palanquin font-semibold">City: &nbsp;</div>
                      <input
                        type="text"
                        className = " text-lg font-roboto pt-2 bg-slate-100"
                        disabled = { editingMode !== job._id ? true : false }
                        value={ job.city }
                        onChange={(e) => handleInputChange( job._id, "city", e.target.value)}
                      />
                    </div>
                    <div className="my-2 flex max-sm:flex-col max-sm:items-start items-center">
                      <div className="text-2xl font-palanquin font-semibold">Category: &nbsp;</div>
                      <input
                        type="text"
                        className = "text-lg font-roboto pt-2 min-w-64 bg-slate-100"
                        value={job.category}
                        onChange={(e) => handleInputChange( job._id, "category", e.target.value)}
                        disabled={ editingMode !== job._id ? true : false }
                      />
                    </div>
                    <div className="my-2 flex items-start">
                      <div className="text-2xl font-palanquin font-semibold">Salary: &nbsp;</div>
                        {job.fixedSalary ? (
                          <input
                            type="number"
                            className=" text-lg font-roboto pt-2 w-20 bg-slate-100"
                            disabled={ editingMode !== job._id ? true : false }
                            value={job.fixedSalary}
                            onChange={(e) => handleInputChange( job._id, "fixedSalary", e.target.value )}
                          />
                        ) : (
                          <div>
                            <input
                              type="number"
                              className = "text-lg font-roboto pt-2 w-20 bg-slate-100"
                              disabled={ editingMode !== job._id ? true : false }
                              value={job.salaryFrom}
                              onChange={(e) => handleInputChange( job._id, "salaryFrom", e.target.value )}
                            />
                            <div className="text-lg font-roboto ps-3">to</div>
                            <input
                              type="number"
                              className = "text-lg font-roboto w-20 bg-slate-100"
                              disabled={ editingMode !== job._id ? true : false }
                              value={job.salaryTo}
                              onChange={(e) => handleInputChange( job._id, "salaryTo", e.target.value )}
                            />
                          </div>
                        )}
                    </div>
                    <div className="my-2 flex max-sm:flex-col max-sm:items-start items-center">
                      <div className="text-2xl font-palanquin font-semibold">Expired: &nbsp;</div>
                      <select
                        className=" text-lg font-roboto pt-2 bg-slate-100"
                        value={job.expired}
                        onChange={(e) => handleInputChange( job._id, "expired", e.target.value)}
                        disabled={ editingMode !== job._id ? true : false}
                      >
                        <option className = " text-lg font-roboto bg-slate-100" value={true}>TRUE</option>
                        <option className = " text-lg font-roboto bg-slate-100" value={false}>FALSE</option>
                      </select>
                    </div>
                    <div className="my-2 flex max-sm:flex-col max-sm:items-start items-center">
                      <div className="text-2xl font-palanquin font-semibold pr-3">Description: &nbsp;</div>
                      <textarea
                        className = "text-lg font-roboto w-full py-2 pe-2 bg-slate-100"
                        value={job.description}
                        disabled={ editingMode !== job._id ? true : false }
                        onChange={(e) => handleInputChange( job._id, "description", e.target.value )}
                      />
                    </div>
                    <div className="my-2 flex max-sm:flex-col max-sm:items-start items-center">
                      <div className="text-2xl font-palanquin font-semibold">Location: &nbsp;</div>
                      <input
                        type="text"
                        className = " text-lg font-roboto min-w-64 pt-2 bg-slate-100"
                        value={job.location}
                        disabled={ editingMode !== job._id ? true : false }
                        onChange={(e) =>handleInputChange( job._id, "location", e.target.value )}
                      />
                    </div>
                    <div className="flex justify-center items-center ">
                      <div>
                        {editingMode === job._id ? (
                          <>
                            <button
                              onClick={() => handleUpdate(job._id)}
                              className="text-2xl mx-3 text-green-400"
                            >
                              <FaSquareCheck />
                            </button>
                            <button
                              onClick={() => disableEditing()}
                              className="text-2xl mx-3 text-red-500"
                            >
                              <FaSquareXmark />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() =>enableEditing(job._id)}
                            className="rounded p-3 text-xl mx-3"
                          >
                            <FaPencilAlt />
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => deleteJob(job._id)}
                        className="rounded p-3 text-xl mx-3"
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="font-montserrat font-semibold text-4xl my-5">
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;