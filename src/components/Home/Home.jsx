import React, {useContext} from "react";
import { Context } from "../../Appwrapper";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategory";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section >
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
      </section>
    </>
  );
};

export default Home;