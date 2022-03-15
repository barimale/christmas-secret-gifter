import React, { useState, useRef, useEffect, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useHistory } from 'react-router-dom';
import Footer from '../organisms/Footer/component';
import Header from '../organisms/Header';
import { Theme } from '../../theme/custom-theme';
import { BackgroundColorMode, BackgroundContext } from '../../contexts/BackgroundContext';
import SnowMaker from '../../app/SnowComponents';
import { LayoutContext } from '../../contexts/LayoutContext';

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const MainLayout = (props : any) => {
  const basicColor = `${Theme.palette.common.black}`;
  const { backgroundColorMode } = useContext(BackgroundContext);
  const { setFooterMarginBottom } = useContext(LayoutContext);
  // eslint-disable-next-line no-unused-vars
  const [backgroundColor, setBackgroundColor] = useState<string>(basicColor);
  const [paddingTop, setPaddingTop] = useState<number>(10);
  const [marginBottom, setMarginBottom] = useState<number>(35);
  const snowMaker = SnowMaker.getInstance();

  const { innerHeight: height } = window;
  const isPortrait = useMediaQuery({
    orientation: 'portrait',
  });
  const prevVal = usePrevious(isPortrait);
  const location = useLocation();
  const history = useHistory();

  const mainLayoutRef = useRef(null);

  useEffect(() => {
    document.body.appendChild(snowMaker.canvas);
    snowMaker.start();
  }, []);

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
    if (backgroundColorMode === BackgroundColorMode.normal) {
      setBackgroundColor(basicColor);
    } else {
      setBackgroundColor(basicColor);
    }
  }, [backgroundColorMode]);

  useEffect(() => {
    const resizeListener = () => {
      if (mainLayoutRef.current) {
        const node = mainLayoutRef.current as any;
        snowMaker.canvas.height = node.getBoundingClientRect().height;
        snowMaker.canvas.width = node.getBoundingClientRect().width;
      }
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, [mainLayoutRef.current]);

  return (
    <>
      <Header onSize={(size: any) => {
        setPaddingTop(size.height || 0);
      }}
      />
      <div
        ref={mainLayoutRef}
        id="greeting"
        className="main-layout"
        style={{
          height: height - paddingTop,
          width: '100%',
          paddingTop,
          marginBottom: `${-marginBottom}px`,
          display: 'inline-flex',
          backgroundColor,
          // background: 'radial-gradient(circle at 50% 300px, #0c2656, #000d25 100%), #0c2656',
          justifyContent: 'center',
        }}
      >
        {props.children}
      </div>
      <Footer onSize={(size: any) => {
        setMarginBottom(size.height || 0);
        setFooterMarginBottom(size.height || 35);
      }}
      />
    </>
  );
};
