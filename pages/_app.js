import App from "next/app";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import API_URL from "../utils/apiUrl";
import { redirectUser } from "../utils/authUser";
import Navigation from "../components/navigation/navigation.component";
import Footer from "../components/footer/footer.component";
import "react-image-gallery/styles/css/image-gallery.css";
import { useState } from "react";
import LoginRegisterModal from "../components/login-register-modal/login-register-modal.component";
import { Dimmer, Loader } from "semantic-ui-react";

export default function MyApp({ Component, pageProps }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpResetPasswordOpen, setOtpResetPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [otpRegisterOpen, setOtpRegisterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Dimmer active={loading}>
        <Loader/>
      </Dimmer>
      
      <Navigation
        {...pageProps}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
      />
      <Component {...pageProps} />
      <Footer />

      <LoginRegisterModal
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        registerOpen={registerOpen}
        setRegisterOpen={setRegisterOpen}
        forgotPasswordOpen={forgotPasswordOpen}
        setForgotPasswordOpen={setForgotPasswordOpen}
        otpResetPasswordOpen={otpResetPasswordOpen}
        setOtpResetPasswordOpen={setOtpResetPasswordOpen}
        resetPasswordOpen={resetPasswordOpen}
        setResetPasswordOpen={setResetPasswordOpen}
        otpRegisterOpen={otpRegisterOpen}
        setOtpRegisterOpen={setOtpRegisterOpen}
        setLoading={setLoading}
      />
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = { a: [1, 2, 3] };
  const protectedRoutes = ctx.pathname === "/dang-tin";

  if (!token) {
    destroyCookie(ctx, "token");
    protectedRoutes && redirectUser(ctx, "/");
  } else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const res = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: token },
      });
      const user = res.data;
      pageProps.user = user;
      // if (user) !protectedRoutes && redirectUser(ctx, "/");
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/");
    }
  }
  return { pageProps };
};
