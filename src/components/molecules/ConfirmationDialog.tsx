import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export type ConfirmationDialogProps = {
  title: string;
  question: string;
  noLabel: string;
  yesLabel: string;
  onDisagree: () => void;
  onAgree: () => void;
  isVisible: boolean;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { title, question, onDisagree, onAgree, noLabel, yesLabel, isVisible } = props;

  const handleClose = (decision: boolean) => {
    if (decision === true) {
      onAgree();
    } else {
      onDisagree();
    }
  };

  return (
    <div>
      <Dialog
        open={isVisible}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {question}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(false);
            }}
            color="primary"
          >
            {noLabel}
          </Button>
          <Button
            onClick={() => {
              handleClose(true);
            }}
            autoFocus
            color="secondary"
          >
            {yesLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
