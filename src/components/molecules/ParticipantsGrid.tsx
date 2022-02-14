/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import sizeMe, { SizeMe } from 'react-sizeme';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import Participants from './Participants';
import ParticipantHeader from './ParticipantHeader';

const ParticipantsGrid = () => {
  const { participants } = useContext(EventContext);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  return (
    <SizeMe
      monitorHeight
      monitorWidth
    >
      { (size) => (
        <DeviceContextConsumer>
          {(context) => (
            <div
              id={context === DeviceType.isDesktopOrLaptop ? 'iconedBackground' : 'iconedBackground-mobile'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'whitesmoke',
                padding: '20px',
                height: '82%',
                paddingTop: '0px',
                paddingBottom: '0px',
              }}
            >
              <ParticipantHeader
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
                />
              )}
            </div>
          )}
        </DeviceContextConsumer>
      )}
    </SizeMe>
  );
};

export default sizeMe({
  monitorHeight: true, monitorWidth: true,
})(ParticipantsGrid);
