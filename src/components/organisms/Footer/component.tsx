import React from 'react';
import { useStyles } from './styles';

const Footer = () => {
  const classes = useStyles();

  return(
    <footer className={classes.root} style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%'}}>
      <div className={classes.title}>
        <span>
          <>
            &copy; 2021 - Christmas Secret Gifter 
          </>
      </span>
      </div>
    </footer>
  );
}

export default Footer
