import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ErrorDialog = ({ open, message, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" variant="contained">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default ErrorDialog;
