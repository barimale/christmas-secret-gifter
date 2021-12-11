import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { configSection, configSectionType, OrderedSectionsConfiguration, GetFullPathTo } from '../../../../router/routerConfiguration';

type MenuItemsProps = {
  handleClose: () => void;
};
export const MenuItems = function (props: MenuItemsProps) {
  return (
    <>
      {OrderedSectionsConfiguration.map((section: configSection, index: number) => {
        if (section.type === configSectionType.divider) {
          return (<Divider orientation="horizontal" />);
        }
        return (
          <MenuItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={props.handleClose}
          >
            <Link
              style={{
                height: '100%',
                width: '100%',
                color: 'black',
                textDecoration: 'none',
                textAlign: 'left',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
              to={GetFullPathTo(section.title)}
            >
              {section.title.toUpperCase()}
            </Link>
          </MenuItem>
        );
      })}
    </>
  );
};
