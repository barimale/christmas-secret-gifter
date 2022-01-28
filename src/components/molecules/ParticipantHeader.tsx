import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import sizeMe from 'react-sizeme';
import AddParticipantModal from '../organisms/AddParticipantModal';
import { ParticipantsGridProps } from './ParticipantsGrid';

const ParticipantHeader = ({ title }: ParticipantsGridProps) => {
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid lightgrey',
      }}
      >
        <Tooltip title={title ?? ''}>
          <IconButton>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <span>Add Participants To List</span>
        <IconButton
          className="pointerOverEffect"
          style={{
            borderRadius: '0px',
          }}
          onClick={() => {
            setIsAddVisible(true);
          }}
        >
          <p>{isAddVisible}</p>
          <AddIcon />
        </IconButton>
      </div>
      <AddParticipantModal
        isDisplayed={isAddVisible}
        close={() => {
          setIsAddVisible(false);
        }}
      />
    </>
  );
};

export default sizeMe({
  monitorHeight: true, monitorWidth: true,
})(ParticipantHeader);
