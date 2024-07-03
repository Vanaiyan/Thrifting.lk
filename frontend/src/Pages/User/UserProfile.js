import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  DialogContentText,
} from "@mui/material";

import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  updateProfilePicture,
} from "../../Actions/userProfileAction";
import NavBar from "../../Components/Navigation bar/navigation";
import Footer from "../../Components/Footer/Footer";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const UserProfile = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    profilePicture: "",
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [emailError, setEmailError] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [profilePictureChanged, setProfilePictureChanged] = useState(false); // New state

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
        setEditedProfile({
          ...data,
          dateOfBirth: data.dateOfBirth || "", // Ensure dateOfBirth is not null
        });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    getUserProfile();
  }, []);

  const handleEditProfileOpen = () => {
    setEditedProfile(profile);
    setEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setEditProfileOpen(false);
    setShowPasswordFields(false);
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({ ...prevProfile, [name]: value }));

    if (name === "email") {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(emailValid ? "" : "Please enter a valid email address");
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));

    // Validate new password
    if (name === "newPassword") {
      const errors = [];
      if (value.length < 8) {
        errors.push("Password must be at least 8 characters long.");
      }
      if (!/\d/.test(value)) {
        errors.push("Password must contain at least one number.");
      }
      if (!/[a-zA-Z]/.test(value)) {
        errors.push("Password must contain at least one letter.");
      }
      setPasswordErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: errors.join(" "),
      }));
    }

    // Confirm password validation
    if (
      name === "confirmPassword" ||
      (name === "newPassword" && passwords.confirmPassword)
    ) {
      if (value !== passwords.newPassword) {
        setPasswordErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setPasswordErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "",
        }));
      }
    }
  };

  const handleResetPassword = () => {
    setShowPasswordFields((prevShow) => !prevShow);
    if (showPasswordFields) {
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleSaveChanges = async () => {
    if (
      emailError ||
      passwordErrors.newPassword ||
      passwordErrors.confirmPassword
    )
      return;

    try {
      const updatedProfile = { ...editedProfile };
      if (passwords.currentPassword && passwords.newPassword) {
        updatedProfile.currentPassword = passwords.currentPassword;
        updatedProfile.newPassword = passwords.newPassword;
      }
      const updatedData = await updateUserProfile(updatedProfile);
      setProfile(updatedData);
      setEditProfileOpen(false);
    } catch (error) {
      console.error("Failed to update user information.", error);
      if (error.message === "Wrong current password") {
        setPasswordErrors((prevErrors) => ({
          ...prevErrors,
          currentPassword: "Wrong current password",
        }));
      }
    }
  };

  const handleSaveProfilePicture = async () => {
    try {
      await updateProfilePicture(profilePictureUrl);
      const updatedProfileData = await fetchUserProfile();
      setProfile(updatedProfileData);
      setProfilePictureUrl("");
      setProfilePictureChanged(false);
    } catch (error) {
      console.error("Failed to update profile picture.", error);
    }
  };

  const capitalizeGender = (gender) => {
    if (gender.toLowerCase() === "male") return "Male";
    if (gender.toLowerCase() === "female") return "Female";
    return gender;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "N/A"; // or any default value you prefer
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "N/A"; // or any default value you prefer
    }

    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
      date
    );
  };

  const handleAvatarClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const downloadURL = await uploadProfilePicture(file, (progress) => {
        console.log(`Upload is ${progress}% done`);
      });
      setProfilePictureUrl(downloadURL);
      setUploading(false);
      setConfirmDialogOpen(true); // Open the dialog to confirm profile picture change
      setProfilePictureChanged(true); // Set profile picture changed state
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploading(false);
      setConfirmDialogOpen(false);
    }
  };

  const updateProfilePictureBackend = async () => {
    try {
      await updateProfilePicture(profilePictureUrl); // Assuming updateProfilePicture is a function that sends request to backend
      const updatedProfileData = await fetchUserProfile(); // Fetch updated profile data
      setProfile(updatedProfileData); // Update profile state
      setProfilePictureUrl(""); // Reset profile picture URL
      setProfilePictureChanged(false); // Reset profile picture changed state
    } catch (error) {
      console.error("Failed to update profile picture in backend.", error);
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: "50px" }}>
        <NavBar />
        <br />
        <br />
        <Box
          sx={{
            padding: 4,
            maxWidth: 800,
            margin: "0 auto",
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: 4 }}>
            <Avatar
              alt="Profile Picture"
              src={profile.profilePicture}
              sx={{
                width: 150,
                height: 150,
                margin: "0 auto",
                marginBottom: 2,
                cursor: "pointer",
              }}
              onClick={handleAvatarClick}
            />
            <Typography
              variant="h4"
              sx={{ marginBottom: 2, fontFamily: "Times New Roman, serif" }}
            >{`${profile.firstName} ${profile.lastName}`}</Typography>
          </Box>
          <Box sx={{ textAlign: "center", marginBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  First Name: {profile.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Last Name: {profile.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Email: {profile.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Address: {profile.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Gender: {capitalizeGender(profile.gender)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Date of Birth: {formatDate(profile.dateOfBirth)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button variant="contained" onClick={handleEditProfileOpen}>
              Edit Profile
            </Button>
          </Box>
          <Dialog open={editProfileOpen} onClose={handleEditProfileClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={editedProfile.firstName}
                    onChange={handleProfileChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={editedProfile.lastName}
                    onChange={handleProfileChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleProfileChange}
                    margin="normal"
                    error={!!emailError}
                    helperText={emailError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={editedProfile.address}
                    onChange={handleProfileChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={editedProfile.gender}
                    onChange={handleProfileChange}
                    margin="normal"
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={
                      editedProfile.dateOfBirth
                        ? editedProfile.dateOfBirth.split("T")[0]
                        : ""
                    }
                    onChange={handleProfileChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleResetPassword}
                    sx={{ marginBottom: 2 }}
                  >
                    {showPasswordFields
                      ? "Cancel Reset Password"
                      : "Reset Password"}
                  </Button>
                </Grid>
                {showPasswordFields && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                        margin="normal"
                        error={!!passwordErrors.currentPassword}
                        helperText={passwordErrors.currentPassword}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        margin="normal"
                        error={!!passwordErrors.newPassword}
                        helperText={passwordErrors.newPassword}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        margin="normal"
                        error={!!passwordErrors.confirmPassword}
                        helperText={passwordErrors.confirmPassword}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditProfileClose}>Cancel</Button>
              <Button
                onClick={handleSaveChanges}
                disabled={
                  uploading ||
                  !!emailError ||
                  !!passwordErrors.newPassword ||
                  !!passwordErrors.confirmPassword
                }
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={confirmDialogOpen} onClose={handleConfirmClose}>
            <DialogTitle>Change Profile Picture</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you want to change/update your profile picture?
              </DialogContentText>
              <DialogActions>
                <Button onClick={handleConfirmClose}>Cancel</Button>
                <Button component="label" disabled={uploading}>
                  {uploading ? "Uploading..." : "Change Picture"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleProfilePictureChange}
                  />
                </Button>
                {profilePictureChanged && (
                  <Button
                    onClick={handleSaveProfilePicture}
                    disabled={uploading}
                  >
                    Save Profile Picture
                  </Button>
                )}
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UserProfile;
