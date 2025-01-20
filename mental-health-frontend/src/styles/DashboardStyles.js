
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #e6f7e8;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2d6a4f;
  border-radius: 15px;
  color: #fff;
  margin-bottom: 30px;

  .welcome-section {
    h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    p {
      margin: 5px 0 0 0;
      font-size: 16px;
    }
  }

  .utility-section {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

export const WelcomeText = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SearchBar = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 250px;
`;

export const ProfileIcon = styled.div`
  position: relative;

  svg {
    font-size: 40px;
    cursor: pointer;
  }

  .dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;

    button {
      background: none;
      border: none;
      padding: 10px 20px;
      text-align: left;
      width: 100%;
      cursor: pointer;
      font-size: 16px;
    }

    button:hover {
      background: #f0f0f0;
    }
  }
`;

export const FeatureButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

export const FeatureCard = styled(NavLink)`
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;
  min-width: 180px;

  .icon {
    font-size: 36px;
    color: #2d6a4f;
  }

  &:hover {
    background: #eef6ee;
  }
`;

