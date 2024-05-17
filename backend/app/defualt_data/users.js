const User = require("../models/User");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
  const AdminInfo = {
    firstName: "Amir",
    lastName: "Akhoundi",
    email: "Admin@gmail.com",
    password: "Admin123*",
    phone: "+358-33-568-110",
    role: "admin",
  };
  let result = await User.findOne({ email: AdminInfo.email });
  if (!result) {
    const hashedPass = await bcrypt.hash(AdminInfo.password, 10);
    const user = new User({ ...AdminInfo, password: hashedPass });
    await user.save();
    console.log("Admin User (Admin@gmail.com) created ");
  }
};

const createDefaultUser = async () => {
  const UserInfo = {
    firstName: "Philip",
    lastName: "Jones",
    email: "philip@gmail.com",
    password: "Philip123*",
    phone: "+358-29-497-050",
  };
  let result = await User.findOne({ email: UserInfo.email });
  if (!result) {
    const hashedPass = await bcrypt.hash(UserInfo.password, 10);
    const user = new User({ ...UserInfo, password: hashedPass });
    await user.save();
    console.log("Defualt User (philip@gmail.com) created");
  }
};


module.exports = { createAdmin, createDefaultUser };