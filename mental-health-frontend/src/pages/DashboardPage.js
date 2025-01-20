import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaComments,
  FaPen,
  FaSmile,
  FaUserMd,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios"; // Import Axios for API calls
import {
  DashboardContainer,
  Header,
  ProfileIcon,
  SearchBar,
  WelcomeText,
  FeatureButtons,
  FeatureCard,
} from "../styles/DashboardStyles";

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  // Fetch username from backend API
  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token"); // Get the JWT token
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
          });
          setUserName(response.data.name); // Set the username from API response
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDropdownClick = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".profile-section")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const features = [
    { name: "Educational Content", icon: <FaBook />, link: "/content" },
    { name: "Peer Chat", icon: <FaComments />, link: "/chat" },
    { name: "Journaling", icon: <FaPen />, link: "/journals" },
    { name: "Relaxation Resources", icon: <FaSmile />, link: "/relaxation" },
    { name: "Therapist Search", icon: <FaUserMd />, link: "/therapists" },
  ];

  const filteredFeatures = features.filter((feature) =>
    feature.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardContainer>
      <Header>
        <div className="welcome-section">
          <WelcomeText>Welcome, {userName || "User"}!</WelcomeText>
          <p>Your personalized mental health platform awaits you.</p>
        </div>
        <div className="utility-section">
          <SearchBar
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ProfileIcon
            className="profile-section"
            onClick={handleDropdownClick}
          >
            <FaUserCircle />
            {isDropdownOpen && (
              <div className="dropdown">
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </ProfileIcon>
        </div>
      </Header>
      <FeatureButtons>
        {filteredFeatures.map((feature, index) => (
          <FeatureCard key={index} to={feature.link}>
            <div className="icon">{feature.icon}</div>
            {feature.name}
          </FeatureCard>
        ))}
      </FeatureButtons>
    </DashboardContainer>
  );
};

export default DashboardPage;