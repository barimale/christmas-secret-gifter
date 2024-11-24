import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // intentionally left blank
}
export const CircularProgressWithLogoWrapper = (props: Props) => (
  <div {...props}>
    {props.children}
  </div>
);
