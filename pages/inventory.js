import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
  Accordion
} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import AddProduct from "../components/Inventory/AddProduct";
import InventoryList from "../components/Inventory/InventoryList";


function Inventory({products, totalPages, user}) {
 
  return (
    <>
    <AddProduct />
    <InventoryList user={user} products={products}/>
    {/* <ProductList products={products} /> */}
    {/* <ProductPagination totalPages={totalPages} /> */}
    </>
  );
}


Inventory.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 90000;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  // fetch data on server
  const response = await axios.get(url, payload);
  // return response data as an object
  return response.data;
  // note: this object will be merged with existing props
};


export default Inventory;
