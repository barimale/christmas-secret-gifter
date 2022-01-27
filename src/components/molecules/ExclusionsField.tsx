import React, { useState } from 'react';
import { FormikProps } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Checkbox, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, MenuProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeviceContextConsumer } from '../../contexts';
import Participant from '../../store/model/participant';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: '#f50057',
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
}));

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

interface ExclusionsFieldProps extends FormikProps<Participant>{
  participants: Participant[];
}

export const ExclusionsField = (props: ExclusionsFieldProps) => {
  const { participants } = props;
  // const [field, meta] = useField(props.name);

  const classes = useStyles();
  const [selected, setSelected] = useState<Participant[]>([]);
  const isAllSelected = participants.length > 0 && selected.length === participants.length;

  const handleChange = (event: any) => {
    const { value } = event.target;
    if (value[value.length - 1] === 'all') {
      setSelected(selected.length === participants.length ? [] : participants);
      return;
    }
    setSelected(value);
  };
  return (
    <DeviceContextConsumer>
      {() => (
        <Grid item xs={defaultXs} sm={defaultSm}>
          <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
          <Select
            labelId="mutiple-select-label"
            multiple
            value={selected}
            onChange={handleChange}
            // renderValue={(selected: Participant[]) => selected.map((p) => p.name).join(', ')}
            MenuProps={MenuPropsSettings}
          >
            <MenuItem
              value="all"
              classes={{
                root: isAllSelected ? classes.selectedAll : '',
              }}
            >
              <ListItemIcon>
                <Checkbox
                  classes={{
                    indeterminate: classes.indeterminateColor,
                  }}
                  checked={isAllSelected}
                  indeterminate={
                selected.length > 0 && selected.length < participants.length
              }
                />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.selectAllText,
                }}
                primary="Select All"
              />
            </MenuItem>
            {participants?.map((option: Participant) => (
              <MenuItem key={option.id} value={option.name ?? ''}>
                <ListItemIcon>
                  <Checkbox checked={selected.indexOf(option) > -1} />
                </ListItemIcon>
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
          {/* <MyTextField
            id="name"
            name="name"
            label="Name"
            autoComplete="given-name"
            margin="dense"
            error={Boolean(props.touched.name && props.errors.name)}
            helperText={props.touched.name && props.errors.name}
            fullWidth
          /> */}
        </Grid>
      )}
    </DeviceContextConsumer>
  );
};
