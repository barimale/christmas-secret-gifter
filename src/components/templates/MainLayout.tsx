import React, { useState, useRef, useEffect, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useHistory } from 'react-router-dom';
import { Footer } from '../organisms/Footer';
import Header from '../organisms/Header';
import { Theme } from '../../theme/custom-theme';
import { BackgroundColorMode, BackgroundContext } from '../../contexts/BackgroundContext';

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const MainLayout = (props : any) => {
  const basicColor = `radial-gradient(ellipse at bottom, ${Theme.palette.primary.main}  0%, black 100%)`;
  const { backgroundColorMode } = useContext(BackgroundContext);
  const [backgroundColor, setBackgroundColor] = useState<string>(basicColor);
  const [paddingTop, setPaddingTop] = useState<number>(10);
  const { innerHeight: height } = window;
  const isPortrait = useMediaQuery({
    orientation: 'portrait',
  });
  const prevVal = usePrevious(isPortrait);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.push(location.pathname);
  }, [window.screen.width, window.screen.height]);

  useEffect(() => {
    if (prevVal === undefined) {
      return;
    }

    if (isPortrait !== prevVal) {
      history.push(location.pathname);
    }
  }, [isPortrait, prevVal]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('main layout');

    if (backgroundColorMode === BackgroundColorMode.normal) {
      setBackgroundColor(basicColor);
    } else {
      setBackgroundColor('darkred');
    }
  }, [backgroundColorMode]);

  return (
    <>
      <Header onSize={(size: any) => {
        setPaddingTop(size.height || 0);
      }}
      />
      <div
        className="main-layout"
        style={{
          height: height - paddingTop,
          width: '100%',
          paddingTop,
          marginBottom: `${-paddingTop}px`,
          display: 'inline-flex',
          background: backgroundColor,
          // transition: 'background 50ms linear',
          justifyContent: 'center',
        }}
      >
        {props.children}
        <Footer />
      </div>
    </>
  );
};
