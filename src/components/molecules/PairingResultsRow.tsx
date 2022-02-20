import React from 'react';
import TableCell from '@mui/material/TableCell';
import sizeMe from 'react-sizeme';

const PairingResultsRow = () => (
  <TableCell
    sx={{
    }}
  >
    Who is going to buy a gift to whom:
  </TableCell>
);

export default sizeMe({
  monitorWidth: true,
})(PairingResultsRow);
