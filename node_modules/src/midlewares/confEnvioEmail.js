const nodemailer = require("nodemailer");
const dotenv = require("dotenv/config.js");

const transportador  = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

module.exports = transportador;
