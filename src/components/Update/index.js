import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import UseContext from "../UseContext";

const Update = () => {
  const { user, setUser } = useContext(UseContext);
  const [successUpdateMsg, setSuccessUpdateMsg] = useState("");
  const navigate = useNavigate();

  // Load user data from localStorage if not present in context
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user, setUser]);

  const [updateUserDetail, setUpdateUserDetail] = useState({
    name: user?.name || "",
    DOB: user ? user.DOB.split("-").reverse().join("-") : "",
    email: user?.email || "",
    contact_no: user?.contact || "",
    user_description: user?.userDescription || "",
  });

  const [checkBirthMailContact, setBirthMailContact] = useState({
    mail: "",
    contact: "",
    birth: "",
  });

  const updateUserDetails = (event) => {
    const { value, name } = event.target;
    setUpdateUserDetail({ ...updateUserDetail, [name]: value });
  };

  const onSubmitUpdatedForm = async (event) => {
    event.preventDefault();
    console.log(updateUserDetail);

    const updatedUserDetail = {
      name: updateUserDetail.name,
      DOB: updateUserDetail.DOB.split("-").reverse().join("-"),
      contact_no: updateUserDetail.contact_no,
      email: updateUserDetail.email,
      user_description: updateUserDetail.user_description,
    };
    console.log(updatedUserDetail);

    let contactNumberError;
    let emailError;
    let dobError;

    if (
      isNaN(
        updatedUserDetail.DOB.split("-").reverse().join("-").replaceAll("-", "")
      ) ||
      updatedUserDetail.DOB.split("-").reverse().join("-").split("")[2] !==
        "-" ||
      updatedUserDetail.DOB.split("-").reverse().join("-").split("")[5] !==
        "-" ||
      updatedUserDetail.DOB.split("-").reverse().join("-").length !== 10
    ) {
      dobError = "Enter the Valid format of Date DD-MM-YYYY";
    }
    if (updatedUserDetail.contact_no.length !== 10) {
      contactNumberError = "The length of contact number should be 10";
    }
    if (!updateUserDetail.email.includes("@gmail.com")) {
      emailError = "Add @gmail.com";
    }
    setBirthMailContact({
      mail: emailError,
      contact: contactNumberError,
      birth: dobError,
    });
    if (dobError || contactNumberError || emailError) {
      return;
    } else {
      try {
        const response = await axios.put(
          `https://wylo-backend-assign-3.onrender.com/user_management/${user.id}`,
          updatedUserDetail
        );
        console.log(response);
        if (response.data === "User updated successfully") {
          setUser(updatedUserDetail);
          setSuccessUpdateMsg("User details updated successfully");
          localStorage.setItem("user", JSON.stringify(updatedUserDetail));

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setSuccessUpdateMsg("User details not updated");
        }
      } catch (error) {
        console.error("Error updating user details:", error);
        setSuccessUpdateMsg("Error: Failed to update user details");
      }
    }
  };

  return (
    <>
      <div className="user-form-home-container"></div>
      <form className="user-form-container" onSubmit={onSubmitUpdatedForm}>
        <div className="form-container">
          <p className="updated-success-text">{successUpdateMsg}</p>
          <h1 className="user-form-heading">Update User Detail</h1>
          <div className="input-container">
            <label>
              User name<span className="dot">:</span>{" "}
            </label>{" "}
            <br />
            <input
              className="user-form-input"
              type="text"
              placeholder="User Name:"
              name="name"
              value={updateUserDetail.name}
              onChange={updateUserDetails}
            />
          </div>
          <div className="input-container">
            <label>
              Date of birth<span className="dot">:</span>{" "}
            </label>{" "}
            <br />
            <input
              className="user-form-input"
              name="DOB"
              type="text"
              value={updateUserDetail.DOB}
              onChange={updateUserDetails}
            />
            <span className="warning">{checkBirthMailContact.birth}</span>
          </div>
          <div className="input-container">
            <label>
              Contact number<span className="dot">:</span>{" "}
            </label>{" "}
            <br />
            <input
              className="user-form-input"
              type="number"
              placeholder="Phone number:"
              name="contact_no"
              value={updateUserDetail.contact_no}
              onChange={updateUserDetails}
            />
            <span className="warning">{checkBirthMailContact.contact}</span>
          </div>
          <div className="input-container">
            <label>
              Email<span className="dot">:</span>
            </label>{" "}
            <br />
            <input
              className="user-form-input"
              type="text"
              placeholder="Email id:"
              name="email"
              value={updateUserDetail.email}
              onChange={updateUserDetails}
            />
            <span className="warning">{checkBirthMailContact.mail}</span>
          </div>
          <div className="input-container">
            <label>
              User Description<span className="dot">:</span>
            </label>{" "}
            <br />
            <textarea
              className="user-form-input textarea"
              type="text"
              placeholder="User Description:"
              name="user_description"
              value={updateUserDetail.user_description}
              onChange={updateUserDetails}
            />
          </div>
          <button className="submit-user-details">Update</button>
        </div>
      </form>
    </>
  );
};

export default Update;
