import React, { createContext, useState, useEffect } from "react";
import App from "./App.jsx";

export const Context = createContext({
    isAuthorized: false,
    setIsAuthorized: () => {},
    user: {},
    setUser: () => {}
  });
  
  const Appwrapper = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState({});
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthorized(true);
      }
    }, []);

    return (
      <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
        <App />
      </Context.Provider>
    );
  };

export default Appwrapper;