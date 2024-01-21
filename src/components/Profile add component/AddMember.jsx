import { Row, Col } from "react-bootstrap";
import TextInput from "../TextInput";
import { useRef, useState, useEffect } from "react";
import { errorMessage, warningMessage } from "../../pages/Employees";
import Avatar from "../../Images/profileadd/avatar.png"
import { IP } from '../../App'
import Spinne from "../Spinner";

export function AddMember({
  user,
  onHanddleCancel,
  selectedId,
  onChangeInfo,
  onRemove,
  onAdd,
  onEdit,
  onPass,
  changePass,
  loading
}) {

  const [showPasswordInputs, setShowPasswordInputs] = useState(false);

  useEffect(() => {
    if (selectedId && selectedId.type === "add") {
      setShowPasswordInputs(true);

    } else {
      setShowPasswordInputs(false);
    }
  }, [selectedId]);

  function setName(name) {
    onChangeInfo((info) => ({ ...info, first_name: name }));
  }
  function setLastName(lastname) {
    onChangeInfo((info) => ({ ...info, last_name: lastname }));
  }
  function setEmail(email) {
    onChangeInfo((info) => ({ ...info, email: email }));
  }
  function setPhone(phone) {
    onChangeInfo((info) => ({ ...info, phone: phone }));
  }
  function setUserName(username) {
    onChangeInfo((info) => ({ ...info, username: username }));
  }
  function setPassword1(password) {
    onChangeInfo((info) => ({ ...info, password: password }));
  }
  function setPassword2(password) {
    onChangeInfo((info) => ({ ...info, conPassword: password }));
  }
  function setExpertise(expertise) {
    onChangeInfo((info) => ({ ...info, expertise: expertise }));
  }

  function setImage(image) {
    onChangeInfo((info) => ({ ...info, image: image }));
  }
  const [test, setTest] = useState()
  const [isPrivate1, setIsPrivate1] = useState(true);
  const [isPrivate2, setIsPrivate2] = useState(true);
  const [upoloadImage, setuploadImage] = useState()


  const imageRef = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    if (selectedId && selectedId.type === "remove") {
      onRemove(user.uuid);
    } else {
      if (!user.first_name) {
        errorMessage("Please enter the name of employee!");
        return;
      } else if (user.first_name.length < 3) {
        warningMessage(
          "Please enter a name with length more than 3 characters!"
        );
        return;
      } else if (!user.last_name) {
        errorMessage("Please enter the last name of employee!");
        return;
      } else if (user.last_name.length < 3) {
        warningMessage(
          "Please enter a last name with length more than 3 characters!"
        );
        return;
      } else if (!user.email) {
        errorMessage("Please enter the address email of employee!");
        return;
      } else if (!validateEmail(user.email)) {
        warningMessage("Please enter the correct form of an email!");
        return;
      } else if (!user.phone) {
        errorMessage("Please enter the phone number of employee!");
        return;
      } else if (!user.username) {
        errorMessage("Please enter an username!");
        return;
      } else if (user.username.length <= 5 && user.username.length > 15) {
        warningMessage(
          "Please enter an username in range of 6 to 15 characters!"
        );
        return;
      }
      if (showPasswordInputs) {

        if (!user.password) {
          errorMessage("Please enter a password!");
          return;
        } else if (!user.conPassword) {
          errorMessage("Please confirm password!");
          return;
        } else if (user.password !== user.conPassword) {
          errorMessage("Please enter the same passwords!");
          return;
        }
      }
      else if (!user.expertise) {
        errorMessage("Please enter some expertises!");
        return;
      }
      const formData = new FormData(e.target);

      if (imageRef.current && imageRef.current.files.length > 0) {
        console.log("hello")
        formData.append("image", imageRef.current.files[0]);
      }

      if (selectedId.type === "edit" && showPasswordInputs) {
        formData.append("password", user.password);
        formData.append("conPassword", user.conPassword);
      }

      if (selectedId.type === "add") {
        onAdd(formData);
      } else if (selectedId.type === "edit") {
        formData.append("uuid", user.uuid);
        onEdit(formData);
      }
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
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

  const switchShow = () => {
    setShowPasswordInputs(true)
    console.log("hello")
  }

  return (
    <div className=" shadow p-3 ">
      <div className="header_profile">
        {selectedId && selectedId.type === "edit" ? (
          <h4>Edditing The Selected Member</h4>
        ) : selectedId.type === "remove" ? (
          <h4>Removing The Selected Member</h4>
        ) : selectedId.type === "show" ? (
          <h4>Showing Member's Profile</h4>
        ) : (
          <h4>Add New Member</h4>
        )}
      </div>
      <Row className="content_profile" style={{ position: "relative" }}>
        {
          loading &&
          <Spinne />
        }
        <Col className=" w-100 rounded mt-3">
          <form className="content_down" onSubmit={handleSubmit}>
            <div className="content_top border-primary2-top border-primary2-bottom">
              <div className="d-flex flex-column flex-md-row align-items-center py-3">
                <div
                  onClick={onClickHandeler}
                  style={{ width: "55px", height: "55px", borderRadius: "50%", position: "relative", background: Avatar }}>
                  <label htmlFor="fileup"></label>
                  <input
                    id="fileup"
                    ref={imageRef}
                    type="file"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    name="image"
                    onChange={(e) => {
                      setImage(URL.createObjectURL(e.target.files[0]))
                      setuploadImage(URL.createObjectURL(e.target.files[0]))
                      setTest(e.target.files)
                    }

                    }
                  />
                  {
                    user.image ? (
                      <img
                        style={{ position: "absolute", top: "0", right: "0" }}
                        src={upoloadImage ? upoloadImage : `${IP}${user.image}`}
                        className="imgprofile"
                      ></img>) :
                      (
                        <img
                          style={{ position: "absolute", top: "0", right: "0" }}
                          src={Avatar}
                          className="imgprofile"
                        ></img>
                      )

                  }


                </div>
                <div className="ms-0 ms-md-3">
                  <div className="d-flex align-items-center">
                    <h3 className="color-primary2 mb-0">
                      {selectedId && selectedId.type === "edit"
                        ? "Update Your Photo"
                        : selectedId && selectedId.type === "remove"
                          ? "Profile Photo"
                          : selectedId && selectedId.type === "show"
                            ? `${user.first_name + " " + user.last_name}`
                            : "Upload Your Photo"}
                    </h3>
                    {(selectedId && selectedId.type === "edit") ||
                      selectedId.type === "add" ? (
                      <i
                        className="bi bi-cloud-arrow-up color-primary2 ms-2 fs-2"
                      ></i>
                    ) : (
                      <></>
                    )}

                  </div>
                </div>
              </div>
            </div>

            <Row className="mt-4 mt-md-0">
              <Col xs={12} md={6}>
                {selectedId && selectedId.type === "show" ? (
                  <Row className="d-flex w-100 ">
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="primary-f fw-bold">First Name:</span>
                    </Col>
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="text-muted fs-6">{user.first_name}</span>
                    </Col>
                  </Row>
                ) : (
                  <TextInput
                    disabled={selectedId && selectedId.type === "remove"}
                    value={user.first_name}
                    name="first_name"
                    onChange={(e) => setName(e.target.value)}
                    label={
                      selectedId && selectedId.type === "remove"
                        ? "Name:"
                        : "Please Enter Name:"
                    }
                    type="text"
                    palce="First Name"
                    divClass="px-5 w-100 mt-3"
                    inputClass="myinputsshadow w-100 py-2 mt-0"
                  />
                )}
              </Col>
              <Col xs={12} md={6}>
                {selectedId && selectedId.type === "show" ? (
                  <Row className="d-flex w-100 ">
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="primary-f fw-bold">Last Name:</span>
                    </Col>
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="text-muted fs-6">{user.last_name}</span>
                    </Col>
                  </Row>
                ) : (
                  <TextInput
                    disabled={selectedId && selectedId.type === "remove"}
                    value={user.last_name}
                    name="last_name"
                    onChange={(e) => setLastName(e.target.value)}
                    label={
                      selectedId && selectedId.type === "remove"
                        ? "Last Name:"
                        : "Please Enter Last Name:"
                    }
                    type="text"
                    palce="Last Name"
                    divClass="px-5 mt-3"
                    inputClass="myinputsshadow w-100  py-2 mt-0"
                  />
                )}
              </Col>
            </Row>
            <Row>

              <Col xs={12} md={6}>
                {selectedId && selectedId.type === "show" ? (
                  <Row className="d-flex w-100 ">
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"

                    >
                      <span className="primary-f fw-bold">Email Address:</span>
                    </Col>
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"

                    >
                      <span className="text-muted fs-6">{user.email}</span>
                    </Col>
                  </Row>
                ) : (
                  <TextInput
                    disabled={selectedId && selectedId.type === "remove"}
                    value={user.email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    label={
                      selectedId && selectedId.type === "remove"
                        ? "Email Address:"
                        : "Please Enter Email Address :"
                    }
                    type="text"
                    palce="Email Address"
                    divClass="px-5 mt-3"
                    inputClass="myinputsshadow w-100 py-2 mt-0"
                  />
                )}
              </Col>
              <Col xs={12} md={6}>
                {selectedId && selectedId.type === "show" ? (
                  <Row className="d-flex w-100 ">
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="primary-f fw-bold">Phone Number:</span>
                    </Col>
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="text-muted fs-6">{user.phone}</span>
                    </Col>
                  </Row>
                ) : (
                  <TextInput
                    disabled={selectedId && selectedId.type === "remove"}
                    value={user.phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    label={
                      selectedId && selectedId.type === "remove"
                        ? "Phone Number:"
                        : "Please Enter Phone Number :"
                    }
                    type="number"
                    palce="Phone Number"
                    divClass="px-5 mt-3"
                    inputClass="myinputsshadow w-100  py-2 mt-0"
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {selectedId && selectedId.type === "show" ? (
                  <Row className="d-flex w-100 ">
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="primary-f fw-bold">Username:</span>
                    </Col>
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="text-muted fs-6">{user.username}</span>
                    </Col>
                  </Row>
                ) : (
                  <TextInput
                    disabled={selectedId && selectedId.type === "remove"}
                    value={user.username}
                    name="username"
                    onChange={(e) => setUserName(e.target.value)}
                    label={
                      selectedId && selectedId.type === "remove"
                        ? "Username:"
                        : "Please Enter Username :"
                    }
                    type="text"
                    palce="Username"
                    divClass="px-5 mt-3"
                    inputClass="myinputsshadow w-100  py-2 mt-0"
                  />
                )}
              </Col>
              <Col xs={12} md={6}>
                {selectedId && selectedId.type === "show" ? (
                  <Row className="d-flex w-100 ">
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="primary-f fw-bold">Expertises:</span>
                    </Col>
                    <Col
                      className="d-flex justify-content-start align-items-center my-3"
                      xs={6}
                    >
                      <span className="text-muted fs-6">{user.expertise}</span>
                    </Col>
                  </Row>
                ) : (
                  <TextInput
                    disabled={selectedId && selectedId.type === "remove"}
                    value={user.expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    name="expertise"
                    label={
                      selectedId && selectedId.type === "remove"
                        ? "Expertise:"
                        : "Please Enter Expertisers :"
                    }
                    type="text"
                    palce="Expertise"
                    divClass="px-5 my-3"
                    inputClass="myinputsshadow w-100  py-2 mt-0"
                  />
                )}
              </Col>
            </Row>
            {selectedId && selectedId.type === "edit" ? (
              <></>
            ) : (
              <></>
            )}
            {selectedId && selectedId.type === "edit" ? (
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
                    defaultValue={false}
                    value={onPass}
                    className="mt-0 ms-3"
                    onChange={() => setShowPasswordInputs(!showPasswordInputs)}
                  ></input>
                </Col>
              </Row>
            ) : (

              <>
              </>
            )}
            {(selectedId && selectedId.type === "show") ||
              selectedId.type === "remove" ? (
              <></>
            ) : (
              showPasswordInputs &&
              <Row>
                <Col xs={12} md={6}>
                  <div className="eye-parent">
                    <TextInput

                      value={user.password}
                      name="password"
                      onChange={(e) => setPassword1(e.target.value)}
                      label={
                        selectedId && selectedId.type === "remove"
                          ? "Password:"
                          : selectedId.type === "edit"
                            ? "Please Enter New Password :"
                            : "Please Enter Password :"
                      }
                      lableClass={`${onPass ? `text-success` : `text-gray`}`}
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
                      value={user.conPassword}
                      name="confirm_password"
                      lableClass={`${onPass ? `text-success` : `text-gray`}`}
                      onChange={(e) => setPassword2(e.target.value)}
                      label={
                        selectedId && selectedId.type === "remove"
                          ? "Password:"
                          : selectedId.type === "edit"
                            ? "Please Confirm New Password :"
                            : "Please Confirm Password :"
                      }
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

            {selectedId && selectedId.type === "show" ? (
              <></>
            ) : (
              <div className="submit_button">
                {selectedId && selectedId.type === "remove" ? (
                  <span className="text-danger">
                    Are you sure ?
                  </span>
                ) : selectedId.type === "edit" ? (
                  <span className="text-warning">
                    Are you are sure to edit this member?
                  </span>
                ) : (
                  <></>
                )}
                <div className="buttons">
                  <button
                    type="submit"
                    className={`btn ${selectedId && selectedId.type === "remove"
                      ? `btn-outline-danger`
                      : selectedId.type === "edit"
                        ? `btn-outline-warning`
                        : `btn-outline-success`
                      }`}
                  >
                    {selectedId && selectedId.type === "edit"
                      ? "Edit"
                      : selectedId.type === "remove"
                        ? "Delete"
                        : "Save"}
                  </button>
                  <button
                    type="button"
                    className={`btn ${selectedId && selectedId.type === "remove"
                      ? `btn-success`
                      : selectedId.type === "edit"
                        ? `btn-success`
                        : `btn-danger`
                      }`}
                    onClick={onHanddleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </Col>
      </Row>
    </div>
  );
}
