const { Auth, LoginCredentials } = require("two-step-auth");
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/user";
export const loginEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const login = await Auth(email, "FunEnglish");
    const otp = login.OTP;
    console.log(login);
    // console.log(login.mail);
    // console.log(login.OTP);
    // console.log(login.success);

    // mã hóa otp
    const salt = await bcrypt.genSalt(6);
    console.log(salt);
    const otpHash = await bcrypt.hash(String(otp), salt);


    return res.json({
      otpHash,
      message: `Đã gửi mail thành công cho tài khoản ${email}`,
    });
  } catch (error) {
    return res.status(400).json({ message: "Lỗi rồi!!" });
  }
};

//   // This should have less secure apps enabled
//   LoginCredentials.mailID = "tllong20002@gmail.com";

//   // You can store them in your env variables and
//   // access them, it will work fine
//   LoginCredentials.password = "giongid123";
//   LoginCredentials.use = true;



export const changeOTP = async (req, res) => {
  try {

    const { otp, otpHash } = req.body;
    console.log(req.body.otpHash);
    console.log(req.body);
    const match = await bcrypt.compare(otp, otpHash);
    console.log(match);

    if (match == false) {
      return res.json({
        message: "OTP không đúng",
      });
    }

    

    res.json("OTP chính xác");
  } catch (error) {
    res.status(400).json({ message: "Lỗi rồi" });
  }
}