import jwt from "jsonwebtoken";

import User from "../models/user";
import bcrypt from "bcrypt";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.json({
        message: "User không tồn tại",
      });
    }
    console.log(user.password);
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (match == false) {
      return res.json({
        message: "Mật khẩu không đúng",
      });
    }

    const token = jwt.sign({ _id: user._id }, "123456", { expiresIn: "12h" });
    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Đăng nhập thất bại" });
  }
};

export const signUp = async (req, res) => {

  const { email, username, password } = req.body;
  try {
    // check user exist
    const exisUser = await User.findOne({ email }).exec();
    if (exisUser) {
      return res.json({ message: "User đã tồn tại" });
    }

    // mã hóa pass
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User({ email, password: passwordHash, username }).save();

    // console.log(passwordHash);
    // console.log(user.password);
    res.json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Lỗi rồi" });
  }
};

export const userDetail = async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.params.id }).exec();
    response.json(user);
  } catch (error) {
    response.status(400).json({ message: "Không tìn thấy data" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find().exec();
    res.json(user);
  } catch (error) {
    response.status(400).json({ message: "Không tìm thấy data" });
  }
};

export const userById = async (req, res, next, id) => {
  try {
    const userById = await User.findById(id).exec();
    if (!userById) {
      res.status(400).json({
        message: "Không tìm thấy user",
      });
    }

    req.profile = userById;
    req.profile.password = undefined;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const userByEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userByemail = await User.findOne({ email: email }).exec();
    if (!userByemail) {
       res.json({
        message: "Không tìm thấy user",
      });
    }


    req.profile = userByemail;
    req.profile.password = undefined;
    console.log(req.profile);
    next();
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (request, response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      { new: true }
    );
    response.json(user);
  } catch (error) {
    response.status(400).json({ message: "Không thể sửa" });
  }
};

export const deleteUser = async (request, response) => {

  try {
    const user = await User.findOneAndDelete({ _id: request.params.id });
    response.json(user);
  } catch (error) {
    response.status(400).json({ message: "Không thể xóa" });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // mã hóa pass
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(String(req.body.password), salt);

    
    const userNewPassword = await User.findOneAndUpdate(
      { email: email },
      { password: password },
      { new: true }
    );


    res.json(userNewPassword);
    // console.log(id);
  } catch (error) {
    res.status(400).json({ message: "Lỗi rồi" });
  }
};
