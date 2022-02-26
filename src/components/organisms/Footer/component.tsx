/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import sizeMe from 'react-sizeme';
import { useStyles } from './styles';
import { ContactPath } from '../../screens/ContactScreen';
import { DeviceContextConsumer } from '../../../contexts';

const Footer = () => {
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
          }}
        >
          <div
            className={classes.title}
            style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            }}
          >
            <span style={{
              fontSize: '12px',
              fontFamily: 'Lora',
            }}
            >
              <Link
                className="pointerOverEffect"
                to={ContactPath}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                &copy; 2022 - barimale
              </Link>
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
