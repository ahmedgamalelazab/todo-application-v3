const { checkForNull } = require("../utils/checkForNulls");

const User = require("../model/user");

const bcrypt = require("bcrypt");

const {genJwt} = require('../utils/genJWT');

module.exports.register = async (req, res, next) => {
  const { Fname, Lname, email, password } = req.body;

  //checker
  const result = await checkForNull(Fname, Lname, email, password);

  if (result === false) {
    return res.status(400).json({
      success: false,
      data: "bad request",
    });
  } else {
    // here i will deal with the database
    let [user] = await User.query().where({
      email: email,
    });
    console.log(user);
    if (user) {
      return res.status(400).json({
        success: false,
        data: "this email is registered already !",
      });
    }
    //crypt the password
    const salt = await bcrypt.genSalt(15);

    user = await User.query()
      .insert({
        Fname,
        Lname,
        email,
        password: await bcrypt.hash(password, salt),
      })
      .returning("*");

    console.log(user['id']);
    //!jwt
    const jsonToken = await genJwt(user['id']);

    return res.status(200).json({
      data: {
        user,
        jsonToken
      },
    });
  }
};
