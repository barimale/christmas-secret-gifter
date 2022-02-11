import React, { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; import ReCAPTCHA from 'react-google-recaptcha';
import Participant from '../../store/model/participant';
import { EventContext } from '../../contexts/EventContext';
import { NotifyParticipantRow } from '../molecules/NotifyParticipantRow';

const NotifyParticipants = () => {
  const { participants } = useContext(EventContext);
  const [isCaptchaAgreed, setIsCaptchaAgreed] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  let captcha : ReCAPTCHA | null = null;

  useEffect(() => {
    if (captcha !== null) {
      captcha.reset();
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'whitesmoke',
      padding: '20px',
      height: '75%',
      paddingTop: '20px',
      paddingBottom: '0px',
    }}
    >
      {!isCaptchaAgreed ? (
        <div style={{
          display: 'inline-block',
        }}
        >
          <ReCAPTCHA
            ref={(el) => { captcha = el; }}
            hl="en-GB"
            sitekey="6Ld1vkceAAAAAImBNnWg0TTYf80V3ly9NPs4gth8"
            onChange={(token: string | null) => {
              setCaptchaToken(token);
              setIsCaptchaAgreed(true);
            }}
            onExpired={() => {
              setIsCaptchaAgreed(false);
              setCaptchaToken(null);
            }}
            onErrored={() => {
              setIsCaptchaAgreed(false);
              setCaptchaToken(null);
            }}
          />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
          // maxHeight,
          }}
        >
          <Table
            stickyHeader
            aria-label="simple table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell>GIVER</TableCell>
                <TableCell align="left">E-MAIL</TableCell>
                <TableCell align="right">GIFTED</TableCell>
                <TableCell align="right">STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants?.map((p: Participant) => (
                <NotifyParticipantRow participant={p} captcha={captchaToken ?? ''} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default NotifyParticipants;
