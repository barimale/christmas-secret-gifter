import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import { ContactPath } from '../../screens/ContactScreen';

export const Footer = () => {
  const classes = useStyles();

  return (
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
        }}
        >
          &copy; 2022 - Christmas Secret Gifter
        </span>
        <span style={{
          fontSize: '12px',
        }}
        >
          <Link
            to={ContactPath}
            style={{
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: 'inherit',
            }}
          >
            Contact
          </Link>
        </span>
      </div>
    </footer>
  );
};
