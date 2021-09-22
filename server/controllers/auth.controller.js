import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../../config/config";

const signIN = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "user not found" });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "password and Email don't match" });
    }
    const token = jwt.sign({ _id: user.id }, config.jwtSecret);

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

/**
 * SignOut the User
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {{message:string}}
 */
const signOut = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "signed out" });
};

/**
 * Check Weather a User Has SignedIn
 * @param {{secret:string,userProperty:string}}
 * @returns {boolean}
 */
const requireSignIn = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

/**
 *
 * @param {object} req -request object
 * @param {object} res - response object
 * @param {function} next 	-this will execute the next function
 * @returns object | function
 */
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  if (!authorized)
    return res.status("403").json({
      error: "User is not authorized",
    });
  next();
};

export default { signIN, signOut, requireSignIn, hasAuthorization };
