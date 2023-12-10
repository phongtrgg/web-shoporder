import React, { useState, useRef, useEffect } from "react";
import {
  useSearchParams,
  Form,
  Link,
  useNavigate,
} from "react-router-dom";
import style from "../css/auth.module.css";
import useRequest from "../hooks/use-request";

//
function AuthForm() {
  const { request, resData, err, status } = useRequest();
  //dùng searchParams để lấy thông tin trang đang ở login hay là signup thông qua url
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  //ref để lấy thông tin người dùng nhập
  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const roleRef = useRef();
  //state này lưu lại lỗi thông tin trong lúc valid
  const [isValidate, setIsValidate] = useState(false);
  const navigate = useNavigate();
  const clear = () => {
    setIsValidate("");
  };

  function submitForm(event) {
    event.preventDefault();
    //nếu mà ko phải trang login
    if (!isLogin) {
      //check xem có email này tồn tại ko nếu có thì trả về thông báo
      if (localStorage.getItem(emailRef.current.value)) {
        setTimeout(clear, 5000);
        return setIsValidate("email đã tồn tại");
      }
      //check độ dài tên
      if (fullnameRef.current.value.trim().length > 15) {
        setTimeout(clear, 5000);
        return setIsValidate("Tên quá dài xin hãy nhập ít hơn 15 ký tự");
      }
      if (fullnameRef.current.value.trim().length === 0) {
        setTimeout(clear, 5000);
        return setIsValidate("Tên không được để trống");
      }
      if (passwordRef.current.value.trim().length <= 5) {
        setTimeout(clear, 5000);
        return setIsValidate("Password phải dài hơn 5 ký tự");
      }
      if (emailRef.current.value.trim().length === 0) {
        setTimeout(clear, 5000);
        return setIsValidate("Email không được bỏ trống");
      }
      if (phoneRef.current.value.trim().length === 0) {
        setTimeout(clear, 5000);
        return setIsValidate("Phone không được để trống");
      }

      //lấy thông tin người dùng nhập vào input
      const newUser = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        phone: phoneRef.current.value,
        fullname: fullnameRef.current.value,
        role: roleRef.current.value,
      };

      request(newUser, "signup");
    }

    //nếu mà người dùng đang ở login
    if (isLogin) {
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      request(data, "login-admin");
    }
  }
  useEffect(() => {
    if (resData && !isLogin && status === 201) {
      alert("Đăng ký thành công");
      emailRef.current.value = "";
      passwordRef.current.value = "";
      phoneRef.current.value = "";
      fullnameRef.current.value = "";
      setIsValidate(false);
      navigate("/");
    }
    if (resData && isLogin && status === 200) {
      alert("Đang nhập thành công");
      localStorage.setItem("session", resData.session);
      localStorage.setItem("role", resData.role);
      setTimeout(() => {
        clearTime();
      }, 360000);
      return navigate("/");
    }
    if (resData && status === 422) {
      setIsValidate(resData.message);
      setTimeout(() => {
        clear();
      }, 5000);
    }
    if (resData && status === 500) {
      setIsValidate(resData.error);
      setTimeout(() => {
        clear();
      }, 5000);
    }
  }, [resData]);

  const clearTime = () => {
    const role = localStorage.getItem("role");
    const session = localStorage.getItem("session");
    if (role) {
      localStorage.remove("role");
    }
    if (session) {
      localStorage.remove("session");
    }
  };

  useEffect(() => {
    request(null, "login");
  }, []);
  console.log(resData);
  return (
    <React.Fragment>
      <div className={style.background}>
        <Form
          method="post"
          className={style.boxForm}
          onSubmit={submitForm}
        >
          <h1>{isLogin ? "Sign in" : "Sign Up"}</h1>
          {!isLogin && (
            <input
              placeholder="Full Name"
              id="fullName"
              type="text"
              required
              name="fullname"
              ref={fullnameRef}
            ></input>
          )}
          <input
            placeholder="Email"
            id="email"
            type="email"
            required
            name="email"
            ref={emailRef}
          ></input>
          <input
            placeholder="Password"
            id="password"
            type="password"
            required
            name="password"
            ref={passwordRef}
          ></input>
          {!isLogin && (
            <input
              placeholder="Phone"
              id="phone"
              type="text"
              // required
              name="phone"
              ref={phoneRef}
            ></input>
          )}
          {!isLogin && (
            <select className={style.select} ref={roleRef}>
              <option>admin</option>
              <option>consultant</option>
            </select>
          )}
          <button>{isLogin ? "SIGN IN" : "SIGN UP"}</button>
          {isValidate && isValidate.length > 0 && (
            <p className={style.validate}>{isValidate}</p>
          )}
        </Form>
      </div>
    </React.Fragment>
  );
}
export default AuthForm;
