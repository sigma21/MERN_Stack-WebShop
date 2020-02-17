import App from "next/app";
import Layout from "../components/_App/Layout";


//where the whole page displayed. wrapping around layout to implement the design layout from layout.js
class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Layout>
        <Component />;
      </Layout>
    );
  }
}

export default MyApp;
