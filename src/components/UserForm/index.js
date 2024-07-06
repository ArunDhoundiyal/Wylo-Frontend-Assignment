import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";
import UseContext from "../UseContext";
import "./index.css";

const UserForm = () => {
  const { setUser } = useContext(UseContext);
  const [userDetails, setUserDetails] = useState({
    name: "",
    DOB: "",
    contact_no: "",
    email: "",
    user_description: "",
  });

  const [validationMessages, setValidationMessages] = useState({
    number: "",
    gmail: "",
  });

  const [submitSuccessful, setSubmitSuccessful] = useState("");
  const navigate = useNavigate();

  const onChangeUserDetails = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const backToHomePage = () => navigate("/");

  const onSubmitUserDetails = async (event) => {
    event.preventDefault();

    const userForm = {
      id: uuidV4(),
      name: userDetails.name,
      DOB: userDetails.DOB,
      contact_no: userDetails.contact_no,
      email: userDetails.email.split(" ").join(""),
      user_description: userDetails.user_description,
    };

    console.log(userForm);

    let numberMessage = "";
    let gmailMessage = "";

    if (userForm.contact_no.length !== 10) {
      numberMessage = "The length of contact number should be 10";
      setSubmitSuccessful("");
    }

    if (!userForm.email.includes("@gmail.com")) {
      gmailMessage = "Add @gmail.com";
      setSubmitSuccessful("");
    }

    setValidationMessages({ number: numberMessage, gmail: gmailMessage });

    if (numberMessage || gmailMessage) {
      setSubmitSuccessful("");
      return;
    }

    try {
      const response = await axios.post(
        "https://mangement-of-user-detail-system-1.onrender.com/user_management",
        userForm
      );
      console.log(response);
      if (response.data === "User Created Successfully") {
        setSubmitSuccessful("Submit Successfully");
        setUser(userForm);
      }
      setUserDetails({
        name: "",
        DOB: "",
        contact_no: "",
        email: "",
        user_description: "",
      });
      setValidationMessages({ number: "", gmail: "" });
    } catch (error) {
      console.log(`Error Creating Post: ${error}`);
      setSubmitSuccessful("");
    }
  };

  return (
    <>
      <div className="user-form-home-container">
        <button className="back-home-button" onClick={backToHomePage}>
          <BsArrowBarLeft className="home-back-icon" />
          Home
        </button>
      </div>
      <form className="user-form-container" onSubmit={onSubmitUserDetails}>
        <div className="form-container">
          <span className="submit-success">{submitSuccessful}</span>

          <h1 className="user-form-heading">
            <span className="user-form-style">User Form</span>{" "}
            <span className="create-style">Create</span> User Detail
          </h1>
          <div className="input-container">
            <label>
              User name<span className="dot">:</span>
            </label>
            <input
              className="user-form-input"
              type="text"
              placeholder="User Name:"
              name="name"
              value={userDetails.name}
              onChange={onChangeUserDetails}
              required
            />
          </div>
          <div className="input-container">
            <label>
              Date of birth<span className="dot">:</span>
            </label>
            <input
              className="user-form-input"
              type="date"
              name="DOB"
              value={userDetails.DOB}
              onChange={onChangeUserDetails}
              required
            />
          </div>
          <div className="input-container">
            <label>
              Contact number<span className="dot">:</span>
            </label>
            <input
              className="user-form-input"
              type="number"
              placeholder="Phone number:"
              name="contact_no"
              value={userDetails.contact_no}
              onChange={onChangeUserDetails}
              required
            />
            <span className="warning">{validationMessages.number}</span>
          </div>
          <div className="input-container">
            <label>
              Email<span className="dot">:</span>
            </label>
            <input
              className="user-form-input"
              type="text"
              placeholder="Email id:"
              name="email"
              value={userDetails.email}
              onChange={onChangeUserDetails}
              required
            />
            <span className="warning">{validationMessages.gmail}</span>
          </div>
          <div className="input-container">
            <label>
              User Description<span className="dot">:</span>
            </label>
            <textarea
              className="user-form-input textarea"
              type="text"
              placeholder="User Description:"
              name="user_description"
              value={userDetails.user_description}
              onChange={onChangeUserDetails}
              required
            />
          </div>
          <button className="submit-user-details">Submit</button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
