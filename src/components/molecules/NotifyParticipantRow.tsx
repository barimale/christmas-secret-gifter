import React, { useContext, useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReportIcon from '@mui/icons-material/Report';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Participant from '../../store/model/participant';
import { ToGifterParams, useEmailClient } from '../../hooks/useEmailClient';
import { EventContext } from '../../contexts/EventContext';

interface MailStatus {
  status: 'success' | 'error' | 'inprogress' | 'pending';
}

interface NotifyParticipantRowProps {
  participant: Participant;
  captcha: string;
}

export const NotifyParticipantRow = (props: NotifyParticipantRowProps) => {
  const { captcha, participant } = props;
  const { send } = useEmailClient();
  const { sendMailDetails } = useContext(EventContext);
  const [mailStatus, setMailStatus] = useState<MailStatus>({
    status: 'pending',
  });

  async function SendAsync () {
    const detail = sendMailDetails
      .find((p: ToGifterParams) => p.participantId === props.participant.id);
    if (detail !== undefined) {
      setMailStatus({
        status: 'inprogress',
      });
      detail.gRecaptchaResponse = captcha;
      const status: 'success' | 'error' | 'inprogress' | 'pending' = await send(detail);
      setMailStatus({
        status,
      });
    }
  }

  useEffect(() => {
    if (mailStatus.status !== 'success' && mailStatus.status !== 'error') {
      SendAsync();
    }
  }, []);

  return (
    <TableRow
      key={participant.name}
      hover
      sx={{
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }}
    >
      <TableCell align="left">{participant.orderId}</TableCell>
      <TableCell component="th" scope="row">
        {participant.name}
      </TableCell>
      <TableCell align="left">{participant.email}</TableCell>
      <TableCell align="right">
        {sendMailDetails
          .find((p: ToGifterParams) => p.participantId === props.participant.id)?.to_name}
      </TableCell>
      <TableCell align="right">
        <Tooltip title={mailStatus.status === 'inprogress' ? 'in progress' : mailStatus.status}>
          <IconButton onClick={async () => {
            await SendAsync();
          }}
          >
            {mailStatus.status === 'inprogress' && (
            <SyncProblemIcon />
            )}
            {mailStatus.status === 'success' && (
            <ThumbUpAltIcon />
            )}
            {mailStatus.status === 'error' && (
            <ReportIcon />
            )}
            {mailStatus.status === 'pending' && (
            <PendingActionsIcon />
            )}
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
