import React, { useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// import { hexToRgb } from '@material-ui/core';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import Pair from '../../store/model/pair';
// import { RGBToRGBA } from '../../utilities/customTheme';
import { Theme } from '../../theme/custom-theme';

interface PairRowProps {
  pair: Pair;
  index: number;
}

export const PairRow = React.forwardRef<HTMLLIElement, PairRowProps>(
  (props, ref) => {
    const { pair, index } = props;
    const { participants } = useContext(EventContext);

    function getName(orderId: number): string | undefined | null {
      const found = participants[orderId];

      if (found !== undefined) {
        return found.name;
      }
      return undefined;
    }

    function isLast(orderId: number): boolean {
      const found = participants[orderId];
      const last = participants[participants.length - 1];

      if (found !== undefined && last !== undefined) {
        return found.id === last.id;
      }

      return false;
    }

    function stringToColor(input: string) {
      let hash = 0;
      let i;

      /* eslint-disable no-bitwise */
      for (i = 0; i < input.length; i += 1) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = '#';

      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        // eslint-disable-next-line no-unused-vars
        color += `00${value.toString(16)}`.substr(-2);
      }
      /* eslint-enable no-bitwise */
      return `${Theme.palette.secondary.main}`; // color;
    }

    const gifterName = getName(pair.fromIndex) ?? '';
    // eslint-disable-next-line no-unused-vars
    const gifterColor = stringToColor(gifterName) ?? '';

    return (
      <DeviceContextConsumer>
        {(context) => (
          <>
            <ListItem
              ref={ref ?? undefined}
              key={index}
              alignItems="center"
              style={{
                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '13px' : '10px',
                backgroundColor: 'whitesmoke',
                border: `1px dotted ${Theme.palette.secondary.main}`,
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <ListItemText
                sx={{
                  maxWidth: '40%',
                }}
                primaryTypographyProps={{
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                  textTransform: 'uppercase',
                }}
                primary="GIFTER"
                secondary={(
                  <Typography
                    sx={{
                      display: 'inline',
                    }}
                    style={{
                      fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {gifterName}
                  </Typography>
                )}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyItems: 'center',
                marginLeft: '-20px',
                opacity: '0.5',
                maxWidth: '20%',
              }}
              >
                <KeyboardArrowRight style={{
                  height: '76px',
                  width: 'auto',
                  color: gifterColor,
                  marginLeft: '0px',
                }}
                />
                <KeyboardArrowRight style={{
                  height: '60px',
                  width: 'auto',
                  color: gifterColor,
                  marginLeft: '-55px',
                }}
                />
                <KeyboardArrowRight style={{
                  height: '47px',
                  width: 'auto',
                  color: gifterColor,
                  marginLeft: '-44px',
                }}
                />
              </div>
              <ListItemText
                sx={{
                  justifyContent: 'flex-end',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '40%',
                }}
                primaryTypographyProps={{
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                  height: '100%',
                  justifySelf: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
                secondaryTypographyProps={{
                  align: 'right',
                }}
                primary="GIFTED"
                secondary={(
                  <Typography
                    style={{
                      fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                      fontWeight: 'bold',
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
  },
);
