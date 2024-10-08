const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

let app = express();
app.use(cors());

let studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[A-Z][A-Za-z_]{2,29}$/.test(v);
      },
    },
    required: [true, "must enter the name"],
  },

  lastName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[A-Z][A-Za-z_]{2,29}$/.test(v);
      },
    },
    required: [true, "you must enter the name"],
  },

  age: {
    type: Number,
    min: [13, "you are too young "],
    max: [88, "you are too old "],
    required: true,
  },

  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(v);
      },
      message: (props) => {
        `${props.value}is not a valid email`;
      },
    },
    required: [true, "enter email"],
  },

  gender: {
    type: String,
    enum: ["Female", "Male"],
    require: true,
  },

  batchId: String,
});

app.get("/studentData", async (req, res) => {
  let studentArr = await Student.find();
  res.json(studentArr);
});

let Student = mongoose.model("student", studentSchema, "Batch2407");

let insertIntoDB = async () => {
  let kavitha = new Student({
    firstName: "Kavitha",
    lastName: "Nagaraju",
    age: 13,
    email: "kavinagaraju@gmail.com",
    gender: "Female",
    batchId: "MERN2407",
  });

  let kumaari = new Student({
    firstName: "Kumaari",
    lastName: "Uppala",
    age: 88,
    email: "kumaariuppala@gmail.com",
    gender: "Female",
    batchId: "MERN2407",
  });

  let kavya = new Student({
    firstName: "Kavya",
    lastName: "Nagaraju",
    age: 58,
    email: "kavyanagaraju@gmail.com",
    gender: "Female",
    batchId: "MERN2407",
  });
  await Student.insertMany([kavitha, kumaari, kavya]);
};

let connectToMDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://nagarajukavibhavi:nagarajukavibhavi@cluster0.okjzs.mongodb.net/kavitha?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connect to MDB");
    insertIntoDB();
  } catch (error) {
    console.log("Unable to connect to MDB");
    console.log(error);
  }
};
app.listen(4678, () => {
  console.log("Listening to port number 4678");
});

connectToMDB();
