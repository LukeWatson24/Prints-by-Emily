const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("./passport/setup");
require("dotenv").config();

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Importing routes
const productRoutes = require("./routes/products");
const sign_s3 = require("./uploadController");
const auth = require("./routes/auth");
const order = require("./routes/order");
const cart = require("./routes/cart");

//Connecting to mongoDB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to DB");
  }
);

//Express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoose.connection._connectionString,
    }),
    unset: "destroy",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
    },
  })
);

//BELOW IS COPIED
const corsOptions = {
  origin: /\.your.domain\.com$/, // reqexp will match all prefixes
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

// intercept pre-flight check for all routes
app.options("*", cors(corsOptions));

// add cors middleware to route
app.get("/cookie", cors(corsOptions), (req, res) => {
  const options = {
    secure: false,
    httpOnly: false,
    domain: ".your.domain.com",
  };

  return res
    .cookie("cookieName", "cookieValue", options)
    .status(200)
    .send("cookie sent");
});
//END OF COPY

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//Getting homepage
app.get("/", (req, res) => {
  res.send("Homepage");
});

//Routes
app.use("/api/products", productRoutes);
app.use("/api/sign_s3", sign_s3.sign_s3);
app.use("/api/auth", auth);
app.use("/api/order", order);
app.use("/api/cart", cart);

//Listening
app.listen(3001, () => {
  console.log("Server is up!");
});
