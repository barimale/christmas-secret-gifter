import React, { useContext, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import sizeMe, { SizeMe } from 'react-sizeme';
import { EventContext } from '../../contexts';
import { Participants } from './Participants';
import ParticipantHeader from './ParticipantHeader';

export interface ParticipantsGridProps {
  title?: string;
}

const ParticipantsGrid = (props: ParticipantsGridProps) => {
  const { title } = props;
  const { participants } = useContext(EventContext);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  return (
    <SizeMe
      monitorHeight
      monitorWidth
    >
      { (size) => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'whitesmoke',
          padding: '20px',
          height: '100%',
          paddingTop: '0px',
          paddingBottom: '0px',
        }}
        >
          <ParticipantHeader
            title={title}
            onSize={(size: any) => {
              setHeaderHeight(size.height || 0);
            }}
          />
          {participants.length > 0 ? (
            <Grid container spacing={2}>
              <Participants maxHeight={size?.size?.height !== null
                // eslint-disable-next-line no-unsafe-optional-chaining
                ? (size?.size?.height - headerHeight)
                : 300}
              />
            </Grid>
          ) : (
            <Typography style={{
              padding: '20px',
            }}
            >
              No participants defined yet.
            </Typography>
          )}
        </div>
      )}
    </SizeMe>
  );
};

export default sizeMe({
  monitorHeight: true, monitorWidth: true,
})(ParticipantsGrid);
