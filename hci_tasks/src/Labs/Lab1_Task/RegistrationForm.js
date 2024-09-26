import React, { useState } from "react";
import "../../assets/css/RegistrationForm.css";
import { useValidators } from "../../utility/validations/RegistrationFormValidation";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    contactNumber: "",
    cnic: "",
    email: "",
    address: "",
    city: "",
    fscObtainedMarks: "",
    fscTotalMarks: "",
    ntsObtainedMarks: "",
    ntsTotalMarks: "",
    program: "",
  });

  const [formDataTime, setFormDataTime] = useState({
    firstName: 0,
    lastName: 0,
    fatherName: 0,
    contactNumber: 0,
    cnic: 0,
    email: 0,
    address: 0,
    city: 0,
    fscObtainedMarks: 0,
    fscTotalMarks: 0,
    ntsObtainedMarks: 0,
    ntsTotalMarks: 0,
    program: 0,
  });

  const [startTime, setStartTime] = useState(null);
  const [currentField, setCurrentField] = useState(null);

  const {
    errors,
    validateString,
    validateInteger,
    validateCNIC,
    validatePhoneNumber,
    validateEmail,
    validateAddress,
  } = useValidators();

  // Start tracking time for the field
  const handleFocus = (name) => {
    setStartTime(Date.now());
    setCurrentField(name);
  };

  const handleBlur = (name) => {
    if (startTime) {
      const endTime = Date.now();
      const timeSpent = (endTime - startTime) / 1000; // Time in seconds
      setFormDataTime((prev) => ({
        ...prev,
        [name]: prev[name] + timeSpent,
      }));
      setStartTime(null);
      setCurrentField(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Format phone number as 0300-0000000 and limit to 11 digits
    if (name === "contactNumber") {
      formattedValue = formatPhoneNumber(value);
    }

    // Format CNIC as 00000-0000000-0 and limit to 13 digits
    if (name === "cnic") {
      formattedValue = formatCNIC(value);
    }

    setFormData({ ...formData, [name]: formattedValue });

    // Call the appropriate validation function based on the field name
    switch (name) {
      case "firstName":
      case "lastName":
      case "fatherName":
      case "city":
        validateString(name, value);
        break;
      case "contactNumber":
        validatePhoneNumber(name, formattedValue);
        break;
      case "cnic":
        validateCNIC(name, formattedValue);
        break;
      case "email":
        validateEmail(name, value);
        break;
      case "address":
        validateAddress(name, value);
        break;
      case "fscObtainedMarks":
      case "fscTotalMarks":
      case "ntsObtainedMarks":
      case "ntsTotalMarks":
        validateInteger(name, value);
        break;
      default:
        break;
    }
  };

  const calculateTotalTime = () => {
    return Object.values(formDataTime)
      .reduce((total, fieldTime) => total + fieldTime, 0)
      .toFixed(2);
  };

  // Function to format phone number as 0300-0000000 and limit to 11 digits
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 11) {
      return value;
    }
    const match = cleaned.match(/^(\d{4})(\d{0,7})$/);
    if (match) {
      return `${match[1]}-${match[2]}`;
    }
    return cleaned;
  };

  // Function to format CNIC as 00000-0000000-0 and limit to 13 digits
  const formatCNIC = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 13) {
      return value;
    }
    const match = cleaned.match(/^(\d{5})(\d{0,7})(\d{0,1})$/);
    if (match) {
      return `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ""}`;
    }
    return cleaned;
  };

  // Prevent numbers in string fields
  const handleStringKeyDown = (e) => {
    const key = e.key;

    // Allow Backspace, Tab, and other control keys
    if (key === "Backspace" || key === "Tab") {
      return;
    }

    // Get the current input value
    const inputValue = e.target.value;

    // First character must be a letter (a-zA-Z)
    if (inputValue.length === 0 && !/^[a-zA-Z]$/.test(key)) {
      e.preventDefault(); // Prevent non-letter keys as the first character
      return;
    }

    // For subsequent characters, allow letters, spaces, and numbers
    if (!/^[a-zA-Z0-9\s]$/.test(key)) {
      e.preventDefault(); // Prevent non-alphanumeric characters except spaces
    }
  };

  // Prevent strings in integer fields
  const handleIntegerKeyDown = (e) => {
    const key = e.key;
    if (!/^\d+$/.test(key) && key !== "Backspace" && key !== "Tab") {
      e.preventDefault();
    }
  };

  // Check if there are any errors
  const hasErrors = () => {
    return Object.values(errors).some((error) => error.length > 0);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasErrors()) {
      console.log("Form contains errors. Fix them before submitting.");
      return;
    }

    const totalTime = calculateTotalTime();
    console.log(`Form Submitted in ${totalTime} seconds`, formData);
    console.log("Time spent on each field:", formDataTime);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-section">
        <div className="reg-text-container">
          <p>Register Yourself</p>
        </div>
        <div className="form-main">
          <div className="information-section">
            <p className="section-label">Personal Information</p>

            {/* First Name */}
            <div className="name-container">
              <div className="name-inputs">
                <input
                  className="input-field"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onKeyDown={handleStringKeyDown}
                  onFocus={() => handleFocus("firstName")}
                  onBlur={() => handleBlur("firstName")}
                  required
                  placeholder=" "
                />
                <label className="input-label">First Name</label>
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="name-inputs">
                <input
                  className="input-field"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onKeyDown={handleStringKeyDown}
                  onFocus={() => handleFocus("lastName")}
                  onBlur={() => handleBlur("lastName")}
                  required
                  placeholder=" "
                />
                <label className="input-label">Last Name</label>
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
              </div>
            </div>

            {/* Father Name */}
            <div className="form-inputs">
              <input
                className="input-field"
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                onKeyDown={handleStringKeyDown}
                onFocus={() => handleFocus("fatherName")}
                onBlur={() => handleBlur("fatherName")}
                required
                placeholder=" "
              />
              <label className="input-label">Father Name</label>
              {errors.fatherName && <p className="error-text">{errors.fatherName}</p>}
            </div>

            {/* Contact Number */}
            <div className="form-inputs">
              <input
                className="input-field"
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                onKeyDown={handleIntegerKeyDown}
                onFocus={() => handleFocus("contactNumber")}
                onBlur={() => handleBlur("contactNumber")}
                required
                placeholder=" "
              />
              <label className="input-label">Contact Number</label>
              {errors.contactNumber && <p className="error-text">{errors.contactNumber}</p>}
            </div>

            {/* CNIC */}
            <div className="form-inputs">
              <input
                className="input-field"
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                onKeyDown={handleIntegerKeyDown}
                onFocus={() => handleFocus("cnic")}
                onBlur={() => handleBlur("cnic")}
                required
                placeholder=" "
              />
              <label className="input-label">CNIC</label>
              {errors.cnic && <p className="error-text">{errors.cnic}</p>}
            </div>

            {/* Email */}
            <div className="form-inputs">
              <input
                className="input-field"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                required
                placeholder=" "
              />
              <label className="input-label">Email</label>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Address */}
            <div className="form-inputs">
              <input
                className="input-field"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onFocus={() => handleFocus("address")}
                onBlur={() => handleBlur("address")}
                required
                placeholder=" "
              />
              <label className="input-label">Address</label>
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>

            {/* City */}
            <div className="form-inputs">
              <input
                className="input-field"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onKeyDown={handleStringKeyDown}
                onFocus={() => handleFocus("city")}
                onBlur={() => handleBlur("city")}
                required
                placeholder=" "
              />
              <label className="input-label">City</label>
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>
          </div>

          {/* Academic Information */}
          <div className="information-section">
            <p className="section-label">Academic Information</p>
            <p className="field-label">FSC Marks</p>
            <div className="marks-inputs">
              <div className="name-inputs">
                <input
                  className="input-field"
                  type="text"
                  name="fscObtainedMarks"
                  value={formData.fscObtainedMarks}
                  onChange={handleChange}
                  onKeyDown={handleIntegerKeyDown}
                  onFocus={() => handleFocus("fscObtainedMarks")}
                  onBlur={() => handleBlur("fscObtainedMarks")}
                  required
                  placeholder=" "
                />
                <label className="input-label">Obtained Marks</label>
                {errors.fscObtainedMarks && <p className="error-text">{errors.fscObtainedMarks}</p>}
              </div>
              <div className="name-inputs">
                <input
                  className="input-field"
                  type="text"
                  name="fscTotalMarks"
                  value={formData.fscTotalMarks}
                  onChange={handleChange}
                  onKeyDown={handleIntegerKeyDown}
                  onFocus={() => handleFocus("fscTotalMarks")}
                  onBlur={() => handleBlur("fscTotalMarks")}
                  required
                  placeholder=" "
                />
                <label className="input-label">Total Marks</label>
                {errors.fscTotalMarks && <p className="error-text">{errors.fscTotalMarks}</p>}
              </div>
            </div>

            <p className="field-label">NTS Marks</p>
            <div className="marks-inputs">
              <div className="name-inputs">
                <input
                  className="input-field"
                  type="text"
                  name="ntsObtainedMarks"
                  value={formData.ntsObtainedMarks}
                  onChange={handleChange}
                  onKeyDown={handleIntegerKeyDown}
                  onFocus={() => handleFocus("ntsObtainedMarks")}
                  onBlur={() => handleBlur("ntsObtainedMarks")}
                  required
                  placeholder=" "
                />
                <label className="input-label">Obtained Marks</label>
                {errors.ntsObtainedMarks && <p className="error-text">{errors.ntsObtainedMarks}</p>}
              </div>
              <div className="name-inputs">
                <input
                  className="input-field"
                  type="text"
                  name="ntsTotalMarks"
                  value={formData.ntsTotalMarks}
                  onChange={handleChange}
                  onKeyDown={handleIntegerKeyDown}
                  onFocus={() => handleFocus("ntsTotalMarks")}
                  onBlur={() => handleBlur("ntsTotalMarks")}
                  required
                  placeholder=" "
                />
                <label className="input-label">Total Marks</label>
                {errors.ntsTotalMarks && <p className="error-text">{errors.ntsTotalMarks}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="form-button">
          <button
            type="submit"
            className="reg-button"
            disabled={hasErrors()}
            style={{
              opacity: hasErrors() ? 0.5 : 1,
              pointerEvents: hasErrors() ? "none" : "auto",
            }}
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
