import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import { Path as ContactPath } from '../../screens/ContactScreen';

const Footer = () => {
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
          display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
        }}
      >
        <span>
          &copy; 2022 - Christmas Secret Gifter
        </span>
        <span>
          <Link
            to={ContactPath}
            style={{
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Contact
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
