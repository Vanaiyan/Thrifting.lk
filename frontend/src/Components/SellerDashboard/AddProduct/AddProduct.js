import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Box, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const validateStep1 = () => {
    let errors = {};
    if (!name) errors.name = "ProductName is required";
    if (!description) {
      errors.description = "Description is required";
    } else if (description.length < 400  ) {
      errors.description = "Description must be above 400 characters ";
    }else if(description.length > 800){
      errors.description = "Description must be below 800 characters";
    }
    if (!price || isNaN(price) || price <= 0)
      errors.price = "Valid price is required and must be greater than zero";
    if (!gender) errors.gender = "Gender is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    let errors = {};
    if (category.length === 0)
      errors.category = "At least one category must be selected";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    let errors = {};
    if (pictures.length < 5)
      errors.pictures = "Exactly 5 pictures must be uploaded";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    let valid = true;
    if (step === 1) valid = validateStep1();
    if (step === 2) valid = validateStep2();
    if (valid) setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleBack = () => {
    navigate("/seller/dashboard");
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    const productData = {
      name,
      description,
      price,
      gender,
      category,
      pictures,
    };

    try {
      await axios.post(

        `http://localhost:8000/api/products/${user._id}`,
        productData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product successfully submitted:");
      setSnackbarSeverity("success");
      setSnackbarMessage("Product successfully submitted");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/seller/dashboard"); //
      }, 3000);
    } catch (error) {
      console.error("Error submitting product data:", error);
      if (error.response && error.response.status === 404) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Seller not found");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to submit product data");
        setSnackbarOpen(true);
        setErrors({ submit: "Failed to submit product data" });
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          {step === 1 && (
            <Form1
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              gender={gender}
              setGender={setGender}
              errors={errors}
            />
          )}
          {step === 2 && (
            <Form2
              category={category}
              setCategory={setCategory}
              errors={errors}
            />
          )}
          {step === 3 && (
            <Form3
              pictures={pictures}
              setPictures={setPictures}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            sx={{ marginTop: 2 }}
          >
            {step === 1 && (
              <Grid item>
                <Button variant="contained" onClick={handleBack}>
                  Back
                </Button>
              </Grid>
            )}
            {step > 1 && (
              <Grid item>
                <Button variant="contained" onClick={handlePrev}>
                  Previous
                </Button>
              </Grid>
            )}
            {step < 3 && (
              <Grid item>
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Grid>
            )}
            {step === 3 && (
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={pictures.length < 5}
                >
                  Submit
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProduct;
