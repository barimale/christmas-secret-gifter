/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import { View, Document, Page, StyleSheet, usePDF } from '@react-pdf/renderer';
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
      {props.children?.map((child:any, index: number) => (
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
  const [instance, updateInstance] = usePDF({
    document: fullfiledDocument,
  });

  useEffect(() => {
    setfullfiledDocument(React.createElement(MyDocument, null, props.content));
  }, [props.content]);

  return (
    <DeviceContextConsumer>
      { (context) => (
        <IconButton
          onClick={() => {
            const link = document.createElement('a');
            try {
              setIsGenerating(true);
              updateInstance();
              setTimeout(() => {
                while (instance.loading || instance.url === null) {
                  // eslint-disable-next-line no-unused-vars
                  const i = 0;
                }
                link.href = instance.url !== null ? instance.url : '';
                link.setAttribute(
                  'download',
                  fileName,
                );
                document.body.appendChild(link);
                link.click();
              }, 500);
            } finally {
              link?.parentNode?.removeChild(link);
              setIsGenerating(false);
            }
          }}
          ref={hoverRef}
          disabled={
            instance.loading.valueOf() === true
            || isGenerating.valueOf() === true
            || instance.url === null
          }
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
            {(instance.loading.valueOf() === true || isGenerating.valueOf() === true || instance.url === null) ? (
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
