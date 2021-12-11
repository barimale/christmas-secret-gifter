import Header from "../molecules/Header";
import { Footer } from "../molecules/Footer";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const MainLayout = (props : any) =>  {
    const [paddingTop, setPaddingTop] = useState<number>(10);
    const { innerHeight: height } = window;
    const isPortrait = useMediaQuery({ orientation: 'portrait' });
    const prevVal = usePrevious(isPortrait);
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
      history.push(location.pathname);
    }, [window.screen.width, window.screen.height]);

    useEffect(()=>{
      if(prevVal === undefined){
        return;
      }

      if(isPortrait !== prevVal){
        history.push(location.pathname);
      }
    }, [isPortrait, prevVal]);

    return (
    <>
        <Header onSize={(size: any)=>{
            setPaddingTop(size.height || 0);
        }} />
        <div className="main-layout" style={{
            height: height - paddingTop,
            width: '100%',
            paddingTop: paddingTop,
            display: 'inline-flex',
            background: 'radial-gradient(ellipse at bottom, #0B3976 0%, black 100%)',
            justifyContent: 'center'}}>
            {props.children}
            <Footer/>
        </div>
    </>
    );
}
