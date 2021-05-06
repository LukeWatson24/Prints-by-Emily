const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// //Local Strategy
// passport.use(
//   new localStrategy({ usernameField: "email" }, (email, password, done) => {
//     //Match user
//     User.findOne({ email: email })
//       .then((user) => {
//         //Create new user
//         if (!user) {
//           const newUser = new User({ email, password });
//           //Hashing password
//           bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//               if (err) throw err;
//               newUser.password = hash;
//               newUser
//                 .save()
//                 .then((user) => {
//                   return done(null, user);
//                 })
//                 .catch((err) => {
//                   return done(null, false, { message: err });
//                 });
//             });
//           });
//         } else {
//           //Match password
//           bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) throw err;
//             if (isMatch) {
//               return done(null, user);
//             } else {
//               return done(null, false, {
//                 message: "Username + password pair not found",
//               });
//             }
//           });
//         }
//       })
//       .catch((err) => {
//         return done(null, false, { message: err });
//       });
//   })
// );

//Local strategy
passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, username) => {
      if (err) {
        return done(err);
      }

      if (!username) {
        return done(null, false, { message: "Incorrect username" });
      }

      bcrypt.compare(password, username.password, (err, res) => {
        if (err) return done(err);
        if (res === false) {
          return done(null, false);
        } else {
          return done(null, username);
        }
      });
    });
  })
);

module.exports = passport;
