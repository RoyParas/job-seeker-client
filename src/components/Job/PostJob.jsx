import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Context } from "../../Appwrapper";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/job/postJob",
        fixedSalary ? {
              title,
              company,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              company,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTitle("");
        setCompany("");
        setCategory("");
        setCountry("");
        setCity("");
        setLocation("");
        setDescription("");
        setSalaryType("default");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };


  if (!isAuthorized || (user && user.role !== "Employer")) {
    return <Navigate to={"/"}/>
  }

  return (
    <div className="max-container">
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className = "font-montserrat font-semibold text-4xl mb-2">Post New Job</h1>
        <form onSubmit={handleJobPost} className="flex flex-col w-full">
          <div className="title flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="title"
            >
              Enter Title:
            </label>
            <input
              type="text"
              className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
          </div>
          <div className="company flex flex-col sm:flex-row mb-4">
          <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="company"
            >
              Enter Company Name: 
            </label>
            <input
              type="text"
              className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
            />
          </div>
          <div className="category flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="category"
            >
              Enter Category: 
            </label>
            <input
              type="text"
              className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Job Category"
            />
          </div>
          <div className="country flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="role"
            >
              Country:
            </label>
            <input
              type="text"
              className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </div>
          <div className="city flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1  font-semibold text-slate-500 w-72"
              htmlFor="city"
            >
              City:
            </label>
            <input
              type="text"
              className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </div>
          <div className="location flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="country"
            >
              Location:
            </label>
            <input
              type="text"
              className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div className="salary flex flex-col sm:flex-row mb-4">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className="font-semibold text-slate-500 w-56 focus:outline-none"
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary:</option>
              <option value="Ranged Salary">Ranged Salary:</option>
            </select>
            <div>
              {salaryType === "default" ? (
                <></>
              ) : salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none mx-2"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                />
              ) : (
                <div className="ranged_salary flex">
                  <input
                    type="number"
                    className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none mx-2"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                  />
                  <input
                    type="number"
                    className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none mx-2"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="description flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="description"
            >
              Job Description:
            </label>
            <textarea
              rows={3}
              value={description}
              className="rounded bg-slate-200 p-2 w-full text-sm focus:outline-none"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
          </div>
          <div className="button flex justify-center items-center">
            <button 
            type="submit" 
            className="border hover:bg-slate-800 hover:text-white border-black transition duration-400 py-1 px-3 rounded-lg font-montserrat">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;