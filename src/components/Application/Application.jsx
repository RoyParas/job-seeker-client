import React, { useContext, useState } from "react";
import { Context } from "../../Appwrapper";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized } = useContext(Context);

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      await axios
        .post("https://job-seeker-backend-deployment.onrender.com/application/postApplication", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setName("");
          setEmail("");
          setCoverLetter("");
          setResume("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="max-container">
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className = "font-montserrat text-center font-semibold text-4xl mb-2">Application Form</h1>
        <form onSubmit={handleApplication} className="flex flex-col w-full">
          <div className="name flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="name"
            >
              Enter Name:
            </label>
            <input
              type="text"
              className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div className="email flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="email"
            >
              Enter Email:
            </label>
            <input
              type="email"
              className="h-8 rounded bg-slate-200 px-2 w-full text-sm focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
          <div className="coverLetter flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-72"
              htmlFor="coverLetter"
            >
              Cover Letter:
            </label>
            <textarea
              rows={3}
              value={coverLetter}
              className="rounded bg-slate-200 p-2 w-full text-sm focus:outline-none"
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="CoverLetter..."
            />
          </div>
          <div className="resume flex flex-col sm:flex-row mb-4">
            <label
              className="ps-1 font-semibold text-slate-500 w-60"
              htmlFor="resume"
            >
              Select Resume:
            </label>
            <input
              type="file"
              className="text-sm"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
            />
          </div>
          <div className="button flex justify-center items-center">
            <button 
            type="submit" 
            className="border hover:bg-slate-800 hover:text-white border-black transition duration-400 py-1 px-3 rounded-lg font-montserrat">Send Application</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Application;