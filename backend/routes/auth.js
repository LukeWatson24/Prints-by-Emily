const router = require("express").Router();
const passport = require("passport");
const { loginValidation, registerValidation } = require("../validation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Cart = require("../models/Cart");

router.post("/register", async (req, res) => {
  //Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if user already exists
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) return res.status(400).send("Username already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({ user: savedUser });
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({
        errors: "No user found",
        message: "incorrect username or password",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({
        success: `logged in ${user.id}`,
        user: user.id,
        username: user.username,
      });
    });
  })(req, res, next);
});

router.post("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid").json({ success: "user logged out" });
  } catch (err) {
    res.json({ message: err });
  }
});

// router.get("/user", async (req, res) => {
//   const isLogged = await Session.findOne(req.user._id);

//   try {
//     if (isLogged) {
//       const userId = {
//         logged: true,
//         user: req.user._id,
//       };

//       return res.json({ userId });
//     }

//     if (!isLogged) {
//       return res.json({ logged: isLogged });
//     }
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

module.exports = router;
