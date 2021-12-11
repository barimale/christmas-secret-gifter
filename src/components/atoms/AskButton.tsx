import React from "react";
import { DeviceContextConsumer, DeviceType } from "../../contexts/DeviceContext";
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Path as ContactPath } from "../screens/ContactScreen";
import { useHistory } from "react-router-dom";
import useTheme from "@material-ui/core/styles/useTheme";

type AskButtonProps = {
    isFirstLineVisible? : boolean;
}

export const AskButton = (props: AskButtonProps) => {
    const history = useHistory();
    const theme = useTheme();
    
    return(
    <DeviceContextConsumer>
    {context =>
        <div style={{
            paddingRight: '20px',
            display: 'flex', 
            flexDirection: 'column'}}>
            {props.isFirstLineVisible === undefined || (props.isFirstLineVisible !== undefined && props.isFirstLineVisible === true) &&(
            <Typography style={{
                verticalAlign: 'middle',
                textAlign: 'left',
                fontSize: context === DeviceType.isDesktopOrLaptop ? "14px" : "12px"}}>
                {'Produkt niedostępny'}
            </Typography>
            )}
            <Typography 
                paragraph={false}
                style={{
                    verticalAlign: 'middle',
                    paddingRight: context === DeviceType.isDesktopOrLaptop ? "20px" : "10px",
                    fontSize: context === DeviceType.isDesktopOrLaptop ? "10px" : "10px"}}>
                <a 
                    className={"pointerOverEffect"}
                    style={{
                        cursor: 'pointer',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        color: '#0B3976',
                        textDecorationLine: 'none'
                    }}
                    onClick={(event: any)=>{
                        event.stopPropagation();
                        history.push(ContactPath);
                    }}>
                    <OpenInNewIcon 
                    fontSize={context === DeviceType.isDesktopOrLaptop ? 'small' : 'small'}
                    style={{
                        verticalAlign: 'middle',
                        paddingRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                    }}/>
                    {'ZAPYTAJ O DOSTĘPNOŚĆ'}
                </a>
            </Typography>
        </div>
    }
    </DeviceContextConsumer>
    );
}