import { useState } from "react";

export const useValidators = () => {
  const [errors, setErrors] = useState({});

  // Validate string fields (only alphabets and spaces allowed)
  const validateString = (name, value) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Numbers are not allowed before character.",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  // Validate integer fields (only numbers allowed)
  const validateInteger = (name, value) => {
    const regex = /^\d+$/;
    if (!regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only numbers are allowed.",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  // Validate CNIC format (XXXXX-XXXXXXX-X)
  const validateCNIC = (name, value) => {
    const regex = /^\d{5}-\d{7}-\d{1}$/;
    if (!regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid CNIC (XXXXX-XXXXXXX-X).",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  // Validate phone number format (XXXX-XXXXXXX)
  const validatePhoneNumber = (name, value) => {
    const regex = /^\d{4}-\d{7}$/;
    if (!regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid phone number (XXXX-XXXXXXX).",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  // Validate email format
  const validateEmail = (name, value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid email address.",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  // Validate address (minimum length check)
  const validateAddress = (name, value) => {
    if (value.length < 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Address must be at least 5 characters long.",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  return {
    errors,
    validateString,
    validateInteger,
    validateCNIC,
    validatePhoneNumber,
    validateEmail,
    validateAddress,
  };
};
