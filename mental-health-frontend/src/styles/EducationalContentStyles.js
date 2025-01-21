import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 20px;
  background-color: #e9f7ef;
  min-height: 100vh;

   h1 {
    font-size: 28px;
    color: #2d6a4f;
    text-align: center;
    margin-bottom: 20px;
  }

  .content-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
`;
export const EducationalContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin: 10px 0;
    font-size: 18px;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #666;
  }

  a {
    display: inline-block;
    margin-top: 10px;
    font-size: 14px;
    color: #2d6a4f;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  pre {
    text-align: left;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    overflow-x: auto;
  }
`;