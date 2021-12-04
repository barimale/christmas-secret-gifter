import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Path as CartPath } from '../screens/CartScreen';
import { appBaseRouteKey } from "../../router/routerConfiguration";
import { StyledLink } from "../molecules/Header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from '../../contexts/CartContext';
import Badge from '@material-ui/core/Badge';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import { tileData, ItemDetails } from '../common/BuyItems';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import { DeviceType, DeviceContextConsumer } from '../../contexts/DeviceContext';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      color: 'white',
      fontWeight: 'bold',
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      background: 'rgba(206, 17, 38, 1)',
      WebkitTapHighlightColor: 'transparent'
    },
  }),
)(Badge);

const Cart = (props: any) => {
    const { getCount, items } = useContext(CartContext);
    const [ classNames, setClassNames ] = useState<string>("");
    const cartRef = document.getElementById("styledBadgeIdForAnimation");

    useEffect(()=>{
      if(items.length > 0){
        startAnimation();
      }
    }, [ items.length ])

    const startAnimation = () => {
      if(cartRef !== null){
        cartRef.classList.remove("animation");
        var itHasToBeHereAsEnsuresThatChangesTakeEffect = cartRef.offsetWidth;
        cartRef.classList.add("animation");
      }
    };

    const stopAnimation = () => {
      setClassNames("");
    };

    return (
        <StyledLink
          className={"pointerOverEffect"}
          style={{
            WebkitTapHighlightColor: 'transparent'
            }}
          to={appBaseRouteKey + CartPath}
          {...props}>
            <StyledBadge
              id={"styledBadgeIdForAnimation"}
              className={classNames}
              onAnimationEnd={stopAnimation}
              badgeContent={getCount()}
              max={999}>
                <ShoppingCartIcon/>
            </StyledBadge>
        </StyledLink>
    );
}

export const BuyButton = (props:{item: ItemDetails, onClicked: ()=> void}) => {
    const { add } = useContext(CartContext);
    const { item, onClicked } = props;
    
    return (
    <DeviceContextConsumer>
      {context => 
        <Button
            variant="contained"
            color="secondary" 
            id={item.id}
            onClick={(event: any)=>{
                try{
                const result = event.currentTarget.id;
                var foundIndex = tileData.findIndex(p => p.id === result);
                if(foundIndex > -1){
                    add(tileData[foundIndex]);
                }
                }catch(error: any){
                  console.log(error);
                }
                finally{
                  onClicked();
                }
            }}
            style={{
                paddingRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                marginRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                color: 'white'
            }}
            aria-label={`${item.title}`}
            className={"pointerOverEffect"}>
            <AddShoppingCartIcon 
              style={{
                color: 'white',
                paddingRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px'
            }}/>
            {'DO KOSZYKA'}
        </Button>}
      </DeviceContextConsumer>
    );
}

export default Cart;