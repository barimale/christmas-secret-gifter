import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { DeviceContextConsumer, DeviceType } from "../../contexts/DeviceContext";
import { NavigateToButton } from "../molecules/NavigateToButton";
import { OrderedSectionsConfiguration } from "../../router/routerConfiguration";
import { useMediaQuery } from "react-responsive";

export const Products: Array<ProductData> = [
    {
        imageName: '37m.jpg',
        name: "odkrywam.",
        subtitle: "Jestem\nKobietą",
        description: "“Jeśli kobieta jest szczęśliwa, jest także piękna”",
        uri: OrderedSectionsConfiguration[0].api
    },
    {      
        imageName: '69m.jpg',
        name: "odkrywam.",
        subtitle: "TUS",
        description: "“Czerp z innych ale nie kopiuj ich. Bądź sobą”",
        uri: OrderedSectionsConfiguration[1].api
    },
    {
      imageName: '55m.jpg',
      name: "odkrywam.",
      subtitle: "Grupy Rozwojowe",
      description: "“Martwimy się, kim nasze dziecko będzie jutro, ale zapominamy, że ono jest Kimś już dziś”",
      uri: OrderedSectionsConfiguration[2].api
  },
];

export interface ProductData {
    name: string;
    subtitle: string;
    description: string;
    imageName: string;
    uri: string;
}

interface CardProps{
    data: ProductData;
    height?: number;
    width?: number;
}

export const Card = (props: CardProps) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const isWideDevice = useMediaQuery({ minDeviceWidth: 444 });
    const isHorizontalMobile = useMediaQuery({ minDeviceWidth: 444, maxDeviceHeight: 500 });
    const { data } = props;
  
    return (
    <DeviceContextConsumer>
      {context => (
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedBackToFront={1}
        flipSpeedFrontToBack={1}>
          <Grid item xs>
            <Paper style={{
                cursor: 'pointer',
                borderRadius: 30,
                backgroundImage: `url('${process.env.PUBLIC_URL}/stars.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                border: '1px solid black',
                WebkitTapHighlightColor: 'transparent',
                height: props.height !== undefined?  props.height : 'inherit',
                width: props.width !==undefined ? props.width : 'inherit'}}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  color: 'white',
                  WebkitTapHighlightColor: 'transparent',
                  height: props.height !== undefined?  props.height : 'inherit',
                  width: props.width !==undefined ? props.width : 'inherit'}}
                 onClick={()=>{setIsFlipped(!isFlipped)}}>
                  <div style={{
                    paddingTop: isHorizontalMobile === true ? '5%' : '30%',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '70px' : (isHorizontalMobile === true ? '55px' : (isWideDevice === true ? '90px' : '50px')),
                    fontFamily:'SacramentoRegular', 
                    fontWeight: 'bold'}}>{data.name}</div>
                  <div style={{
                    whiteSpace: 'pre-line',
                    paddingTop: isHorizontalMobile === true ? '5%' : '10%',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '30px' : (isHorizontalMobile === true ? '20px' :(isWideDevice === true ? '50px' : '22px'))}}>
                      {data.subtitle.toUpperCase()}
                  </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs style={{paddingBottom: '0px'}}>
            <Paper style={{
              cursor: 'pointer',
              borderRadius: 30,
              backgroundImage: `url('${process.env.PUBLIC_URL}/${data.imageName}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              WebkitTapHighlightColor: 'transparent',
              border: '1px solid black',
              height: props.height, 
              width: props.width}}>
                <div onClick={()=>{setIsFlipped(!isFlipped)}}
                 style={{
                  WebkitTapHighlightColor: 'transparent',
                  height: (props.height !== undefined?  props.height : 'inherit'),
                  width: props.width !== undefined ? props.width : 'inherit'
                 }}>
                <div
                  style={{
                    marginBottom: context === DeviceType.isDesktopOrLaptop ? '-32px !important' : '-28px !important',
                    position:'absolute',
                    bottom: 0,
                    color: 'white',
                    whiteSpace: 'pre-line',
                    alignContent: 'stretch',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '30px' : (isWideDevice === true ? '50px' : '22px'),
                    width: props.width !== undefined ? props.width : 'inherit'}}>
                      <NavigateToButton destination={data.uri}/>
                </div>
              </div>
            </Paper>
          </Grid>
      </ReactCardFlip>)}
    </DeviceContextConsumer>
    );
}