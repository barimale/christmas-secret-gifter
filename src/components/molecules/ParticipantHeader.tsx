import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@material-ui/core';
import sizeMe from 'react-sizeme';
import AddParticipantModal from '../organisms/AddParticipantModal';

const ParticipantHeader = () => {
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);

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
        <IconButton
          style={{
            borderRadius: '0px',
            color: '#bdad31',
          }}
          onClick={() => {
            setIsAddVisible(true);
          }}
        >
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
