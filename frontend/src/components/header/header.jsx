import React, { useEffect, useState, useContext } from "react";
import "./header.css";
import axios from "axios";
import { StoreContext } from "../../context/storeContext";

const Header = () => {
  const { url, token } = useContext(StoreContext);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/api/user/me`, {
          headers: { token },
        });
        if (res.data.success) {
          setUsername(res.data.user.name);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, url]);

  return (
    <div className="header-box">
      <h2>Hello, {username}</h2>
      <p className="header-box-easily">
        Easily track vehicle reminders and calculate toll fees in one place.
      </p>

      <div className="upcoming-section">
        <p className="upcoming-title">Upcoming event</p>

        <div className="event-card">
          <div className="event-info">
            <h4>Honda Civic</h4>
            <p className="event-type">⚙️ Change Oil</p>
          </div>
          <div className="event-date">July 30, 2025</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
