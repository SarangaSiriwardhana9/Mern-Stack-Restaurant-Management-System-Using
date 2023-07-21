const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const jwt = require("jsonwebtoken"); // import JWT library

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8090;
//mongo db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//user schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  confirmPassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

//Api
app.get("/", (req, res) => {
  res.send("server is running");
});

//signup
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email });
    console.log(result);

    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = userModel(req.body);
      const save = await data.save();
      res.send({ message: "Successfully signed up", alert: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", alert: false });
  }
});

//login
//login
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      if (result.password === password) {
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        const token = jwt.sign({ data: dataSend }, process.env.JWT_SECRET);
        res.cookie("jwt", token); // send token in cookie

        // Store isLoggedIn in local storage
        if (typeof window !== "undefined") {
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("userData", JSON.stringify(dataSend));
        }

        res.send({
          message: "User Login Successfull",
          alert: true,
          data: dataSend,
        });
        console.log(dataSend);
      } else {
        res
          .status(401)
          .send({ message: "Incorrect email or password", alert: false });
      }
    } else {
      res
        .status(401)
        .send({ message: "Incorrect email or password", alert: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", alert: false });
  }
});

////////////////////Login API//////////////////////////////////////////////////////////

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

//////////////User Data Api///////////////////////

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//get user data

app.get("/UserData", async (req, res) => {
  try {
    const allUser = await userModel.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

//delete user

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    const deletedUser = await userModel.deleteOne({ _id: userid });
    if (deletedUser.deletedCount === 0) {
      res.status(404).send({ status: "error", data: "User not found" });
    } else {
      res.send({ status: "ok", data: "Deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", data: "Internal server error" });
  }
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//save product in data
//api
app.post("/uploadProduct", async (req, res) => {
  console.log(req.body);
  const data = await productModel(req.body);
  const datasave = await data.save();
  console.log(datasave);
  res.send({ message: "Upload successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});
//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

//*************************************Event Section*****************************************************************************88

//Event Section

const schemaEvent = mongoose.Schema({
  name: String,
  image: String,
  startDate: Date,
  startTime: Date,
  endDate: Date,
  endTime: Date,
  description: String,
});
const eventModel = mongoose.model("event", schemaEvent);

//save event in data
//api
app.post("/uploadEvent", async (req, res) => {
  const { name, image, startDate, startTime, endDate, endTime, description } =
    req.body;

  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);

  const eventData = {
    name,
    image,
    startDate: startDateTime,
    startTime: startDateTime,
    endDate: endDateTime,
    endTime: endDateTime,
    description,
  };

  const event = new eventModel(eventData);
  await event.save();

  res.send({ message: "Event uploaded successfully" });
});

//
app.get("/event", async (req, res) => {
  const data = await eventModel.find({});
  res.send(JSON.stringify(data));
});
//
app.get("/event", async (req, res) => {
  const data = await eventModel.find({});
  res.send(JSON.stringify(data));
});

//get Event data

app.get("/EventData", async (req, res) => {
  try {
    const allEvent = await eventModel.find({});
    res.send({ status: "ok", data: allEvent });
  } catch (error) {
    console.log(error);
  }
});

//delete Event

app.post("/deleteEvent", async (req, res) => {
  const { Eventid } = req.body;
  try {
    const deletedEvent = await eventModel.deleteOne({ _id: Eventid });
    if (deletedEvent.deletedCount === 0) {
      res.status(404).send({ status: "error", data: "Event not found" });
    } else {
      res.send({ status: "ok", data: "Deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", data: "Internal server error" });
  }
});

//server is running
app.listen(PORT, () => console.log("server is running : " + PORT));
