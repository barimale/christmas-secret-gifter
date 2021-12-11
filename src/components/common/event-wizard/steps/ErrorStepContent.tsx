import CenteredDiv  from '../../CenteredDiv';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { appBaseRouteKey} from "../../../../router/routerConfiguration";
import { Path as ContactPath } from "../../../screens/ContactScreen";
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontFamily: "Montserrat"
    },
  }),
);

export default function ErrorStepContent(){
  const classes = useStyles();

  return (
      <CenteredDiv style={{backgroundColor: 'inherit'}}>
        <div style={{
          margin: '10px',
          display: 'flex', 
          flexDirection: 'row', 
          alignContent: 'center', 
          border: '1px solid rgba(206, 17, 38, 1)',
          padding: '10px'}}>
            <WarningIcon style={{width: '40px', height: '40px', color: 'rgba(206, 17, 38, 1)', paddingRight: '10px'}}/>
          <div style={{
              display: 'flex',
              flexDirection:'column'
          }}>
              <Typography className={classes.instructions}>Nie można sfinalizować zamówienia.</Typography>
              <Typography className={classes.instructions}>{'Uprzejmię proszę o'}</Typography>
              <Typography className={classes.instructions}>
                <a 
                className={"pointerOverEffect"}
                style={{
                  cursor: 'pointer',
                  color: '#0B3976',
                  textDecoration: 'underline'
                }}
                href={appBaseRouteKey + ContactPath}
                >
                {'KONTAKT'}</a>
              </Typography>
              <Typography className={classes.instructions}>z Właścicielką firmy.</Typography>
          </div>
        </div>
      </CenteredDiv>
  );
}
