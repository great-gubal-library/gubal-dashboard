import { Button, Dialog as MaterialDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface ErrorDialogProps {
  open: boolean,
  title: string,
  message?: ReactNode,
  onClose: () => void;
}

export const ErrorDialog =
  ({ open, title, message, onClose }: ErrorDialogProps) => {
    return <MaterialDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      {
        !message ? null :
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
      }
      <DialogActions>
        {onClose !== undefined && (
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </MaterialDialog>;
  }
