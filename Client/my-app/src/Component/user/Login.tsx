/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { forgotPassword, signIn, signUp } from "../../features/Slide/auth/authSlide";
import { message, Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'
type Props = {};

const fromSchema = yup.object().shape({
  email: yup.string()
    .required("Email is required")
    .email("It not Email"),
  password: yup.string()
    .required("Password is required")
    .min(6, 'Password length should be at least 4 characters'),

})
const validation = { resolver: yupResolver(fromSchema) }


type FormInputs = {
  email: string,
  password: string | number,
}

const Login = (props: Props) => {
  const { register, handleSubmit, formState } = useForm<FormInputs>(validation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormInputs> = async (userForm: any) => {
    console.log(userForm);
    try {
      const { payload } = await dispatch(signIn(userForm))
      // console.log(payload.message);
      if (payload.message) {
        message.error(payload.message);
        // Modal.error({
        //   title: "Account is exist !",
        //   onOk: () => {
        //     // navigate("/login")
        //   }
        // })

      } else {
        console.log(payload);
        localStorage.setItem("user", JSON.stringify(payload))
        message.success('Login successfully !');
        // Modal.success({
        //   title: "Register successfully",
        //   onOk: () => {
        //     // navigate("/login")
        //   }
        // })
        navigate("/")

      }



    } catch (error) {
      alert("Error !!!")
    }
  }

  const handlerLoginFacebook = () => {
    const prodider = new FacebookAuthProvider();
    signInWithPopup(auth, prodider).then((result) => {
      console.log(result);

      const id = result.user.uid;
      const name = result.user.displayName;
      const email = result.user.email;
      const image = result.user.photoURL;
      // console.log(result.user);

      localStorage.setItem("user", JSON.stringify({ id, name, email, image }));
    }).then(() => {

      navigate("/");
    }).catch((error) => {
      console.log(error);

    });
  }
  
  const handlerLoginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // console.log(result);
      const id = result.user.uid;
      const name = result.user.displayName;
      const email = result.user.email;
      const image = result.user.photoURL;
      console.log(result.user);

      localStorage.setItem("user", JSON.stringify({ id, name, email, image }));

    }).then(() => {

      navigate("/");
    })
      .catch((error) => {
        console.log(error);

      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is empty");

    } else {
      console.log("unauthorized");

    }

  })

  // const forgotPassword2 = () => {
  //   Modal.info ({
  //     title:"Forgot Password",
  //     content: (
  //       <form>
  //         <label htmlFor="">Your Email</label>
  //         <input className="p-2  w-full border"  type="email" placeholder="Basic usage" />
  //         {/* <p>some messages...some messages...</p> */}
  //       </form>
  //     ),
  //     onOk() {
  //       dispatch(forgotPassword({email:"tllong20002@gmail.com"}))
  //     },
  //   })
   
  // }

  return (

    <div className="grid grid-cols-12 gap-8 m-auto">
      <div className="signin__form col-span-12 w-10/12 m-auto py-12 mt-8 flex justify-center">
        <div className="signin__main__left  w-full ">
          <div className="text-center ml-24">


            <h1 className="text-3xl font-bold">Signin To Website </h1>
            <div className="signin__main__right__login__google text-center my-6">
              <button onClick={() => handlerLoginFacebook()}><i className="fa-brands fa-facebook" /></button>
              <i className="fa-brands fa-twitter" />
              <button onClick={() => handlerLoginGoogle()}><i className="fa-solid fa-g" /></button>
            </div>
            <p className="text-center">or user email acount</p>


            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="m">
                <input className="p-2 text-white" {...register('email', { required: true })} type="email" placeholder="Email" />
                <div className="text-red-500 float-left text-left px-4">{errors.email?.message}</div>
              </div>

              <div>
                <input className="p-2 text-white" {...register('password', { required: true })} type="password" placeholder="password" />
                <div className="text-red-500 float-left text-left px-4">{errors.password?.message}</div>
              </div>

              <p className="my-6 text-center">
                <Link to={'/forgotPassword'}>Forgot your password?</Link>
              </p>

              <div className="text-center">
                <button className="button p-2 text-white border-1 rounded">Sign in</button>
              </div>
            </form>
          </div>

        </div>
        <div className="signin__main__right w-full my-24">
          <h3 className="text-2xl font-bold text-center">Hello Friend !</h3>
          <p className="signin__main__right__text text-center my-8">
            Enter your personal details start journey with us
          </p>
          <div className="text-center">
            <NavLink to={"/register"} className="button p-2 border-1 rounded">Sign Up</NavLink>
          </div>
        </div>
      </div>
    </div>

  );
};
export default Login;