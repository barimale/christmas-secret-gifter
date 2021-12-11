/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { Guid } from 'guid-typescript';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
  const groupedItems = [] as Array<any>;
  function getAddressDetails () {
    return {
    } as any;
  }

  function total () {
    return 0;
  }

  const { sendByNode } = useNodeEmailClient();

  const send = async (address: string, title: string, captcha: string): Promise<string> => {
    const ownerAddress = 'kontakt@odkrywajcie.pl';

    try {
      const id = Guid.create().toString();

      const toCustomerParams: ToCustomerParams = {
        from_name: ownerAddress,
        to_name: address,
        title,
        reply_to: ownerAddress,
        id,
        total: total().toString(),
        gRecaptchaResponse: captcha,
      };

      const itemsAsHtml = ReactDOMServer.renderToString(React.createElement(ItemsInTable, {
        groupedItems,
      }, null));
      const addressDetailsAsHtml = ReactDOMServer
        .renderToString(React.createElement(AddressDetailsInTable, {
          details: getAddressDetails(),
        }, null));

      const toOwnerParams: ToOwnerTemplateParams = {
        from_name: ownerAddress,
        to_name: ownerAddress,
        addressDetails: addressDetailsAsHtml,
        items: itemsAsHtml,
        title,
        id,
        total: total().toString(),
      };

      const toOwnerMail = ReactDOMServer
        .renderToStaticMarkup(React.createElement(ToOwnerTemplate, toOwnerParams, null));
      const toCustomerMail = ReactDOMServer
        .renderToStaticMarkup(React.createElement(ToCustomerTemplate, toCustomerParams, null));

      const ownerTemplateResult = templateHtml.replace('%CONTENT%', toOwnerMail);
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
          return sendByNode(
            toOwnerParams.to_name,
            toOwnerParams.title,
            ownerTemplateResult,
            toCustomerParams.gRecaptchaResponse,
          )
            .then((responsee: any) => {
              if (responsee === 'error') {
                return 'error';
              }

              return 'success';
            })
            .catch(() => 'error');
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

type ToCustomerParams = {
  from_name: string;
  to_name: string;
  title: string;
  reply_to: string;
  id: string;
  total: string;
  gRecaptchaResponse: string;
};

const ToCustomerTemplate = (props: ToCustomerParams) => (
  <div>
    <p style={{
      fontSize: '16px',
    }}
    >
      Witaj
      {' '}
      {props.to_name}
      ,
    </p>
    <p>Otrzymaliśmy Twoje zamówienie o numerze:</p>
    <p><b>{props.id}</b></p>
    <p>
      Dane do przelewu:
    </p>
    <p>
      Numer konta:
      {' '}
    </p>
    <p><b>41 1050 1588 1000 0022 9258 7090</b></p>
    <p>Dane:</p>
    <p><b>odkrywajcie. sklep</b></p>
    <p><b>DZIERZĘGA ELŻBIETA</b></p>
    <p><b>CZESŁAWA MIŁOSZA 26</b></p>
    <p><b>41-700 RUDA ŚLĄSKA</b></p>
    <p>
      Tytułem:
    </p>
    <p><b>{props.id}</b></p>
    <p>
      Kwota do zapłaty:
    </p>
    <p>
      <b>
        {props.total}
        {' '}
        zł
      </b>
    </p>
    <p>
      Swoje zamówienie otrzymasz tak szybko jak to tylko możliwe:)
    </p>
    <p>
      W razie jakichkolwiek pytań serdecznie prosimy
      o skorzystanie z jednej z form kontaktu do Nas:
    </p>
    <p>  https://odkrywajcie.pl/contact</p>
    <p style={{
      fontSize: '16px',
    }}
    >
      {' '}
      Pozdrawiamy,
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

type ToOwnerTemplateParams = {
  from_name: string;
  to_name: string;
  addressDetails: string;
  items: string;
  title: string;
  id: string;
  total: string;
};

const ToOwnerTemplate = (props: ToOwnerTemplateParams) => (
  <div>
    <p>Hej hej,</p>
    <p>Klient złożył zamówienie o numerze:</p>
    <p>{props.id}</p>
    <p>na kwotę:</p>
    <p>
      {props.total}
      {' '}
      zł
    </p>
    <p>
      Dane do wysyki:
    </p>
    <div dangerouslySetInnerHTML={{
      __html: props.addressDetails,
    }}
    />
    <p>
      Zawartość zamówienia:
    </p>
    <div dangerouslySetInnerHTML={{
      __html: props.items,
    }}
    />
    <p>
      Pozdrawiam,
    </p>
    <p>
      aplikacja odkrywajcie.pl
    </p>
  </div>
);

const ItemsInTable = (props: any) => {
  const { groupedItems } = props;

  return (
    <Table
      style={{
        padding: '10px',
        fontSize: '14px',
        border: '1px solid green',
      }}
    >
      <TableBody>
        {groupedItems.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell
              component="th"
              scope="row"
              align="left"
              style={{
                fontWeight: 'normal',
              }}
            >
              {item.details.title}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              style={{
                fontWeight: 'normal',
              }}
            >
              {`${item.count} szt.`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const AddressDetailsInTable = (props: any) => {
  const { details } = props;

  return (
    <Table
      style={{
        padding: '10px',
        border: '1px solid blue',
        fontSize: '14px',
      }}
    >
      <TableBody>
        {details.firstName !== '' && (
        <>
          <TableRow key={1}>
            <TableCell
              style={{
                fontWeight: 'normal',
              }}
              align="center"
              width="80%"
            >
              {`${details.firstName} ${details.lastName}`}
            </TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell
              style={{
                fontWeight: 'normal',
              }}
              align="center"
              width="80%"
            >
              {details.addressLine1}
            </TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell
              style={{
                fontWeight: 'normal',
              }}
              align="center"
              width="80%"
            >
              {details.addressLine2}
            </TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell
              style={{
                fontWeight: 'normal',
              }}
              align="center"
              width="80%"
            >
              {`${details.zipCode} ${details.city} ${details.region}`}
            </TableCell>
          </TableRow>
          <TableRow key={4}>
            <TableCell
              style={{
                fontWeight: 'normal',
              }}
              align="center"
              width="80%"
            >
              {details.country.toUpperCase()}
            </TableCell>
          </TableRow>
        </>
        )}
        <TableRow key={5}>
          <TableCell
            style={{
              fontWeight: 'normal',
            }}
            align="center"
            width="80%"
          >
            {details.email}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
