// In Controller steht Logische teil von diese api:
const User = require("../models/User"); // import user Model
const jwt = require("jsonwebtoken"); // JSON web Token (jwt) für Token verwalten
const {
  signupValidate,
  resetPasswordValidate,
} = require("../validators/auth.validate"); // validation
const bcrypt = require("bcrypt"); // Passwort Hash
const { sendForgetPasswordLink } = require("./emailController"); // Hanldefunction for send Email for forgetpasswort

/*
 * Route: /signup
 * User signup with this Controller
 */
const signup = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase(); // Convert email to lowercase

    // Validate user request body
    const { error } = signupValidate.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    // Prevent signup with a duplicate email
    let result = await User.findOne({ email: email });
    if (result) {
      return res.status(400).json({
        error: true,
        message: "The email already exists!",
      });
    } else {
      // Hash the password
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      // Create user with body and hashed password
      const user = new User({ ...req.body, email, password: hashedPass }); // Store email in lowercase
      await user.save();
      return res.status(201).send({
        message: "Created Account!",
        user,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "An error occurred on the server" });
  }
};

const login = async (req, res) => {
  // Get user data from body
  let { email, password } = req.body;
  email = email.toLowerCase(); // Convert email to lowercase

  try {
    // Check whether a user with this email exists in the users collection
    let user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "The email or password is incorrect!" });
    } else {
      // Check password correctness
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(404)
          .json({ message: "The email or password is incorrect!" });
      }

      // Create token with payload userId, expires in 30 days
      const payload = { user: { id: user.id } };
      const secretKey = process.env.SECRET_KEY || "Amir#$!@78SDSklqp+";
      const token = jwt.sign(payload, secretKey, {
        expiresIn: "30d",
      });

      return res.status(200).json({
        token,
        // Response to user:
        userInfo: {
          fullName: user.firstName + " " + user.lastName,
          phone: user.phone,
          email: user.email,
          role: user.role,
          id: user.id,
          favProductList: user.favProductList,
        },
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};


function createRandomVerifyToken(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const forgetPassword = async (req, res) => {
  const { email } = req.params;
  // check email exist in db or not
  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).send({ message: "no user sign up with this email" });

  //create verify token to send to user with email
  const code = createRandomVerifyToken(20);

  // save verify token in user model
  user.verifyCode = code;
  await user.save();

  // email token to user
  // sendForgetPasswordLink(code, email);
  res.send({ message: "email sent" });
};

// Route: /reset-password
const resetPassword = async (req, res) => {
  const { newPassword, code } = req.body;
  const { error } = resetPasswordValidate.validate({ newPassword });
  if (error) return res.status(400).send({ message: error.message });
  // check Code (ob die User Code in request richtig ist)
  const user = await User.findOne({ verifyCode: code });
  if (!user) return res.status(400).send({ message: "code incorrect" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.verifyCode = undefined;
  await user.save();
  res.send({ message: "password changed" });
};

module.exports = {
  login,
  signup,
  forgetPassword,
  resetPassword,
};
