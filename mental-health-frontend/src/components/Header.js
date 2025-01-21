import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HeaderContainer, WelcomeText, ProfileIcon, SearchBar } from "../styles/HeaderStyles";

const Header = ({ userName, showSearchBar = false, onSearchChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to the login page
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

  return (
    <HeaderContainer>
      <div className="welcome-section">
        <WelcomeText>Welcome, {userName || "User"}!</WelcomeText>
      </div>
      <div className="utility-section">
        {showSearchBar && (
          <SearchBar
            placeholder="Search resources..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        )}
        <button className="return-dashboard-btn" onClick={() => navigate("/dashboard")}>
          <FaHome /> Dashboard
        </button>
        <ProfileIcon className="profile-section" onClick={handleDropdownClick}>
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
    </HeaderContainer>
  );
};

export default Header;