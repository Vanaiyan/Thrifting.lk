import React, { useState } from "react";
import { Avatar, Grid, Button, Rating, Snackbar, Alert } from "@mui/material";
 import EditDetailsForm from "./EditDetailsForm";
//import EditDetailsForm from "../../Data/EditDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";
import axios from "axios";

const EditProfile = ({ seller }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableSeller, setEditableSeller] = useState({ ...seller });
  const [changePassword, setChangePassword] = useState(false);
  const [changeEditInfo, setChangeEditInfo] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const firstLetter_firstName = seller.firstName ? seller.firstName.charAt(0) : "";
  const firstLetter_lastName = seller.lastName ? seller.lastName.charAt(0) : "";

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditableSeller({ ...seller });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditableSeller((prev) => ({
      ...prev,
      addressField: {
        ...prev.addressField,
        [name]: value,
      },
      [name]: name in prev.addressField ? prev.addressField[name] : value,
    }));
  };

  const handleChangePassword = () => {
    setChangePassword(true);
    setChangeEditInfo(false);
  };

  const handleEditDetails = () => {
    setChangeEditInfo(true);
    setChangePassword(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/profile/${editableSeller._id}`,
        editableSeller
      );
      console.log("Seller details updated successfully:", response.data);
      setEditMode(false);
      setSnackbarMessage("Seller details updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating seller details:", error);
      setSnackbarMessage("Error updating seller details");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ margin: "auto" }}
    >
      <Grid item xs={12} sm={8} md={10}>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            paddingBottom="50px"
          >
            <Avatar sx={{ width: 100, height: 100 }}>
              {`${firstLetter_firstName}${firstLetter_lastName}`}
            </Avatar>
            <Rating value={seller.rating} max={10} readOnly />
          </Grid>
          <Grid container justifyContent="center">
            <Button
              variant="text"
              color="primary"
              onClick={handleEditDetails}
              style={{ marginRight: "10px", marginTop: "10px" }}
            >
              Edit Details
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={handleChangePassword}
              style={{ marginRight: "10px", marginTop: "10px" }}
            >
              Change Password
            </Button>
          </Grid>
          {changeEditInfo && (
            <>
              <EditDetailsForm
                editMode={editMode}
                handleChange={handleChange}
                editableSeller={editableSeller}
              />
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  {editMode ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        style={{ marginRight: "10px", marginTop: "10px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancel}
                        style={{ marginTop: "10px" }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setEditMode(!editMode)}
                      style={{ marginTop: "10px" }}
                    >
                      Edit
                    </Button>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {changePassword && <ChangePasswordForm seller={seller} />}
        </div>
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
    </Grid>
  );
};

export default EditProfile;
