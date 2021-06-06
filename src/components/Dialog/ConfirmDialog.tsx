import React, { ReactNode } from 'react';
import { Dialog as MaterialDialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';

interface ConfirmDialogProps {
  open: boolean,
  title: string,
  message?: ReactNode,
  acceptOption?: string,
  cancelOption?: string,
  onAccept?: () => void
  onCancel?: () => void
}

export const ConfirmDialog = 
  ({open, title, message, acceptOption: acceptOptionOrUndefined, cancelOption: cancelOptionOrUndefined, onAccept, onCancel}: ConfirmDialogProps) => {
  const acceptOption = acceptOptionOrUndefined || 'Yes'
  const cancelOption = cancelOptionOrUndefined || 'No'

  return <MaterialDialog
    open={open}
    onClose={onCancel}
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
      { onAccept !== undefined && (
        <Button onClick={onAccept} color="primary">
          {acceptOption}
        </Button>
      )}
      { onCancel !== undefined && (
        <Button onClick={onCancel} color="primary">
          {cancelOption}
        </Button>
      )}
    </DialogActions>
  </MaterialDialog>;
}
