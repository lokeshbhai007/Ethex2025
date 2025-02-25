import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import toast from "react-hot-toast";
import apis from "../../utils/apis";
import LoadingButton from "../ui/LoadingButton";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailChnage = (event) => {
    setEmail(event.target.value);
  };

  const passwordChnage = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(apis().loginUser, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false);
      if (!response.ok) {
        throw new Error(result?.message);
      }
      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem("accessToken", result?.token);
        console.log(result);
        navigate("/user");
      }

    } catch (error) {
      toast.error(error.message);
    }

    // console.log(email, password);
  };

  return (
    <div className="auth_main border-animation">
      <form onSubmit={submitHandler}>
        <div className="auth_container ">
          <div className="auth_header">
            <IoIosLogIn />
            <p className="auth_heading_RL">welcome back</p>
            <p className="auth_title_RL">login to your account!</p>
          </div>
          <div className="auth_item">
            <label>Email *</label>
            <Input
              onChange={emailChnage}
              type="email"
              required
              placeholder="enter your email"
            />
          </div>
          <div className="auth_item">
            <label>Password *</label>
            <Input
              onChange={passwordChnage}
              type="password"
              required
              placeholder="enter your password"
            />
          </div>
          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title="Login" />
            </Button>
          </div>
          <div className="auth_options login_auth_options">
            <Link to="/register">Create new account?</Link>
            <Link to="/forget/password">Forget password</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;