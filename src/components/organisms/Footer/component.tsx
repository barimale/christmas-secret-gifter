import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import { ContactPath } from '../../screens/ContactScreen';
import { DeviceContextConsumer } from '../../../contexts';

export const Footer = () => {
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
              display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', fontSize: '30px',
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
