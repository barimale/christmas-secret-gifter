import React from 'react';

// eslint-disable-next-line no-unused-vars
type MenuItemsProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  handleClose: () => void;
};

// eslint-disable-next-line no-unused-vars
export const MenuItems = function (props: MenuItemsProps) {
  return (
    <div>
      {/* {OrderedSectionsConfiguration.map((section: configSection, index: number) => {
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
      })} */}
    </div>
  );
};
