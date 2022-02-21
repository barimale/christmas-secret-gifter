/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { useNodeEmailClient } from './useNodeEmailClient';
import { Theme } from '../theme/custom-theme';

const templateHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <style>
    </style>

  </head>
  <body style="width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;">
    %CONTENT%
  </body>
</html>`;

export const useEmailClient = () => {
  const { sendByNode } = useNodeEmailClient();

  const send = async (toCustomerParams: ToGifterParams): Promise<'success' | 'error'> => {
    try {
      const toCustomerMail = ReactDOMServer
        .renderToStaticMarkup(React.createElement(ToCustomerTemplate, toCustomerParams, null));

      const customerTemplateResult = templateHtml.replace('%CONTENT%', toCustomerMail);

      return await sendByNode(
        toCustomerParams.from_name,
        toCustomerParams.title,
        customerTemplateResult,
        toCustomerParams.gRecaptchaResponse,
      )
        .then(async (response: any) => {
          if (response === 'error') {
            return 'error';
          }
          return 'success';
        })
        .catch(() => 'error');
    } catch (error: any) {
      return 'error';
    }
  };

  return {
    send,
  };
};

export type ToGifterParams = {
  participantId: string;
  from_name: string;
  to_name: string;
  title: string;
  reply_to: string;
  forName: string;
  gRecaptchaResponse: string;
};

const ToCustomerTemplate = (props: ToGifterParams) => (
  <div>
    <p style={{
      fontSize: '16px',
    }}
    >
      Hi
      {' '}
      {props.from_name}
      ,
    </p>
    <p>You are going to buy a gift for:</p>
    <p>
      <b style={{
        color: `${Theme.palette.primary.light}`,
      }}
      >
        {props.to_name}
      </b>
    </p>
    <p>And remember:</p>
    <p>
      “The best of all gifts around any Christmas tree: the presence of a happy family all wrapped up in each other.” – Burton Hills
    </p>
    <p>
      Merry Christmas,
    </p>
    <p>
      <a href="https://christmas-secret-gifter.web.app" target="_blank" rel="noreferrer">
        <img
          src="https://christmas-secret-gifter.web.app/logo-small.png"
          alt="https://christmas-secret-gifter.web.app/logo-small.png"
          style={{
            height: '50px', objectFit: 'scale-down',
          }}
        />
      </a>
    </p>
  </div>
);
