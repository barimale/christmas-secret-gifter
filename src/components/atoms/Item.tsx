import { styled } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
