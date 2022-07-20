import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import "../styles/globals.css";
import "fontkiko/css/kiko-all.css";
import "semantic-ui-css/semantic.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import API_URL from "../utils/apiUrl";
import { redirectUser } from "../utils/authUser";
import Navigation from "../components/navigation/navigation.component";
import Footer from "../components/footer/footer.component";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    console.log("user: ", pageProps.user);
  }, [pageProps.user]);

  useEffect(() => {
    setFollowingPosts(pageProps.followingPosts);
  }, [pageProps.followingPosts]);

  return (
    <>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>

      <Navigation
        {...pageProps}
        setLoading={setLoading}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      />
      <Component
        {...pageProps}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      />
      <Footer />
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};
  // const protectedRoutes = ctx.pathname === "/dang-tin";
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
      // if (user && user.currentRole === 3) {
      // redirectUser(ctx, "/nha-moi-gioi");
      // }
      if (user && user.currentRole === 3 && ctx.pathname === "/")
        redirectUser(ctx, "/nha-moi-gioi");
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/");
      console.log(error);
    }
  }
  return { pageProps };
};
