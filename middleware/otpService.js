const fs = require("fs");
const path = require("path");
const { open } = require("node:fs/promises");

function generateOTP() {
  const length = 6;
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += Math.floor(Math.random() * 10);
  }

  fs.writeFileSync("./otp.txt", OTP);
  return OTP;
}

async function readOTPfile() {
  const file = await open("./otp.txt");
  for await (const line of file.readLines()) {
    return line;
  }
}

module.exports = { generateOTP, readOTPfile };