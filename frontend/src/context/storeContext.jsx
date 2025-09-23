// context/storeContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { car_info as fallbackCarInfo } from "../assets/asset";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [car_info, setCarInfo] = useState(fallbackCarInfo);

  // ✅ Load saved token on first render (after refresh)
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // ✅ Fetch cars when token is available (either after login or refresh)
  useEffect(() => {
    if (!token) return;

    const fetchCars = async () => {
      try {
        const res = await axios.post(
          `${url}/api/info/get`,
          {},
          { headers: { token } }
        );

        if (res.data && Array.isArray(res.data.cars)) {
          setCarInfo(res.data.cars);
        } else {
          setCarInfo(fallbackCarInfo);
        }
      } catch (err) {
        console.error("❌ Error fetching cars:", err);
        setCarInfo(fallbackCarInfo);
      }
    };

    fetchCars();
  }, [token]);

  // ✅ When setting token, also save it to localStorage
  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const contextValue = {
    url,
    token,
    setToken: saveToken, // always use this to also save in localStorage
    car_info,
    setCarInfo,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
