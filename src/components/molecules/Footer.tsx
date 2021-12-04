import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { DeviceContextConsumer } from '../../contexts/DeviceContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(100,100,100,0.15)',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  title: {
    flexGrow: 1,
    fontSize: 10,
    color: 'white',
    fontFamily: 'Montserrat'
  },
}));

export const Footer = () =>  {
  const classes = useStyles();

  return (
    <DeviceContextConsumer>
    {context => 
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
    }   
    </DeviceContextConsumer>
  )
}