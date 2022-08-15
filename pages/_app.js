import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import "../styles/globals.css";
import "fontkiko/css/kiko-all.css";
import "semantic-ui-css/semantic.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import "react-image-lightbox/style.css";
import API_URL from "../utils/apiUrl";
import { redirectUser } from "../utils/authUser";
import Navigation from "../components/navigation/navigation.component";
import Footer from "../components/footer/footer.component";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import LoginRegisterModal from "../components/login-register-modal/login-register-modal.component";

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [followingPosts, setFollowingPosts] = useState([]);

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpForgotPasswordOpen, setOtpForgotPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [otpRegisterOpen, setOtpRegisterOpen] = useState(false);

  useEffect(() => {
    setFollowingPosts(pageProps.followingPosts);
  }, [pageProps.followingPosts]);

  return (
    <>
      <SemanticToastContainer position="bottom-right" maxToasts={1} />
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>

      <Navigation
        {...pageProps}
        toast={toast}
        setLoading={setLoading}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
      />
      <Component
        {...pageProps}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
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
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      />
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes = false;

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
      const { user, isBroker, following } = res.data;
      pageProps.user = user;
      pageProps.followingPosts = following;
      pageProps.isBroker = isBroker;

      if (user && user.currentRole === 3 && ctx.pathname === "/")
        redirectUser(ctx, "/nha-moi-gioi");
      if (
        user &&
        user.currentRole === 1 &&
        !protectedAdminRoutes.includes(ctx.pathname)
      )
        redirectUser(ctx, "/admin/quan-ly-bai-dang");
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/");
      console.log(error);
    }
  }
  return { pageProps };
};

const protectedAdminRoutes = [
  "/admin/quan-ly-bai-dang",
  "/admin/quan-ly-bao-cao",
  "/admin/quan-ly-nguoi-dung",
  "/admin/quan-ly-tai-chinh",
  "/admin/quan-ly-rut-tien",
];
