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

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};

    const protectedRoutes = ctx.pathname === "/dang-tin";
    if (!token) {
      destroyCookie(ctx, "token");
      protectedRoutes && redirectUser(ctx, "/login");
    } else {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      try {
        const res = await axios.get(`${API_URL}/api/users`, {
          headers: { Authorization: token },
        });
        const user = res.data;
        console.log("USER: ", user);
        // if (user) !protectedRoutes && redirectUser(ctx, "/");

        pageProps.user = user;
      } catch (error) {
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/");
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Navigation {...pageProps} />
        <Component {...pageProps} />
        <Footer />
      </div>
    );
  }
}

export default MyApp;
