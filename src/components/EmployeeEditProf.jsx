import { Row, Col } from "react-bootstrap";
import TextInput from "./TextInput";
import { useRef, useState, useEffect } from "react";
import { errorMessage, warningMessage } from "../pages/Employees";
import Header from '../Employees/components/Header';
import NavBar from "../Employees/components/NavBar";
import { IP } from '../App'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Laoding/Loading";
import { ToastContainer, toast } from "react-toastify";
import '../Style/EditProf.css'
import "react-toastify/dist/ReactToastify.css"
export default function EmployeeEditProf() {
    const [editMode, setEditMode] = useState(false);
    const [all, setAll] = useState()
    const [name, setName] = useState()
    const [lastname, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [expertise, setExpertise] = useState()
    const [image, setImage] = useState(false)
    const [uploadImage, setuploadImage] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [showPasswordInputs, setShowPasswordInputs] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false)

    const getProfileInfo = async () => {

        const access = localStorage.getItem('access')
        const headers = {
            Authorization: `Bearer ${access}`
        };
        const response = await axios.get(`${IP}/user-detail/`, {
            headers,
        });

        try {
            if (response.status === 200) {
                if (response.data) {
                    setAll(response.data)
                    setName(response.data[0].first_name)
                    setLastName(response.data[0].last_name)
                    setEmail(response.data[0].email)
                    setUserName(response.data[0].username)
                    setPhone(response.data[0].phone)
                    setExpertise(response.data[0].expertise)
                }
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                window.location.href = "/login"
            }
        }
    }

    useEffect(() => {
        getProfileInfo()
    }, [])


    const [isPrivate1, setIsPrivate1] = useState(true);
    const [isPrivate2, setIsPrivate2] = useState(true);
    const imageRef = useRef(null);

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    function validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        return usernameRegex.test(username);
    }
    const handleToggleEye1 = () => {
        setIsPrivate1((e) => !e);
    };
    const handleToggleEye2 = () => {
        setIsPrivate2((e) => !e);
    };
    const onClickHandeler = () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };
    const handleTogglePasswordInputs = () => {
        setShowPasswordInputs(!showPasswordInputs);
    };

    const navigate = useNavigate();

    // const onHanddleCancel = () => {
    //     navigate('/')
    // }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setConfirmPassword(e.target.value)
        setPasswordChanged(true);
    };

    const onSubmit = async (e) => {
        const uuid = localStorage.getItem('uuid')
        e.preventDefault();

        if (!name || !lastname || !email || !phone || !username) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Invalid email format.");
            return;
        }

        if (!validateUsername(username)) {
            toast.error("Invalid username format.");
            return;
        }

        if (passwordChanged && !validatePassword(password)) {
            toast.error("Invalid password format.");
            return;
        }
        const formData = new FormData();

        formData.append('first_name', name);
        formData.append('last_name', lastname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('username', username);
        formData.append('expertise', expertise);
        formData.append("uuid", uuid)


        if (image) {
            formData.append("image", image);
        }

        if (password) {
            formData.append("password", password);
            formData.append("confirm_password", confirmPassword)
        }


        try {
            const access = localStorage.getItem('access');
            const headers = {
                Authorization: `Bearer ${access}`,
            };

            const response = await axios.put(`${IP}/edit-employee/`, formData, {
                headers,
            });

            if (response.status === 200) {
                toast.success("Edit successful!");
                setEditMode(false);
                console.log(response)

            }
        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                window.location.href = "/login"
            }
        }
    };

    const onCancel = () => {
        if (editMode) {
            setEditMode(false);
        } else {
            navigate("/employeesHome")
        }
    };
    return (
        <>
            {
                all ? (
                    <>
                        <div className="d-flex">
                            <div className="d-none d-lg-block">
                                <NavBar />
                            </div>
                            <div className="w-100">
                                <Header />
                                <div >
                                    <Col md={8} style={{ margin: "0 auto" }}>
                                        <div className=" shadow p-3 ">
                                            <div className="header_profile">
                                                <h4>Edditing the profile</h4>
                                            </div>
                                            <Row className="content_profile">
                                                <Col className=" w-100 rounded mt-3">
                                                    <div className="content_down">
                                                        <div className="content_top border-primary2-top border-primary2-bottom">
                                                            <div className="d-flex flex-column flex-md-row align-items-center py-3">

                                                                <div onClick={onClickHandeler}>
                                                                    <label htmlFor="aaa"></label>
                                                                    <img
                                                                        src={uploadImage ? uploadImage : `${IP}${all[0].image}`}
                                                                        alt="profile"
                                                                        className="imgprofile"
                                                                    ></img>
                                                                    <input
                                                                        disabled={!editMode}
                                                                        id="aaaa"
                                                                        ref={imageRef}
                                                                        type="file"
                                                                        style={{ display: "none" }}
                                                                        accept="image/png, image/jpeg"
                                                                        name="image"
                                                                        onChange={(e) => {
                                                                            setImage(e.target.files[0])
                                                                            setuploadImage(URL.createObjectURL(e.target.files[0]))
                                                                        }
                                                                        }
                                                                    />
                                                                </div>

                                                                <div className="ms-0 ms-md-3">
                                                                    <div className="d-flex align-items-center">
                                                                        <h3 className="color-primary2 mb-0">
                                                                            Update Your Photo
                                                                        </h3>
                                                                        <i
                                                                            className="bi bi-cloud-arrow-up color-primary2 ms-2 fs-2"
                                                                        ></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Row className="mt-4 mt-md-0">
                                                            <Col xs={12} md={6}>


                                                                <TextInput
                                                                    value={name}
                                                                    name="first_name"
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    label={
                                                                        "Name :"
                                                                    }
                                                                    type="text"
                                                                    palce="First Name"
                                                                    divClass="px-5 w-100 mt-3"
                                                                    inputClass={`myinputsshadow w-100 py-2 mt-0 ${!editMode ? 'disabled' : ''}`}
                                                                    disabled={!editMode}
                                                                />

                                                            </Col>
                                                            <Col xs={12} md={6}>

                                                                <TextInput
                                                                    value={lastname}
                                                                    name="last_name"
                                                                    onChange={(e) => setLastName(e.target.value)}
                                                                    label={
                                                                        "Last Name :"
                                                                    }
                                                                    type="text"
                                                                    palce="Last Name"
                                                                    divClass="px-5 mt-3"
                                                                    inputClass={`myinputsshadow w-100 py-2 mt-0 ${!editMode ? 'disabled' : ''}`}
                                                                    disabled={!editMode}
                                                                />

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={6}>

                                                                <TextInput

                                                                    value={email}
                                                                    name="email"
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    label={
                                                                        "Email Address :"
                                                                    }
                                                                    type="text"
                                                                    palce="Email Address"
                                                                    divClass="px-5 mt-3"
                                                                    inputClass={`myinputsshadow w-100 py-2 mt-0 ${!editMode ? 'disabled' : ''}`}
                                                                    disabled={!editMode}
                                                                />

                                                            </Col>
                                                            <Col xs={12} md={6}>

                                                                <TextInput

                                                                    value={phone}
                                                                    onChange={(e) => setPhone(e.target.value)}
                                                                    name="phone"
                                                                    label={"Phone Number :"
                                                                    }
                                                                    type="number"
                                                                    palce="Phone Number"
                                                                    divClass="px-5 mt-3"
                                                                    inputClass={`myinputsshadow w-100 py-2 mt-0 ${!editMode ? 'disabled' : ''}`}
                                                                    disabled={!editMode}
                                                                />

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={6}>

                                                                <TextInput

                                                                    value={username}
                                                                    name="username"
                                                                    onChange={(e) => setUserName(e.target.value)}
                                                                    label={

                                                                        "Username :"

                                                                    }
                                                                    type="text"
                                                                    palce="Username"
                                                                    divClass="px-5 mt-3"
                                                                    inputClass={`myinputsshadow w-100 py-2 mt-0 ${!editMode ? 'disabled' : ''}`}
                                                                    disabled={!editMode}
                                                                />

                                                            </Col>
                                                            <Col xs={12} md={6}>

                                                                <TextInput

                                                                    value={expertise}
                                                                    onChange={(e) => setExpertise(e.target.value)}
                                                                    name="expertise"
                                                                    label={
                                                                        "Expertise :"
                                                                    }
                                                                    type="text"
                                                                    palce="Expertise"
                                                                    divClass="px-5 my-3"
                                                                    inputClass={`myinputsshadow w-100 py-2 mt-0 ${!editMode ? 'disabled' : ''}`}
                                                                    disabled={!editMode}
                                                                />

                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col
                                                                className="d-flex flex-row justify-content-center align-items-center"
                                                                xs={12}
                                                            >
                                                                <span className="text-success">
                                                                    Do you want to change password?
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    defaultValue={showPasswordInputs}
                                                                    className="mt-0 ms-3"
                                                                    onChange={handleTogglePasswordInputs}
                                                                    disabled={!editMode}
                                                                ></input>
                                                            </Col>
                                                        </Row>



                                                        {showPasswordInputs && (
                                                            <Row>
                                                                <Col xs={12} md={6}>
                                                                    <div className="eye-parent">
                                                                        <TextInput
                                                                            value={password}
                                                                            name="password"
                                                                            onChange={handlePasswordChange}
                                                                            label={"Please Enter New Password :"}
                                                                            type={`${isPrivate1 ? "password" : "text"}`}
                                                                            palce="Password"
                                                                            divClass="ps-5 w-100 mb-3"
                                                                            inputClass="myinputsshadow w-100  py-2 mt-0"
                                                                        />
                                                                        <i
                                                                            onClick={handleToggleEye1}
                                                                            className={`border border-success mb-3 bi fs-4 text-success ${isPrivate1 ? `bi-eye-slash` : `bi-eye`
                                                                                }`}
                                                                        ></i>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={12} md={6}>
                                                                    <div className="eye-parent">
                                                                        <TextInput
                                                                            value={password}
                                                                            name="confirm_password"
                                                                            onChange={handlePasswordChange}
                                                                            label={"Please Confirm New Password :"}
                                                                            type={`${isPrivate2 ? "password" : "text"}`}
                                                                            palce="Confirm Password"
                                                                            divClass="ps-5 w-100 mb-3"
                                                                            inputClass="myinputsshadow w-100  py-2 mt-0"
                                                                        />
                                                                        <i
                                                                            onClick={handleToggleEye2}
                                                                            className={`border border-success mb-3 bi fs-4 text-success ${isPrivate2 ? `bi-eye-slash` : `bi-eye`
                                                                                }`}
                                                                        ></i>
                                                                    </div>
                                                                </Col>

                                                            </Row>
                                                        )}


                                                        <div className="submit_button mt-3">
                                                            <div className="buttons">
                                                                {editMode ? (
                                                                    <button
                                                                        onClick={onSubmit}
                                                                        className={`btn btn-outline-success`}
                                                                    >
                                                                        Save
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        style={{ color: "#fff" }}
                                                                        type="button"
                                                                        className={`btn btn-warning`}
                                                                        onClick={() => setEditMode(true)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                )}
                                                                {editMode ? (
                                                                    <button
                                                                        style={{ color: "#198754", border: "1px solid #198754" }}
                                                                        type="button"
                                                                        className={`btn`}
                                                                        onClick={onCancel}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        style={{ color: "#198754", border: "1px solid #198754" }}
                                                                        type="button"
                                                                        className={`btn`}
                                                                        onClick={onCancel}
                                                                    >
                                                                        Back
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                            <ToastContainer />

                        </div>
                    </>) :
                    (<>
                        <Loading />
                    </>)
            }

        </>

    );
}
