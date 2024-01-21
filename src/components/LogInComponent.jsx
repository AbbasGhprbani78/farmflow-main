
import "../Style/LogInStyle.css";
import React from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Logo from "../Images/homeMain/logo.png";
import Farm1 from "../Images/homeMain/farm1.png";
import Farm2 from "../Images/homeMain/farm2.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IP } from '../App'
import { useNavigate } from "react-router-dom";
import { useMyContext } from "./RoleContext";
import { Link } from "react-router-dom";
export default function LogInComponent() {

  return (
    <div>
      <LogIN>
        <ToastContainer />
      </LogIN>
    </div>
  );
}

function LogIN({ children }) {

  const { sharedData, updateSharedData } = useMyContext();
  const [isPrivate, setIsPerivate] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  function handleToggle() {
    setIsPerivate((e) => !e);
  }

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    const post = { username: username, password: password };
    try {
      const response = await axios.post(`${IP}/login/`, post);

      if (response.status === 200) {

        if (response.data.role === true) {
          toast.success("Successfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log(response);
          window.localStorage.setItem("access", response.data.access);
          window.localStorage.setItem('uuid', response.data.uuid);
          window.localStorage.setItem("refresh", response.data.refresh);
          updateSharedData(response.data.role)
          navigate("/");

        } else {
          toast.success("Successfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          console.log(response);
          window.localStorage.setItem("access", response.data.access);
          window.localStorage.setItem('uuid', response.data.uuid);
          window.localStorage.setItem("refresh", response.data.refresh);
          updateSharedData(response.data.role)
          navigate('/employeesHome')

        }

      }
    } catch (e) {
      toast.error("Login Faild due to :" + e.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Your Username", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Your Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    return result;
  };
  return (
    <>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col
            xs={12}
            xl={3}
            md={4}
            className=" position-relative"
            style={{ textAlign: "center", paddingLeft: 0 }}
          >
            <img src={Logo} alt="Logo" className="d-md-none img-fluid logo"></img>
            <img src={Farm1} alt="Farmimage" className=" mymainbg"></img>
          </Col>
          <Col className="mt-3 mt-md-0" xs={12} xl={9} md={8}>
            <Row>
              <Col xs={12} md={{ span: 8, offset: 2 }}>
                <div className="logo-sign mb-3">
                  <img src="src/Images/header/logo.png" alt="" />
                </div>
                <div className="text-center align-items-center  margin-test mybg p-3">
                  <Form style={{maxWidth:"500px",margin:"0 auto"}} onSubmit={onSubmit}>
                    <h3 className="title "> Sign In</h3>
                    <div className=" border-parent login-input">
                      <span className="onBorder">UserName:</span>
                      <input
                        value={username}
                        type="text"
                        className=" input login-input"
                        onChange={(e) => setUsername(e.target.value)}
                      ></input>
                    </div>
                    <div className="border-parent">
                      <span className="onBorder"> Password: </span>
                      <div className=" login-input">
                        <input
                          value={password}
                          className="w-100 input login-input"
                          type={`${isPrivate ? "password" : "text"}`}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        {isPrivate ? (
                          <FaEye
                            className="setin"
                            color="#6D6D6D"
                            size="1.3rem"
                            onClick={handleToggle}
                          />
                        ) : (
                          <FaEyeSlash
                            className="setin"
                            color="#6D6D6D"
                            size="1.3rem"
                            onClick={handleToggle}
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-100">
                      <Button
                        type="submit"
                        style={{ border: "none" }}
                        className="btn text-light my-5 mybtn signBtn"
                      >
                        SIGN IN
                      </Button>
                    </div>
                    <div className="text-sign mb-5" style={{ textAlign: "center" }}>
                      <span>Do you not already have an account ?</span>
                      <Link style={{ width: "auto" ,fontSize:"1rem"}} to={"/signin"}>sign Up</Link>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="d-md-none footer-img mt-4">
            <img src={Farm2} className=" footer-img" alt="farm"></img>
          </Col>
        </Row>
        {children}
      </Container>
    </>
  );
}
