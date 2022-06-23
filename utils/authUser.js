import Router from "next/router";
import cookie from "js-cookie";

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const setToken = (token) => {
  cookie.set("token", token);
};
