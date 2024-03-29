import styled from "styled-components";

const imageBackground = "/zyro-image.png";
// const imageBackground = "/background-broker.jpg";

export const HomeBackgroundContainer = styled.div`
  height: 1500px;
  width: 100%;
  position: relative;
  padding: 0;
  max-height: 680px;
  overflow: hidden;
  background-image: url(${imageBackground});
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
  }
`;
