import React from "react";
import { DeviceContextConsumer, DeviceType } from "../../contexts/DeviceContext";
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useMediaQuery } from "react-responsive";

interface NavigateToButtonProps {
    destination: string;
}

export const NavigateToButton = (props: NavigateToButtonProps) => {
    const { destination } = props;
    const isWideDevice = useMediaQuery({ minDeviceWidth: 444 });

    return(
    <DeviceContextConsumer>
    {context =>
        <>
            <Typography 
                paragraph={true}
                style={{
                    marginBottom: '0px',
                    backgroundColor: 'rgba(11, 57, 118,0.45)',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderBottomLeftRadius: '30px',
                    borderBottomRightRadius: '30px',
                    paddingLeft: context === DeviceType.isDesktopOrLaptop ? '10px' : (isWideDevice === true ? '20px' : '5px'),
                    paddingRight: context === DeviceType.isDesktopOrLaptop ? '10px' : (isWideDevice === true ? '20px' : '5px'),
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '20px' : (isWideDevice === true ? '30px' : '12px'),
                    }}>
                <a 
                    style={{
                        cursor: 'pointer',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        color: '#FFD100',
                        fontWeight: 'bold',
                        textDecoration: 'unset'
                    }}
                    className={"pointerOverEffect"}
                    onClick={(event: any)=>{
                        event.stopPropagation();
                    }}
                    href={destination}>
                    <OpenInNewIcon 
                    style={{
                        verticalAlign: 'middle',
                        paddingRight: context === DeviceType.isDesktopOrLaptop ? '10px' : '6px',
                        color: '#FFD100',
                        height: context === DeviceType.isDesktopOrLaptop ? '32px' : (isWideDevice === true ? '40px' : '24px'),
                        width: context === DeviceType.isDesktopOrLaptop ? '32px' : (isWideDevice === true ? '40px' : '24px'),
                    }}/>
                    {'PRZEJDŹ DO POWIĄZANYCH PRODUKTÓW'}
                </a>
            </Typography>
        </>
    }
    </DeviceContextConsumer>
    );
}