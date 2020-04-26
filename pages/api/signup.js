import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import Cart from "../../models/Cart";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";


export default async (req, res) => {
  await connectDb();

  const { name, email, password } = req.body;
  try {
    //0. validate name email password values
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send("Name must be 3-10 characters.");
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send("Password must be at least 6 characters.");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }
    //1. check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exist with email ${email}`);
    }
    //2. if not hash their password
    const hash = await bcrypt.hash(password, 10);
    //3. create user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    // create a cart for new user
    await new Cart({ user: newUser._id }).save();
    //4. create a token for new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    //5. send back the token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again.");
  }
};
