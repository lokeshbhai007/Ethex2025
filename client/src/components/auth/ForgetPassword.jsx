import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { MdOutlineAttachEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apis from "../../utils/apis";
import LoadingButton from "../ui/LoadingButton";

const ForgetPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailChnager = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(apis().forgetPassword, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      setLoading(false);

      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem("passToken", result?.token);
        localStorage.setItem("email", email);
        
        // console.log(result);
        
        navigate("/otp/verify");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className="auth_main border-animation">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <MdOutlineAttachEmail />
            <p className="auth_heading_F">Forget your password</p>
            <p className="auth_title_F">
              Enter your registered email
            </p>
          </div>
          <div className="auth_item_F">
            <label>Email *</label>
            <Input
              onChange={emailChnager}
              placeholder="enter your email"
              type="email"
              required
            />
          </div>
          <div className="auth_action">
            <Button>
            <LoadingButton loading={loading} title="Send OTP" />
            </Button>
          </div>
          <div className="back-F-button">
            <BackToLogin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;