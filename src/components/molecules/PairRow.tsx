import React, { useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { hexToRgb } from '@material-ui/core';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import Pair from '../../store/model/pair';
import { RGBToRGBA } from '../../utilities/customTheme';
import { Gifts } from './Gifts';

interface PairRowProps{
  pair: Pair;
  index: number;
}

export const PairRow = (props: PairRowProps) => {
  const { pair, index } = props;
  const { participants } = useContext(EventContext);

  function getName (orderId: number): string | undefined | null {
    const found = participants[orderId];

    if (found !== undefined) {
      return found.name;
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

  const gifterName = getName(pair.fromIndex) ?? '';
  const gifterColor = stringToColor(gifterName) ?? '';

  return (
    <DeviceContextConsumer>
      {(context) => (
        <>
          <ListItem
            key={index}
            alignItems="center"
            style={{
              fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '13px' : '10px',
              backgroundColor: `${RGBToRGBA(hexToRgb(gifterColor), 0.2)}`,
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                textTransform: 'uppercase',
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
                  is going to buy a gift to
                </Typography>
              )}
            />
            <KeyboardArrowRight style={{
              height: '80px',
              width: 'auto',
              color: 'gray',
            }}
            />
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                textAlign: 'right',
                height: '100%',
                textTransform: 'uppercase',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
              primary={(
                <Gifts style={{
                  color: `${gifterColor}`,
                }}
                />
              )}
              secondaryTypographyProps={{
                align: 'right',
              }}
              secondary={(
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                    textTransform: 'uppercase',
                    width: '100%',
                    textAlign: 'end',
                  }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {getName(pair.toIndex)}
                </Typography>
              )}
            />
          </ListItem>
          {!isLast(pair.fromIndex) && (
            <Divider
              variant="inset"
              component="li"
              style={{
                borderColor: 'transparent',
              }}
            />
          )}
        </>
      )}
    </DeviceContextConsumer>
  );
};
