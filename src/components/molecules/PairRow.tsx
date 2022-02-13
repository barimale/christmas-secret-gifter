import React, { useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import Pair from '../../store/model/pair';

interface PairRowProps{
  pair: Pair;
}

export const PairRow = (props: PairRowProps) => {
  const { pair } = props;
  const { participants } = useContext(EventContext);

  function getName (orderId: number): string | undefined | null {
    const found = participants[orderId];

    if (found !== undefined) {
      return found.name;
    }
    return undefined;
  }

  function getEmail (orderId: number): string | undefined | null {
    const found = participants[orderId];

    if (found !== undefined) {
      return found.email;
    }
    return undefined;
  }

  function isLast (orderId: number): boolean {
    const found = participants[orderId];
    const last = participants[participants.length - 1];

    if (found !== undefined && last !== undefined) {
      return found.id === last.id;
    }

    return false;
  }

  function stringToColor (input: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < input.length; i += 1) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }

  function stringAvatar (name: string) {
    const splitted = name.split(' ');
    const firstLettersOnly = splitted.flatMap((p) => p[0]).join('');

    return {
      children: `${firstLettersOnly.slice(0, 2)}`,
    };
  }

  const gifterName = getName(pair.fromIndex) ?? '';

  return (
    <DeviceContextConsumer>
      {(context) => (
        <>
          <ListItem
            alignItems="flex-start"
            style={{
              fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '13px' : '10px',
            }}
          >
            <ListSubheader>
              <ListItemAvatar>
                <Tooltip title={getEmail(pair.fromIndex) ?? ' '}>
                  <Avatar
                    alt={gifterName}
                    sx={{
                      width: context.valueOf() === DeviceType.isDesktopOrLaptop ? 36 : 22,
                      height: context.valueOf() === DeviceType.isDesktopOrLaptop ? 36 : 22,
                      fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
                      bgcolor: stringToColor(gifterName),
                    }}
                    {...stringAvatar(gifterName)}
                  />
                </Tooltip>
              </ListItemAvatar>
            </ListSubheader>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
              }}
              primary={gifterName}
              secondary={(
                <Typography
                  sx={{
                    display: 'inline',
                  }}
                  style={{
                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                  }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {`is going to buy a gift to ${getName(pair.toIndex)}`}
                </Typography>
              )}
            />
          </ListItem>
          {!isLast(pair.fromIndex) && (
            <Divider variant="inset" component="li" />
          )}
        </>
      )}
    </DeviceContextConsumer>
  );
};
