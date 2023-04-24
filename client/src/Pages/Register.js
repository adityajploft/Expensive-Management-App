import React from "react";
import { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpenner from "../Components/LoadingSpenner";
import '../Style/registerstyle.css'
import NavBar from "../Components/NavBar";
 import Footer from "../Components/Footer";
//---- validation using antDesing-----
// import * as yup from 'yup';

// let schema = yup.object().shape({
//   name: yup.string().min(2).max(25).required("Please enter your name"),
//   email: yup.string().email().required("Please enter your email"),
//   password: yup.string().min(6).required("Please enter your password"),
// });


// -----------end--------



function Register() {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
//-------form validation------------
// const yupSync = {
//   async validator({ field }, value) {
//     await schema.validateSyncAt(field, { [field]: value });
//   },
// };
// const [form] = Form.useForm();

// ----------Form validation---------
  const submitHandler = async (values) => {
    // console.log(values)
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registertion Successful");
      setLoading(false);
      Navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Something waiting Worng");
    }
  };
  // prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      Navigate("/");
    }
  }, [Navigate]);
  return (
    <>
    <NavBar />
    <div className="form-container">
    
        <Form layout="vertical"  onFinish={submitHandler} className="card p-5">
          {loading && <LoadingSpenner />}
          <h1>Register Form </h1>
          <Form.Item label="Username" name="name" >
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email" >
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required/>
          </Form.Item>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary">Register</button>
            <Link to="/login">Please Register ? click Here to login</Link>
          </div>
        </Form>
      </div>
      <Footer />
    
   
    </>
  );
}

export default Register;
