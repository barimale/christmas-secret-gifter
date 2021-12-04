import { IconButton } from '@material-ui/core';
import React from 'react';
import { 
  EmailIcon,
  WhatsappIcon,
  FacebookIcon,
  FacebookMessengerIcon } from 'react-share';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';

export default function ContactScreenContent(){
    return (
        <DeviceContextConsumer>
            {context => 
                <div style={{
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    color: 'white',
                    paddingBottom: 0,
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'end'}}>
                        {"Obserwuj nas w mediach społecznościowych:".toUpperCase()}
                    </div>
                    <div style={{
                    alignContent: 'center',
                    paddingTop: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    color: 'white',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px'
                }}>
                    <IconButton 
                        className={"pointerOverEffect"}
                        target="_blank"
                        href="https://www.facebook.com/Odkrywajcie" 
                        style={{padding: context === DeviceType.isDesktopOrLaptop ? 20 : 10}}>
                        <FacebookIcon size={context === DeviceType.isDesktopOrLaptop ? 64 : 32} round={true} />
                    </IconButton>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'end'}}>
                        {"LUB NAPISZ DO NAS:".toUpperCase()}
                    </div>
                    <div style={{
                    alignContent: 'center',
                    paddingTop: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    color: 'white',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px'
                }}>
                    <IconButton 
                        className={"pointerOverEffect"}
                        target="_blank"
                        href="https://wa.me/48721956975/?text=Cze%C5%9B%C4%87%20odkrywajcie.%21%20Mam%20pytanie%20odno%C5%9Bnie%20" 
                        style={{padding: context === DeviceType.isDesktopOrLaptop ? 20 : 10}}>
                        <WhatsappIcon size={context === DeviceType.isDesktopOrLaptop ? 64 : 32} round={true} />
                    </IconButton>
                    <IconButton
                        target="_blank"
                        href={'mailto:kontakt@odkrywajcie.pl'}
                        className={"pointerOverEffect"}
                        style={{padding: context === DeviceType.isDesktopOrLaptop ? 20 : 10}}>
                        <EmailIcon size={context === DeviceType.isDesktopOrLaptop ? 64 : 32} round={true} />
                    </IconButton>
                    <IconButton 
                        className={"pointerOverEffect"}
                        target="_blank"
                        href="https://m.me/Odkrywajcie" 
                        style={{padding: context === DeviceType.isDesktopOrLaptop ? 20 : 10}}>
                        <FacebookMessengerIcon size={context === DeviceType.isDesktopOrLaptop ? 64 : 32} round={true} />
                    </IconButton>
                    </div>
                </div>
            }
        </DeviceContextConsumer>
    );
}