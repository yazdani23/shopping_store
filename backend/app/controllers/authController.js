// In Controller steht Logische teil von diese api:
const User = require("../models/User"); // import user Model
const jwt = require("jsonwebtoken"); // JSON web Token (jwt) für Token verwalten
const {
  signupValidate,
  resetPasswordValidate,
} = require("../validator/auth.validate"); // validation
const bcrypt = require("bcrypt"); // Passwort Hash
const { sendForgetPasswordLink } = require("./emailController"); // Hanldefunction for send Email for forgetpasswort

/*
 * Route: /signup
 * User signup with this Controller
 */
const signup = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate user request body
    const { error } = signupValidate.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    // prevent signup user with repeative email
    let result = await User.findOne({ email: email });
    if (result) {
      res.status(400).json({
        error: true,
        message: "The email already exist!",
      });
    } else {
      // hash password
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      // create user with body and hashed password
      const user = new User({ ...req.body, password: hashedPass });
      await user.save();
      res.status(201).send({
        message: "Created Account!",
        user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "The error occurred on server" });
  }
};

const login = async (req, res) => {
  // User Daten wurden von body erhalten
  let { email, password } = req.body;
  try {
    // in Collection "User" wird eingegebene email gesucht (findOne)
    // check whether user with this email exist in users collection or not
    let user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(404).json({ message: "The email or password not correct!" });
    } else {
      // check password correction
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(404)
          .json({ message: "The email or password not correct!" });

      // create token with payload userId expired at 30 days
      const payload = { user: { id: user.id } };
      const secretKey=process.env.SECRET_KEY || "Amir#$!@78SDSklqp+";
      const token = jwt.sign(payload, secretKey, {
        expiresIn: "30d",
      });
      res.status(200).json({
        token,
        // response to User:
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
    res.status(500).json({
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
