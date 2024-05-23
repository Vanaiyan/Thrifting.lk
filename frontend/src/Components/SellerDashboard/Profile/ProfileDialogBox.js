
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ProfilePage from "./Profile";

const ProfileDialogBox = ({open, setOpen, seller}) => {
 

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Seller Profile</DialogTitle>
        <DialogContent dividers>
          <ProfilePage seller={seller} />
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setOpen(false)}>Edit</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileDialogBox;
