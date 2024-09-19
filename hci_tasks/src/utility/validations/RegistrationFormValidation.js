import { useState } from "react";

export const useValidators = () => {
  const [errors, setErrors] = useState({});

  // Validate strings (e.g. first name, last name, etc.)
  const validateString = (name, value) => {
    if (!value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "This field is required." }));
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Only letters and spaces are allowed." }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  // Validate integers (e.g. obtained marks, total marks, etc.)
  const validateInteger = (name, value) => {
    if (!value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "This field is required." }));
      return false;
    } else if (!/^\d+$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Please enter a valid number." }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

// Validate phone number format (must be in the format 0300-0000000 and 11 digits)
const validatePhoneNumber = (name, value) => {
    const cleaned = value.replace(/\D/g, ""); // Remove formatting for validation
  
    if (cleaned.length !== 11) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Phone number must be exactly 11 digits." }));
      return false;
    } else if (!/^\d{4}-\d{7}$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Phone number must be in the format 0300-0000000." }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };
  
  // Validate CNIC format (must be in the format 00000-0000000-0 and 13 digits)
  const validateCNIC = (name, value) => {
    const cleaned = value.replace(/\D/g, ""); // Remove formatting for validation
  
    if (cleaned.length !== 13) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "CNIC must be exactly 13 digits." }));
      return false;
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "CNIC must be in the format 00000-0000000-0." }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };  

  // Validate email format
  const validateEmail = (name, value) => {
    if (!value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "This field is required." }));
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Invalid email format." }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  // Validate address (alphanumeric)
  const validateAddress = (name, value) => {
    if (!value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "This field is required." }));
      return false;
    } else if (!/^[a-zA-Z0-9\s,]*$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Invalid characters in address." }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  // Clear validation errors for specific fields
  const clearErrors = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field]; // Remove specific error
      return newErrors;
    });
  };

  return {
    errors,
    validateString,
    validateInteger,
    validateCNIC,
    validatePhoneNumber,
    validateEmail,
    validateAddress,
    clearErrors,
  };
};
