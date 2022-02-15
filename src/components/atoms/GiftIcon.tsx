import React from 'react';
import Icon from '@material-ui/core/Icon';

export const GiftIcon = ({ height }: any) => (
  <Icon>
    <img
      alt="gift"
      src="/icons/gift.svg"
      style={{
        height, width: 'auto',
      }}
    />
  </Icon>
);
