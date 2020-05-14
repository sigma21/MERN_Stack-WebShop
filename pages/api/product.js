import Product from "../../models/Product";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  await connectDb();

  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "PATCH":
      await handlePatchRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}

async function handlePostRequest(req, res) {
  const { name, price, quantity, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !quantity || !description || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }
    const product = await new Product({
      name,
      price,
      quantity,
      description,
      mediaUrl
    }).save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating product");
  }
}

async function handlePutRequest(req, res) {
  const { name, price, quantity, description, sku } = req.body;
  try {
    if (!name || !price || !quantity) {
      return res.status(422).send("Product missing one or more fields");
    }
    const product = await Product.findOneAndUpdate({ sku: sku },
      {
        name: name,
        price: price,
        quantity: quantity,
        description: description,
      });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating product");
  }
}

async function handlePatchRequest(req, res) {
  const { sku } = req.body;

  try {
    const product = await Product.findOneAndUpdate({ sku: sku },
      {
        archived: 'true'
      });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error archiving the product");
  }
}
