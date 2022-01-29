import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { DeviceContextConsumer, DeviceType } from '../../contexts';

type ModalTitleProps = {
    title: string;
    close?: () => void;
}

export const ModalTitle = (props: ModalTitleProps) => {
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          width: 'auto',
          height: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: '10px',
          paddingBottom: '10px',
          backgroundColor: 'black',
          borderLeft: `20px solid ${theme.palette.primary.main}`,
        }}
        >
          <Typography
            align="center"
            style={{
              margin: '0px',
              color: `${theme.palette.common.white}`,
              WebkitTapHighlightColor: 'transparent',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
              textAlign: 'left',
              width: '100%',
              paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '12px',
              textShadow: '1px 1px black',
            }}
          >
            {props.title}
          </Typography>
          {props.close !== undefined && (
          <IconButton
            className="pointerOverEffect"
            onClick={async () => {
              if (props.close !== undefined) {
                props.close();
              }
            }}
          >
            <ClearIcon style={{
              color: 'white',
            }}
            />
          </IconButton>
          )}
        </div>
      )}
    </DeviceContextConsumer>
  );
};
