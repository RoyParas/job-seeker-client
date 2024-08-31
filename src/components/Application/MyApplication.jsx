import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Appwrapper";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import JobSeekerCard from "./JobSeekerCard";
import EmployerCard from "./EmployerCard";

const MyApplication = () => {

  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized, user } = useContext(Context);
  useEffect(() => {
    try {
      if(user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/application/employer/allApplications", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/application/jobSeeker/allApplications", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [user]);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />
  }

  const deleteApplication = async (id) => {
    try {
      await axios
        .delete(`http://localhost:4000/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="max-container">
      {user && user.role === "Job Seeker" ? (
        <div className="flex flex-col justify-center items-center p-4 relative">
          <h1 className = "font-montserrat text-center font-semibold text-4xl mb-5">My Applications</h1>
          {applications.length > 0 ?  (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          ): (
            <h2 className = "font-roboto text-center font-semibold text-2xl my-2">No Applications Found</h2>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-4">
          <h1 className="font-montserrat text-center font-semibold text-4xl mb-2">Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h2 className="font-roboto text-center font-semibold text-2xl my-2">No Applications Found</h2>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplication;
