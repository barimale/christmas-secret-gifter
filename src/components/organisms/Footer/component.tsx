/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sizeMe from 'react-sizeme';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
import { DeviceContextConsumer } from '../../../contexts';
import { Theme } from '../../../theme/custom-theme';

const Footer = () => {
  const basicColor = `${Theme.palette.common.black}`;
  const [backgroundColor, setBackgroundColor] = useState<string>(basicColor);
  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <DeviceContextConsumer>
      {() => (
        <footer
          className={classes.root}
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor,
            zIndex: 3,
          }}
        >
          <div
            className={classes.title}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{
              fontSize: '12px',
            }}
            >
              <a
                className="pointerOverEffect"
                href="https://github.com/barimale"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                {`${t('Created in')} ©2022 ${t('by')} barimale`}
              </a>
            </span>
          </div>
        </footer>
      )}
    </DeviceContextConsumer>
  );
};

export default sizeMe({
  monitorHeight: true,
})(Footer);
