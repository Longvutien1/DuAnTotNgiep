import React from "react";

import "./css/home.css";
import "./css/footer.css";
import "./css/header.css";
import "./css/welcome.css";
import "./css/learning.css";
import "./css/detailLearning.css";
import "./css/signin.css";
import "./css/signup.css";
import "./css/quiz.css";
import "./css/speaking.css";
import "./css/listen.css";

import "toastr/build/toastr.min.css";

// import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import WebsiteLayout from "./pages/layouts/WebsiteLayout";
import Home from "./pages/Home";
import AdminLayout from "./pages/layouts/AdminLayout";
// import List from './Admin/categories/List';
import Welcome from "./pages/Welcome";
import Learning from "./pages/Learning";
import DetailLearning from "./pages/DetailLearning";
import Contact from "./pages/contact/Contact";
import FileUser from "./pages/FileUser";
import User from "./pages/user/User";
// import Login from './Component/user/Login';
import SignUp from "./Component/user/SignUp";
import ThongKe from "./Component/user/ThongKe";
import ExeQuiz from "./pages/ExeQuiz";
import ExeSpeak from "./pages/ExeSpeak";
import ExeWriteAndListen from "./pages/ExeWriteAndListen";
import Login from "./Component/user/Login";
import ListQuiz from "./pages/admin/quiz/ListQuiz";
import FormQuiz from "./pages/admin/quiz/FormQuiz";

// import Add from './Admin/categories/Add';
import toastr from "toastr";

import Add from "./pages/admin/categories/Add";
import Edit from "./pages/admin/categories/Edit";
import List from "./pages/admin/categories/List";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ListUser from "./features/Admin/Auth/listUser";
import AddUser from "./features/Admin/Auth/AddUser";

// import Edit from './Admin/categories/Edit';
import Store from "./pages/Store";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path="learning" element={<Learning />} />
          <Route path="detailLearning" element={<DetailLearning />} />
          <Route path="detailLearning/quiz" element={<ExeQuiz />} />
          <Route path="detailLearning/speak" element={<ExeSpeak />} />
          <Route
            path="detailLearning/writeAndListen"
            element={<ExeWriteAndListen />}
          />
          <Route path="contact" element={<Contact />} />
          <Route path="fileuser" element={<FileUser />}  />
          <Route path="user" element={<User />} />
          <Route path="store" element={<Store />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="category">
            <Route index element={<List />} />
            <Route path="add" element={<Add />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>

          <Route path="user">
            <Route index element={<ListUser />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>

          <Route path="quiz">
            <Route index element={<ListQuiz />} />
            <Route path="add" element={<FormQuiz />} />
            <Route path=":id/edit" element={<FormQuiz />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
      </Routes>
    </div>
  );
}

export default App;
