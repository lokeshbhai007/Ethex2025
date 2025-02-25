import React, { useState } from "react";
import "./auth.css";
import Input from "../ui/input";
import { FaFolderPlus } from "react-icons/fa";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const nameChnage = (event) => {
    setName(event.target.value);
  };

  const emailChage = (event) => {
    setEmail(event.target.value);
  };

  const passwordChnage = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(apis().registerUser, {  //fetching the api for register
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false);
      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        toast.success(result?.message);
        navigate("/login");
      }

      // console.log(result);  //this will be remove backend time
      
    } catch (error) {
      toast.error(error.message);
    }

    // console.log(name, email, password);
  };


  return (
    <div className="auth_main border-animation">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <FaFolderPlus />
            <p className="auth_heading_RL">Create Account</p>
            <p className="auth_title_RL">Create your account</p>
          </div>
          <div className="auth_item">
            <label>Name *</label>
            <Input
              onChange={nameChnage}
              type="text"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="auth_item">
            <label>Email *</label>
            <Input
              onChange={emailChage}
              type="email"
              required
              placeholder="Enter your email id"
            />
          </div>
          <div className="auth_item">
            <label>Password *</label>
            <Input
              onChange={passwordChnage}
              type="password"
              required
              placeholder="Enter the password"
            />
          </div>

          <div className="auth_action_R register_auth_action">
            <Button>
            <LoadingButton loading={loading} title="Register" />
            </Button>
            <Button className="register_back_box">
            <BackToLogin />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;