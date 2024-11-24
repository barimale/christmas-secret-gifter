/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import { View, Document, Page, StyleSheet, pdf } from '@react-pdf/renderer'; // usePDF
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useOverEffectHook from '../../hooks/useOverEffectHook';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { Theme } from '../../theme/custom-theme';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    gaps: '20px',
    margin: 40,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = (props: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {props.children?.map((child: any, index: number) => (
        <View key={`view${index}`}>
          {child.props.children}
        </View>
      ))}
    </Page>
  </Document>
);

export const ConvertToPdfButton = (props: any) => {
  const fileName = 'pairs.pdf';
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  // eslint-disable-next-line max-len
  const [fullfiledDocument, setfullfiledDocument] = useState(React.createElement(MyDocument, null, props.content));

  useEffect(() => {
    setfullfiledDocument(React.createElement(MyDocument, null, props.content));
  }, [props.content]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <IconButton
          onClick={() => {
            setIsGenerating(true);
            const newPdfFile = pdf(fullfiledDocument);
            newPdfFile.updateContainer(fullfiledDocument);
            newPdfFile.toBlob()
              .then((blob) => URL.createObjectURL(blob))
              .then((url) => {
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                  'download',
                  fileName,
                );
                document.body.appendChild(link);
                link.click();
                link?.parentNode?.removeChild(link);
              })
              .finally(() => setIsGenerating(false));
          }}
          ref={hoverRef}
          disabled={isGenerating.valueOf() === true}
          {...props}
          style={{
            opacity: opacityValue,
            height: context === DeviceType.isDesktopOrLaptop ? '30px' : '22px',
            width: context === DeviceType.isDesktopOrLaptop ? 'auto' : 'auto',
            justifyItems: 'left',
            margin: '0px',
            alignSelf: 'end',
            borderRadius: '0px',
            padding: '0px',
            paddingTop: context === DeviceType.isDesktopOrLaptop ? '3px' : '2px',
            paddingBottom: context === DeviceType.isDesktopOrLaptop ? '3px' : '2px',
          }}
        >

          <>
            {(isGenerating.valueOf() === true) ? (
              <CircularProgress
                size={20}
                thickness={4}
                style={{
                  color: `${Theme.palette.primary.main}`,
                }}
              />
            ) : (
              <PictureAsPdfIcon
                fontSize={context === DeviceType.isDesktopOrLaptop ? 'medium' : 'small'}
                style={{
                  color: 'black',
                }}
              />
            )}
            <Typography
              style={{
                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '14px' : '11px',
                color: 'black',
                margin: '0px',
                paddingLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ? '8px' : '4px',
              }}
            >
              Convert To PDF
            </Typography>
          </>
        </IconButton>
      )}
    </DeviceContextConsumer>
  );
};
