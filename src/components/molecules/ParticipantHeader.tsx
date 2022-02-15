import React, { useState, useContext, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@material-ui/core';
import sizeMe from 'react-sizeme';
import AddParticipantModal from '../organisms/AddParticipantModal';
import { EventContext } from '../../contexts';

const ParticipantHeader = () => {
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);
  const { participants } = useContext(EventContext);
  const [alreadMounted, setAlreadyMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setAlreadyMounted(true);
    }, 4000);
  }, []);

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
            marginBottom: '1px',
          }}
          onClick={() => {
            setIsAddVisible(true);
          }}
        >
          <AddIcon className={participants.length === 0 && !alreadMounted ? 'pulse' : ''} />
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
