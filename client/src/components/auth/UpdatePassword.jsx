import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apis from "../../utils/apis";
import LoadingButton from "../ui/LoadingButton";

const UpdatePassword = () => {

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); 

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(password, confirmPassword); //backend time a ata remove hbe
    // navigate("/login");  //backend time a ata remove hbe

    try {
      setLoading(true);
      const response = await fetch(apis().updatePassword, {
        method: "POST",
        body: JSON.stringify({
          password,
          confirmPassword,
          token: localStorage.getItem("passToken"),
        }),
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
        localStorage.removeItem("email");
        localStorage.removeItem("passToken");
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
            <RxUpdate />
            <p className="auth_heading">New Password</p>
            <p className="auth_title_F">enter at least 6-digit password</p>
          </div>
          <div className="auth_item">
            <label>Password *</label>
            <Input
              onChange={passwordChange}
              type="text"
              required
              placeholder="new password"
            />
          </div>
          <div className="auth_item">
            <label>confirm password *</label>
            <Input
              onChange={confirmPasswordChange}
              type="text"
              placeholder="confirm password"
              required
            />
          </div>
          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title="Update Password" />
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

export default UpdatePassword;