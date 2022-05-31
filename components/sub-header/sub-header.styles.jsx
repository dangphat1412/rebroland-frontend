import styled from "styled-components";

export const SubHeaderContainer = styled.div`
  height: 350px;
  width: 100%;
  position: relative;
  padding: 0;
  max-height: 350px;
  overflow: hidden;
  background-image: url("./zyro-image.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  & h1 {
    color: #fff;
    text-transform: uppercase;
    font-size: 60px;
    text-shadow: black 0.1em 0.1em 0.1em;
    position: absolute;
    bottom: 50px;
    left: 100px;
  }
`;
