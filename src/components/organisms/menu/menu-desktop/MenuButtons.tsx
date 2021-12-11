import React from 'react';

const MenuButtons = function (props: any) {
  return (
    <div {...props}>
      {/* {OrderedSectionsConfiguration.map((section: configSection, index: number) => {
        if (section.type === configSectionType.divider) {
          return '|';
        }
        return (
          <Button
            className="pointerOverEffect"
            tabIndex={index}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            color="inherit"
            style={{
              fontWeight: 'bold',
            }}
            href={GetFullPathTo(section.title)}
          >
            {section.title.toUpperCase()}
          </Button>
        );
      })} */}
    </div>
  );
};

export default MenuButtons;
