import styled from "styled-components";

export const SubHeaderAdminContainer = styled.div`
  height: 250px;
  width: 100%;
  position: relative;
  padding: 0;
  overflow: hidden;
  background-image: url("/zyro-image.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  & h1 {
    font-family: "Tahoma", sans-serif;
    color: #fff;
    font-size: 70px;
    text-shadow: black 0.05em 0.05em 0.05em;
    position: absolute;
    bottom: 50px;
    left: 100px;
  }
  & h3 {
    font-family: "Tahoma", sans-serif;
    color: #fff;
    font-size: 20px;
    text-shadow: black 0.05em 0.05em 0.05em;
    position: absolute;
    bottom: 20px;
    left: 100px;
  }
`;
