import "../Style/SignUp.css"
import React from 'react';
import Farm1 from "../Images/homeMain/farm1.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IP } from '../App'
import Logo from '../Images/homeMain/logo.png'
import { Link } from "react-router-dom";
;

export default function SignUp() {

    const [isPrivate, setIsPerivate] = useState(true)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [image, setImage] = useState('')
    const [confirmPass, setConfirmPass] = useState();
    const [defaultImg, setDefaultImg] = useState()



    function handleToggle() {
        setIsPerivate((e) => !e);
    }

    function successMessage(text) {
        toast.success(text, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateInputs = () => {

        const inputValidations = [
            { name: 'firstName', regex: /^[a-zA-Z]+$/ },
            { name: 'lastName', regex: /^[a-zA-Z]+$/ },
            { name: 'email', regex: emailRegex },
            { name: 'username', regex: /^[a-zA-Z0-9]+$/ },
        ];

        for (const validation of inputValidations) {
            const inputValue = validation.name === 'password' ? password : eval(validation.name);
            if (!inputValue || !validation.regex.test(inputValue)) {
                toast.error(`${validation.name.charAt(0).toUpperCase() + validation.name.slice(1)} is invalid`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return false;
            }
        }

        if (!confirmPass || confirmPass !== password) {
            toast.error("Confirmation password does not match the password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return false;
        }

        return true;
    };



    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }

        const formData = new FormData();

        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("username", username);
        formData.append("password", password);


        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post(`${IP}/signup/`, formData, {
                headers: {
                },
            });

            if (response.status === 201) {
                successMessage("Registration successful");
                window.location.href = "/login";
                setFirstName("")
                setLastName("")
                setEmail("")
                setPhone("")
                setUsername("")
                setPassword("")
                setImage("")
                setConfirmPass("")
            }

        } catch (error) {

            console.log(error.response.data.message);
            toast.error(`${error.response.data.message}`, {
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
    };


    return (
        <>
            <div className="w-100 d-flex flex-wrap ">
                <Col
                    xs={12}
                    md={3}
                    xl={4}
                    className=" position-relative"
                    style={{ textAlign: "center", paddingLeft: 0 }}
                >
                    <img src={Logo} alt="Logo" className="d-md-none img-fluid logo"></img>
                    <img src={Farm1} alt="Farmimage" className=" mymainbg"></img>
                </Col>
                <Col className="sginup-container" style={{ backgroundColor: "#fff" }} xs={12} md={9} xl={8}>
                    <div>
                        <form className="input-container" onSubmit={submitHandler}>
                            <Row className="signUp">
                                <h3 style={{ color: '#5DA25E', marginTop: "20px", textAlign: "left" }}>Sign Up</h3>
                                {/* <Col xs={12}>
                                    <div className="signup-img">
                                        <img className="image-sg" src={defaultImg ? defaultImg : image} alt="" />
                                        <label style={{ width: "100%", height: "100%" }} htmlFor="signUp-img"></label>
                                        <input
                                            type="file"
                                            id="signUp-img"
                                            className="input-image-signUp"
                                            accept='image/jpeg, image/png, image/jpg'
                                            onChange={(e) => {

                                                setImage(e.target.files[0])
                                                setDefaultImg(URL.createObjectURL(e.target.files[0]))
                                            }}
                                        />
                                    </div>
                                </Col> */}
                                <div className="signInputwrapper">
                                    <Row className="justify-content-between">
                                        <Col xs={12} md={6} >
                                            <div className=" input-parent">
                                                <span className="onBorder">FirstName:</span>
                                                <input
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    type="text"
                                                    className=" input input-sign"
                                                ></input>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <div className="input-parent">
                                                <span className="onBorder">LastName:</span>
                                                <input
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    type="text"
                                                    className="  input input-sign"
                                                ></input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="input-parent">
                                                <span className="onBorder">Email:</span>
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="text"
                                                    className=" input input-sign"
                                                ></input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={6}>
                                            <div className="input-parent">
                                                <span className="onBorder">UserName:</span>
                                                <input
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    type="text"
                                                    className=" input input-sign"
                                                ></input>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <div className="input-parent">
                                                <span className="onBorder">Phone:</span>
                                                <input
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    type="text"
                                                    className=" input input input-sign"
                                                ></input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={6}>
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
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <div className="border-parent">
                                                <span className="onBorder"> confirmPass: </span>
                                                <div className=" login-input">
                                                    <input
                                                        value={confirmPass}
                                                        className="w-100 input login-input"
                                                        type={`${isPrivate ? "password" : "text"}`}
                                                        onChange={(e) => setConfirmPass(e.target.value)}
                                                    ></input>
                                                    {isPrivate ? (
                                                        <FaEye
                                                            className="setin"ب
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
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                            <div className="d-flex justify-content-center flex-column  align-items-center">
                                <button type="submit" className="signUp-btn">SignUp</button>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link style={{ width: "max-content" }} to={"/login"}> <button className="back-login">Back</button></Link>
                            </div>
                        </form>
                    </div>
                </Col>
                <ToastContainer />
            </div>
        </>

    );

}

