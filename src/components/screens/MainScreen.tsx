import React, { useContext, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { EventContext } from '../../contexts/CartContext';

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
    fontFamily: 'Montserrat',
  },
}));

const MainScreen = function () {
  const { getParticipantsAmount } = useContext(EventContext);
  const [wizardInProgress] = useState<boolean>(getParticipantsAmount() > 0);

  return (
    getParticipantsAmount() > 0 || wizardInProgress ? (
      <div>1</div>
    ) : (
      <div>2</div>
    )
  );
};

export default MainScreen;
