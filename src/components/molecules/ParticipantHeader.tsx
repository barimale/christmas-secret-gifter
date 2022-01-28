import React, { useState, useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import sizeMe from 'react-sizeme';
import AddParticipantModal from '../organisms/AddParticipantModal';
import { EventContext } from '../../contexts';

const ParticipantHeader = () => {
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);
  const { giftEvent } = useContext(EventContext);

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid lightgrey',
      }}
      >
        <Tooltip title={giftEvent?.eventId ?? ''}>
          <IconButton>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <IconButton
          style={{
            borderRadius: '0px',
          }}
          onClick={() => {
            setIsAddVisible(true);
          }}
        >
          <p>ADD PARTICIPANT</p>
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
