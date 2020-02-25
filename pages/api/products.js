// import products from "../../static/products.json";
import Product from "../../models/Product"
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  //every mongoose method returns a thenable object. so we can use async-await
  const products = await Product.find()
  res.status(200).json(products);
};
