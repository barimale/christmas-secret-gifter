import React, { useRef } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import useOverEffectHook from '../../hooks/useOverEffectHook';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import CopyToClipboard from '../atoms/CopyToClipboard';

export const CopyPairsToClipboard = (props: any) => {
  const copiedMessage = 'Copied';
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);

  return (
    <DeviceContextConsumer>
      { (context) => (
        <CopyToClipboard
          TooltipProps={{
            title: copiedMessage, leaveDelay: 1000, leaveTouchDelay: 1000,
          }}
        >
          {({ copy }) => (
            <IconButton
              ref={hoverRef}
              {...props}
              onClick={() => copy(props.content)}
              style={{
                opacity: opacityValue,
                height: context === DeviceType.isDesktopOrLaptop ? '30px' : '22px',
                width: context === DeviceType.isDesktopOrLaptop ? 'auto' : 'auto',
                justifyItems: 'left',
                margin: '0px',
                alignSelf: 'end',
                borderRadius: '0px',
                padding: '0px',
                paddingTop: context === DeviceType.isDesktopOrLaptop ? '3px' : '2px',
                paddingBottom: context === DeviceType.isDesktopOrLaptop ? '3px' : '2px',
              }}
            >
              <Typography
                style={{
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '14px' : '8px',
                  color: 'black',
                  margin: '0px',
                  paddingRight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '8px' : '4px',
                }}
              >
                Copy to Clipboard
              </Typography>
              <FileCopyIcon fontSize={context === DeviceType.isDesktopOrLaptop ? 'medium' : 'small'} />
            </IconButton>
          )}
        </CopyToClipboard>
      )}
    </DeviceContextConsumer>
  );
};
