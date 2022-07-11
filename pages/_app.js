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
import { useEffect, useState } from "react";
import LoginRegisterModal from "../components/login-register-modal/login-register-modal.component";
import { Dimmer, Loader } from "semantic-ui-react";

export default function MyApp({ Component, pageProps }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpForgotPasswordOpen, setOtpForgotPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [otpRegisterOpen, setOtpRegisterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followingPosts, setFollowingPosts] = useState(
    pageProps.following || []
  );

  useEffect(() => {
    console.log("user: ", pageProps.user);
  }, [pageProps.user]);

  return (
    <>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>

      <Navigation
        {...pageProps}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
        setLoading={setLoading}
      />
      <Component
        {...pageProps}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      />
      <Footer />

      <LoginRegisterModal
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        registerOpen={registerOpen}
        setRegisterOpen={setRegisterOpen}
        forgotPasswordOpen={forgotPasswordOpen}
        setForgotPasswordOpen={setForgotPasswordOpen}
        otpForgotPasswordOpen={otpForgotPasswordOpen}
        setOtpForgotPasswordOpen={setOtpForgotPasswordOpen}
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
  let pageProps = {};
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
      const { user, following, isBroker } = res.data;
      pageProps.user = user;
      pageProps.following = following;
      pageProps.isBroker = isBroker;
      // if (user && user.currentRole === 3) {
      // redirectUser(ctx, "/nha-moi-gioi");
      // }
      if (user)
        user.currentRole === 3 &&
          !ctx.pathname === "/nha-moi-gioi" &&
          redirectUser(ctx, "/nha-moi-gioi");
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/");
      console.log(error);
    }
  }
  return { pageProps };
};
