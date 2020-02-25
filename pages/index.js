import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";

function Home({ products }) {
  //useEffect hook is used as a side effect, when sth is done outside this function & get used inside
  // React.useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts(){
  //   const url="http://localhost:3000/api/products";
  //   const response = await axios.get(url);
  //   console.log(response.data);
  // }

  return <ProductList products={products} />;
}

//with below function we are fetching the json data in the server instead of client
Home.getInitialProps = async () => {
  //fetch data on the server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  //return response data as an object(because props is an object)
  //this object will be merged with the existing props (if there is any)
  return { products: response.data };
};

export default Home;
