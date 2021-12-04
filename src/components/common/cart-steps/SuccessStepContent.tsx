import CenteredDiv from '../../common/CenteredDiv';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontFamily: "Montserrat"
    },
  }),
);

export default function SuccessStepContent(){
    const classes = useStyles();

    return (
        <CenteredDiv style={{backgroundColor: 'inherit'}}>
          <div style={{
            margin: '10px',
            display: 'flex', 
            flexDirection: 'row', 
            alignContent: 'center', 
            border: '1px solid green',
            padding: '10px'}}>
          <DoneAllIcon style={{width: '40px', height: '40px', color: 'green', paddingRight: '10px'}}/>
            <div style={{
                display: 'flex',
                flexDirection:'column'
            }}>
                <Typography className={classes.instructions}>Wszystkie kroki zakończono pomyślnie.</Typography>
                <Typography className={classes.instructions}>Szczegóły zamówienia</Typography>
                <Typography className={classes.instructions}>zostały wysłane drogą mailową.</Typography>
            </div>
          </div>
        </CenteredDiv>
    );
}