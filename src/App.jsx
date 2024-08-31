import React, { useEffect, useContext } from "react";
import { Context } from "./Appwrapper.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetail from "./components/Job/JobDetail";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Application from "./components/Application/Application";
import MyApplication from "./components/Application/MyApplication.jsx";
import NotFound from "./components/NotFound/NotFound";
import { Toaster } from "react-hot-toast";

const App = () => {
  // const { isAuthorized, setIsAuthorized, user , setUser } = useContext(Context);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/job/getall" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/job/post" element={<PostJob />} />
            <Route path="/job/me" element={<MyJobs />} />
            <Route path="/application/:id" element={<Application />} />
            <Route path="/application/me" element={<MyApplication />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <Toaster />
    </div>
  );  
};

export default App;