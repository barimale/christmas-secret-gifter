import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CenteredDiv from '../templates/CenteredDiv';
import { Theme as customTheme } from '../../theme/custom-theme';
import ConsoledChristmasTree from '../organisms/ConsoledChristmasTree';
// import ChristmassTreeImage from '../molecules/ChristmassTreeImage';

export const Path = '/';
export const Title = 'Events';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontFamily: 'Lora',
  },
}));

export const MainScreen = function () {
  // const { getParticipantsAmount } = useContext(EventContext);
  // const [wizardInProgress] = useState<boolean>(getParticipantsAmount() > 0);

  return (
    <CenteredDiv>
      <Button
        variant="outlined"
        style={{
          fontSize: '40px',
          backgroundColor: 'radial-gradient(ellipse at bottom, black  0%, black 100%)',
          boxShadow: `${customTheme.shadows[10]}`,
          textShadow: '1px 1px darkred',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
          }}
        >
          {/* <ChristmassTreeImage style={{
            height: '100px',
          }}
          /> */}
          Let&apos;s begin
        </div>
      </Button>
      <ConsoledChristmasTree />
    </CenteredDiv>
  // // getParticipantsAmount() > 0 || wizardInProgress ? (
  //   <div>1</div>
  // // ) : (
  // //   <div>2</div>
  // // )
  );
};
