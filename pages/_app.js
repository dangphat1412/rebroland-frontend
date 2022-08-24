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
      {(!pageProps.user || pageProps.user.currentRole !== 1) && (
        <Footer {...pageProps} />
      )}

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

  if (!token) {
    destroyCookie(ctx, "token");
    if (
      !protectedGuestRoutes.includes(ctx.pathname) &&
      (protectedAdminRoutes.includes(ctx.pathname) ||
        protectedBrokerRoutes.includes(ctx.pathname) ||
        protectedUserRoutes.includes(ctx.pathname))
    ) {
      redirectUser(ctx, "/");
    }
  } else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const res = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: token },
      });
      const { user, isBroker, following } = res.data;

      if (
        user &&
        user.currentRole === 3 &&
        !protectedBrokerRoutes.includes(ctx.pathname) &&
        (protectedUserRoutes.includes(ctx.pathname) ||
          protectedAdminRoutes.includes(ctx.pathname))
      )
        redirectUser(ctx, "/nha-moi-gioi");

      if (
        user &&
        user.currentRole === 2 &&
        !protectedUserRoutes.includes(ctx.pathname) &&
        (protectedBrokerRoutes.includes(ctx.pathname) ||
          protectedAdminRoutes.includes(ctx.pathname))
      )
        redirectUser(ctx, "/");

      if (
        user &&
        user.currentRole === 1 &&
        !protectedAdminRoutes.includes(ctx.pathname)
      )
        redirectUser(ctx, "/admin/quan-ly-nguoi-dung");

      pageProps.user = user;
      pageProps.followingPosts = following;
      pageProps.isBroker = isBroker;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/");
      console.log(error);
    }
  }
  return { pageProps };
};

const protectedGuestRoutes = [
  "/",
  "/bat-dong-san",
  "/bat-dong-san/[postId]",
  "/danh-sach-nha-moi-gioi",
  "/danh-sach-nha-moi-gioi/[brokerId]",
  "/chi-tiet-nguoi-dung/[userId]",
  "/lien-he",
];

const protectedUserRoutes = [
  "/",
  "/dang-tin",
  "/bat-dong-san",
  "/bat-dong-san/[postId]",
  "/danh-sach-nha-moi-gioi",
  "/danh-sach-nha-moi-gioi/[brokerId]",
  "/nha-moi-gioi/dang-ky",
  "/trang-ca-nhan/bat-dong-san-cua-toi",
  "/trang-ca-nhan/bat-dong-san-cua-toi/[postId]",
  "/trang-ca-nhan/yeu-cau-lien-he-lai",
  "/chi-tiet-nguoi-dung/[userId]",
  "/trang-ca-nhan/danh-sach-bat-dong-san-da-luu",
  "/trang-ca-nhan/chuyen-khoan",
  "/trang-ca-nhan/nap-tien",
  "/trang-ca-nhan/rut-tien",
  "/trang-ca-nhan/thay-doi-mat-khau",
  "/trang-ca-nhan/thay-doi-so-dien-thoai",
  "/trang-ca-nhan/thong-tin-ca-nhan",
  "/lien-he",
];

const protectedBrokerRoutes = [
  "/nha-moi-gioi",
  "/nha-moi-gioi/bat-dong-san",
  "/nha-moi-gioi/bat-dong-san/[postId]",
  "/nha-moi-gioi/xu-ly-yeu-cau-lien-he-lai",
  "/chi-tiet-nguoi-dung/[userId]",
  "/nha-moi-gioi/cham-soc-khach-hang",
  "/nha-moi-gioi/tao-bai-phai-sinh/[postId]",
  "/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi",
  "/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi/[postId]",
  "/chi-tiet-nguoi-dung/[userId]",
  "/trang-ca-nhan/danh-sach-bat-dong-san-da-luu",
  "/trang-ca-nhan/chuyen-khoan",
  "/trang-ca-nhan/nap-tien",
  "/trang-ca-nhan/rut-tien",
  "/trang-ca-nhan/thay-doi-mat-khau",
  "/trang-ca-nhan/thay-doi-so-dien-thoai",
  "/trang-ca-nhan/thong-tin-ca-nhan",
  "/lien-he",
];

const protectedAdminRoutes = [
  "/admin/quan-ly-bai-dang",
  "/admin/quan-ly-bao-cao",
  "/admin/quan-ly-nguoi-dung",
  "/admin/quan-ly-tai-chinh",
  "/admin/quan-ly-rut-tien",
];
