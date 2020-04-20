import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from "../utils/baseUrl";

function Home({ products, totalPages }) {
  //useEffect hook is used as a side effect, when sth is done outside this function & get used inside
  // React.useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts(){
  //   const url="http://localhost:3000/api/products";
  //   const response = await axios.get(url);
  //   console.log(response.data);
  // }

  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>);
}

//with below function we are fetching the json data in the server instead of client
Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  // fetch data on server
  const response = await axios.get(url, payload);
  // return response data as an object
  return response.data;
  // note: this object will be merged with existing props
};

export default Home;
