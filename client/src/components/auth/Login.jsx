import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import toast from "react-hot-toast";
import Input from "../ui/input";
import Button from "../ui/Button";
import LoadingButton from "../ui/LoadingButton";
import apis from "../../utils/apis";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Ensure useNavigate is used correctly

  const emailChange = (e) => setEmail(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apis().loginUser, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) throw new Error(result?.message || "Login failed");

      if (result?.status) {
        toast.success("Login successful!");
        
        // ✅ Store user info and token
        localStorage.setItem("accessToken", result?.token);
        localStorage.setItem("user", JSON.stringify(result?.user));

        // ✅ Ensure redirection to UserPage
        navigate("/user", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="auth_main border-animation">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <IoIosLogIn />
            <p className="auth_heading_RL">Welcome back</p>
            <p className="auth_title_RL">Login to your account!</p>
          </div>
          <div className="auth_item">
            <label>Email *</label>
            <Input
              onChange={emailChange}
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="auth_item">
            <label>Password *</label>
            <Input
              onChange={passwordChange}
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title="Login" />
            </Button>
          </div>
          <div className="auth_options login_auth_options">
            <Link to="/register">Create new account?</Link>
            <Link to="/forget/password">Forgot password?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
