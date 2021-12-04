import { Redirect, Route, Switch } from 'react-router-dom';
import { appBaseRouteKey} from "./routerConfiguration";
import { ContactScreen, Path as ContactPath } from "../components/screens/ContactScreen";
import { CartScreen, Path as HomePath } from '../components/screens/CartScreen';

export default function Routes(){
    return(
        <Switch>
            <Route path={appBaseRouteKey + HomePath} exact render={() => <CartScreen/>} />
            <Route exact path={appBaseRouteKey + ContactPath} render={() => <ContactScreen/>} />
            <Route render={() => <Redirect to={appBaseRouteKey + HomePath} />} />
        </Switch>
    );
}