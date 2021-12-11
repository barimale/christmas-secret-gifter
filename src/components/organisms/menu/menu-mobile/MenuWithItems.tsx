import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { MenuItems } from './MenuItems';

const MenuWithItems = function () {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        style={{
          color: 'black',
        }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div style={{
          display: 'flex', flexDirection: 'column',
        }}
        >
          <MenuIcon />
          <div style={{
            fontSize: 8,
          }}
          >
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
        anchorPosition={{
          top: 40, left: 20,
        }}
      >
        <MenuItems handleClose={handleClose} />
      </Menu>
    </div>
  );
};

export default MenuWithItems;
