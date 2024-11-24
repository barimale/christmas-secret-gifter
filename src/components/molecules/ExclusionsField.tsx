import React, { useState, useEffect } from 'react';
import { FormikProps } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Checkbox, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, MenuProps } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { DeviceContextConsumer } from '../../contexts';
import Participant from '../../store/model/participant';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuPropsSettings: Partial<MenuProps> = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  variant: 'menu',
};

const defaultXs = 12;
const defaultSm = 6;

interface ExclusionsFieldProps extends FormikProps<Participant> {
  participants: Participant[];
}

export const ExclusionsField = (props: ExclusionsFieldProps) => {
  const { participants } = props;
  // const [field, meta] = useField(props.name);

  const [selected, setSelected] = useState<Participant[]>([props.values]);
  const defaultCheckedIcon = <CloseIcon />;

  const handleChange = (event: any) => {
    const { value } = event.target;
    if (value[value.length - 1] === 'all') {
      setSelected(selected.length === participants.length ? [] : participants);
      return;
    }
    setSelected(value);
  };

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    props.values.excludedOrderIds = selected?.map((p) => p.orderId);
  }, [selected]);

  return (
    <DeviceContextConsumer>
      {() => (
        <Grid item xs={defaultXs} sm={defaultSm}>
          <InputLabel id="mutiple-select-label">Exclusions</InputLabel>
          <Select
            labelId="mutiple-select-label"
            multiple
            error={Boolean(props.touched.excludedOrderIds && props.errors.excludedOrderIds)}
            value={selected}
            onChange={handleChange}
            renderValue={(selected: any) => selected.join(', ')}
            MenuProps={MenuPropsSettings}
          >
            {participants?.map((option: Participant) => (
              <MenuItem key={option.id} value={option.name ?? ''} disabled={props.values.id === option.id}>
                <ListItemIcon>
                  <Checkbox
                    checkedIcon={defaultCheckedIcon}
                    checked={
                      props.values.id === option.id ? true : (selected.indexOf(option) > -1)
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={option.name ?? ''} />
              </MenuItem>
            ))}
          </Select>
          {Boolean(props.touched.excludedOrderIds && props.errors.excludedOrderIds) && (
            <p>{props.touched.excludedOrderIds && props.errors.excludedOrderIds}</p>
          )}
        </Grid>
      )}
    </DeviceContextConsumer>
  );
};
