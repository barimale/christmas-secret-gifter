import React from 'react';
import Button from '@material-ui/core/Button';
import { configSection, configSectionType, OrderedSectionsConfiguration, GetFullPathTo } from "../../router/routerConfiguration";

export default function MenuButtons(props: any) {
    return (
    <div {...props}>
      {OrderedSectionsConfiguration.map((section: configSection, index: number) => {
        if(section.type === configSectionType.divider){
          return  '|';
        }else{
          return <Button 
            className={"pointerOverEffect"}
            tabIndex={index}
            key={index} 
            color="inherit" 
            style={{
              fontWeight: 'bold'}} 
            href={GetFullPathTo(section.title)}>
              {section.title.toUpperCase()}
            </Button>
        }
      })}
    </div>);
}
