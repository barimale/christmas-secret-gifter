/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
import React, { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { hexToRgb } from '@material-ui/core';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; import ReCAPTCHA from 'react-google-recaptcha';
import Participant from '../../store/model/participant';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { NotifyParticipantRow } from '../molecules/NotifyParticipantRow';
import { RGBToRGBA } from '../../utilities/customTheme';

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
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'whitesmoke',
          padding: '20px',
          height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '69%' : '85%',
          paddingTop: '20px',
          paddingBottom: '0px',
        }}
        >
          {!isCaptchaAgreed ? (
            <div style={{
              display: 'inline-block',
            }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '25px',
                  border: '3px dotted #FFD700',
                  justifyContent: 'space-around',
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
                    ? '16px' : '10px',
                  backgroundColor: `${RGBToRGBA(hexToRgb('#FFD700'), 0.2)}`,
                  marginBottom: '20px',
                }}
              >
                <p style={{
                  paddingLeft: '25px',
                  paddingRight: '25px',
                  textAlign: 'justify',
                  lineHeight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '1.5' : '1.1',
                }}
                >
                 By accepting CAPTCHA You agree to send emails to all participants and have a guarantee that mail is not classified as SPAM.
                </p>
              </div>
              <ReCAPTCHA
                ref={(el:any) => { captcha = el; }}
                hl="en-GB"
                size={context.valueOf() === DeviceType.isDesktopOrLaptop ? 'normal' : 'compact'}
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
                height: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'unset' : '88%',
              }}
            >
              <Table
                stickyHeader
                aria-label="simple table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{
                        fontFamily: 'frozbite',
                      }}
                    >
ID
                    </TableCell>
                    <TableCell style={{
                      fontFamily: 'frozbite',
                    }}
                    >
GIVER
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        fontFamily: 'frozbite',
                      }}
                    >
E-MAIL
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontFamily: 'frozbite',
                      }}
                    >
GIFTED
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontFamily: 'frozbite',
                      }}
                    >
STATUS
                    </TableCell>
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
      )}
    </DeviceContextConsumer>
  );
};

export default NotifyParticipants;
