/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ConfirmationDialog from './ConfirmationDialog';

interface ActionComponentProps {
  onAgreeAction: (id: string) => void;
  id: string;
  title: string;
  question: string;
  noLabel: string;
  yesLabel: string;
  disabled?: boolean;
}
export const DeleteActionComponent = (props: ActionComponentProps) => {
  const { id, onAgreeAction, disabled } = props;
  const [isShown, setIsShown] = useState<boolean>(false);

  return (
    <>
      <Tooltip title={(disabled !== undefined && disabled === true ? ('Delete') : ('Delete')).toString()}>
        <span>
          <IconButton
            disabled={disabled !== undefined ? disabled : undefined}
            onClick={async () => {
              setIsShown(!isShown);
            }}
          >
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <ConfirmationDialog
        {...props}
        isVisible={isShown}
        onDisagree={() => {
          setIsShown(false);
        }}
        onAgree={async () => {
          await onAgreeAction(id);
          setIsShown(false);
        }}
      />
    </>
  );
};
