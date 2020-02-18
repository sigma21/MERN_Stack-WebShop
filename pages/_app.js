import App from "next/app";
import Layout from "../components/_App/Layout";


//where the whole page displayed. wrapping around layout to implement the design layout from layout.js
class MyApp extends App {
  static async getInitialProps({ Component, ctx }){
    let pageProps = {}

    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps} //short version of {pageProps:pageProps}
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    );
  }
}

export default MyApp;
