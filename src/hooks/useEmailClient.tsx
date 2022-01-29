/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { Guid } from 'guid-typescript';
import { useNodeEmailClient } from './useNodeEmailClient';

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

  const send = async (address: string, title: string, captcha: string): Promise<string> => {
    const ownerAddress = 'kontakt@odkrywajcie.pl';

    try {
      const id = Guid.create().toString();

      const toCustomerParams: ToGifterParams = {
        from_name: ownerAddress,
        to_name: address,
        title,
        reply_to: ownerAddress,
        forName: id,
        gRecaptchaResponse: captcha,
      };

      const toCustomerMail = ReactDOMServer
        .renderToStaticMarkup(React.createElement(ToCustomerTemplate, toCustomerParams, null));

      const customerTemplateResult = templateHtml.replace('%CONTENT%', toCustomerMail);

      return await sendByNode(
        toCustomerParams.to_name,
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

type ToGifterParams = {
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
      {props.to_name}
      ,
    </p>
    <p>You are going to buy a gift for:</p>
    <p><b>{props.forName}</b></p>
    <p>
      Happy Christmas,
    </p>
    <p>
      <a href="https://odkrywajcie.pl" target="_blank" rel="noreferrer">
        <img
          src="https://odkrywajcie.pl/logo-small.png"
          alt="odkrywajcie.pl"
          style={{
            height: '100', objectFit: 'scale-down',
          }}
        />
      </a>
    </p>
  </div>
);
