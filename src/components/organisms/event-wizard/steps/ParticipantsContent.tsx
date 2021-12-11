import { useContext, useEffect } from "react";
import { EventContext } from "../../../../contexts/CartContext";
import Button from '@material-ui/core/Button';
import { CountedItemDetails, useGroupedItems } from "../../../../hooks/useGroupedItems";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DeviceContextConsumer, DeviceType } from '../../../../contexts/DeviceContext';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Path as HomePath } from '../../../screens/MainScreen';

const useStyles = makeStyles((theme) => ({
    title: {
      marginTop: theme.spacing(2)
    }
  }));

export const Title = "Participants";

export function ParticipantsContent(){
    const classes = useStyles();
    const { groupedItems, total } = useGroupedItems();
    const { remove, add, getParticipantsAmount: getCount, decrementByOne } = useContext(EventContext);
    const history = useHistory();

    useEffect(()=>{
        if(getCount() === 0){
            history.push(HomePath);
        }

    }, [getCount]);

    return (
    <DeviceContextConsumer>
    {context =>    
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
            paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'
        }}>
            <TableContainer component={Paper}>
                <Table 
                    style={{
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '20px': '12px'
                    }}
                    aria-label="zawartość koszyka">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold', fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}} width="40%">{'Produkty'.toUpperCase()}</TableCell>
                            <TableCell style={{fontWeight: 'bold', fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}} align="center" width="15%">{'Szt.'.toUpperCase()}</TableCell>
                            <TableCell style={{fontWeight: 'bold', fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}} align="right" width="45%">{'Cena'.toUpperCase()}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}}>
                        {groupedItems.map((item: CountedItemDetails, index: number)=>{
                            return (<TableRow key={index}>
                                <TableCell component="th" scope="row" style={{fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}}>
                                {item.details.title}
                                </TableCell>
                                <TableCell align="right" style={{fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}}>
                                    <div 
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignContent: 'center',
                                            textAlign: 'center'
                                        }}>
                                        <ButtonGroup size="small" style={{display: 'flex'}}>
                                            <IconButton
                                                onClick={()=>{
                                                    decrementByOne(item.details);
                                                }}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Button
                                                disabled={true}
                                                style={{
                                                    color: 'black'}}
                                                    variant="text">
                                                {item.count}
                                            </Button>
                                            <IconButton
                                                onClick={()=>{
                                                    add(item.details);
                                                }}>
                                                <AddIcon/>
                                            </IconButton>
                                        </ButtonGroup>
                                        <Typography style={{
                                            paddingTop: context === DeviceType.isDesktopOrLaptop ? '10px' : '6px'
                                        }}>
                                            <a 
                                            className={"pointerOverEffect"}
                                            style={{
                                            cursor: 'pointer',
                                            color: 'rgba(206, 17, 38, 1)',
                                            }}
                                            onClick={()=>{
                                                remove(item.details)
                                            }}
                                            >
                                            {'USUŃ'}</a>
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="right" style={{fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}}>
                                    {item.details.price + 'zł'}
                                </TableCell>
                        </TableRow>);
                        })}
                        <TableRow>
                            <TableCell align="right">
                            <Typography 
                                variant={context === DeviceType.isDesktopOrLaptop ? "h4" : "h6"}
                                gutterBottom 
                                className={classes.title}
                                style={{
                                    fontWeight: 'bold'
                                }}>
                                SUMA
                            </Typography>
                            </TableCell>
                            <TableCell align="right" colSpan={2}>
                                <Typography 
                                    gutterBottom 
                                    className={classes.title}
                                    style={{
                                        fontWeight: 'normal',
                                        fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '24px'
                                    }}>
                                    {total() + 'zł'}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }
    </DeviceContextConsumer>)
}