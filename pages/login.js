import React from "react";
import LoginRegister from "../components/login-register/login-register.component";
import SubHeader from "../components/sub-header/sub-header.component";

const login = () => {
  return (
    <div>
      <SubHeader title="Đăng nhập Đăng ký" />
      <LoginRegister />
    </div>

    // </LoginRegister>
  );
};

export default login;
