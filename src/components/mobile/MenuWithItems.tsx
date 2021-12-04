import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { configSection, configSectionType, OrderedSectionsConfiguration, GetFullPathTo } from "../../router/routerConfiguration";
import Divider from '@material-ui/core/Divider';

export const MenuWithItems = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton style={{color: 'black'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <MenuIcon/>
          <div style={{fontSize: 8}}>
            Menu
          </div>
        </div>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorPosition={{top: 40, left:20}}
      >
        <MenuItems handleClose={handleClose}/>
      </Menu>
    </div>
  );
}

type MenuItemsProps ={
  handleClose: () => void;
}

const MenuItems = (props: MenuItemsProps) => {
  return (
  <>
    {OrderedSectionsConfiguration.map((section: configSection, index: number) => {
      if(section.type === configSectionType.divider){
        return  (<Divider orientation="horizontal" />);
      }else
      {
        return (<MenuItem
          key={index}
          onClick={props.handleClose}>
            <Link style={{
                height:'100%',
                width: '100%',
                color: 'black',
                textDecoration: 'none',
                textAlign: 'left',
                paddingLeft:'10px',
                paddingRight: '10px'
              }} to={GetFullPathTo(section.title)}>
                  {section.title.toUpperCase()}
              </Link>
          </MenuItem>);
      }
    })}
  </>);
}