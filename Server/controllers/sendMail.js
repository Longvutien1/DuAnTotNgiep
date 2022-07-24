import Quiz from "../models/quiz";
const nodemailer = require("nodemailer")


export const addMail = async (req, res) => {
   const  {email}  = req.body;
   const {_id} = req.profile
   console.log(_id);
  console.log(email);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "longvtph14046@fpt.edu.vn",
      pass: "giongid123",
    },
  });

  // send mail
  await transporter.sendMail(
    {
      from: "longvtph14046@fpt.edu.vn",
      to: `${email}`,
      subject: "Forgot Password",
      text: "Bạn ",
      html: `<p>Bấm vào  <a href='http://localhost:3000/newPassword/${_id}'>đây</a> để đổi mật khẩu </p>`,
    },
    (err) => {
      if (err) {
        return res.json({ message: "Lỗi rồi", err });
      }
      return res.json({
        message: `Đã gửi mail thành công cho tài khoản ${email}`,
      });
    }
  );
};
