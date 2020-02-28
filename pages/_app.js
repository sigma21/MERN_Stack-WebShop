import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Router from "next/router";

//where the whole page displayed. wrapping around layout to implement the design layout from layout.js
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    //should be executed at the top of the function
    const { token } = parseCookies(ctx); // returns a cookies object with token in it (cookies.token), so we can destructure to access token directly

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      //if user has no token then they should be restricted of navigating protected routes
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname == "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      //attempt to get user's account data with the token
      try {
        //create authorization header
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        const isRoot = user.role === "root";
        const isAdmin = user.role === "admin";
        // if user is not admin or root, should be redirected from create page
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === "/create";
        if (isNotPermitted) {
          redirectUser(ctx, "/");
        }
        // if user is logged in and still trying to access login page, redirect to account page
        if (user && ctx.pathname === "/login") {
          redirectUser(ctx, "/account");
          // Router.push("/account"); cant use router.push in server side of the app, only in client.
        }

        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
        //throw out invalid token if it is manipulated
        destroyCookie(ctx, "token");
        //then redirect to login page
        redirectUser(ctx, "/login");
      }
    }

    return { pageProps }; //short version of {pageProps:pageProps}
  }

  //listener for universal logout
  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }

  syncLogout = event => {
    if (event.key === "logout") {
      Router.push("/login");
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
