import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router-dom";

const ProfileDialogBox = ({ open, setOpen, seller }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    setOpen(false);
    navigate(`/seller/profile/edit/${seller._id}`);
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Seller Profile</DialogTitle>
        <DialogContent dividers>
          <ProfilePage seller={seller} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileDialogBox;
