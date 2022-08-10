import styled from "styled-components";

export const UserPanelContainer = styled.div`
  .header,
  .button {
    font-family: "Tahoma", san-serif !important;
  }
  img {
    width: 200px !important;
    height: 200px !important;
    margin-bottom: 20px;
  }
  .button {
    background: #ff9219 !important;
    color: #fff !important;
  }

  .title-content {
    background: #ff9219 !important;
    .header {
      color: #fff !important;
    }
  }
  .list {
    & .header {
      display: flex !important;
    }
  }

  .kikor {
    margin-right: 10px;
    font-size: 18px;
  }

  .profilepic {
    cursor: pointer;
  }

  .profilepic:hover .profilepic__content {
    opacity: 1;
  }

  .profilepic:hover .profilepic__image {
    opacity: 0.3;
  }

  .profilepic__image {
    cursor: pointer;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  .profilepic__content {
    position: absolute;
    top: -40px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .profilepic__icon {
    color: black;
    padding-bottom: 8px;
  }

  .profilepic__text {
    font-size: 16px;
    width: 50%;
    text-align: center;
  }
`;
