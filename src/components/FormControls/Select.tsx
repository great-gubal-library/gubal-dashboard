import React from 'react';
import { FormControl, InputLabel, makeStyles, MenuItem, Select as MaterialSelect } from '@material-ui/core';
import { Field } from 'react-final-form';
import { styled } from '../../styles';

interface SelectProps<T> {
  id: string;
  name: string;
  value: T;
  options: T[];
  label?: string;
  disabled?: boolean;
  getOptionString: (t: T) => string;
  onChange: (v: T) => void;
  type?: 'normal' | 'thin' | 'verythin'
  required?: boolean;
  withoutFormContol?: boolean;
}

export const Select: <T>(props: SelectProps<T>) => React.ReactElement<SelectProps<T>> =
  ({id, value, options, label, disabled, required, type = 'normal', withoutFormContol = false, getOptionString, onChange}) => {
    const classes = useStyles();

    const optionsAndLabels = React.useMemo(
      () => options.map(o => ({label: getOptionString(o), value: o}))
    , [options, getOptionString])
  
    const items = optionsAndLabels.map(({label}) => 
      <MenuItem key={label} value={label}>{label}</MenuItem>
    );

    const change = (label: string) => {
      const value = optionsAndLabels.find(o => o.label === label)?.value;
      if (value !== undefined)
        onChange(value);
    }

    const labelString = label !== undefined ? label : undefined;
    const labelId = `${id}-label`;
    const labelComponent = labelString !== undefined 
      ? <InputLabel id={labelId}>{labelString}</InputLabel>
      : null;

    if (withoutFormContol) {
      return (
        <MaterialSelect
          labelId={labelId}
          value={getOptionString(value)}
          label={labelString}
          onChange={(ev: any) => change(ev.target.value)}
          disabled={disabled}
          displayEmpty={true}
        >
          {items}
        </MaterialSelect>
      );
    }

    return (
      <SelectFormControl type={type} variant="outlined" required={required}>
        {labelComponent}
        <MaterialSelect
          className={classes[type]}
          labelId={labelId}
          value={getOptionString(value)}
          label={labelString}
          onChange={(ev: any) => change(ev.target.value)}
          disabled={disabled}
          displayEmpty={true}
        >
          {items}
        </MaterialSelect>
      </SelectFormControl>
    );
  }

const useStyles = makeStyles({
  normal: {
    '& .MuiOutlinedInput-input': {
      padding: "18.5px 14px",
      paddingRight: "32px",
    }
  },
  thin: {
    '& .MuiOutlinedInput-input': {
      padding: "16px 14px",
      paddingRight: "32px",
    }
  },
  verythin: {
    borderRadius: 0,
    padding: 0,
    fontSize: '12px',
    '& .MuiOutlinedInput-input': {
      padding: '4px',
    }
  }
});

const SelectFormControl = styled<any>(FormControl)`
  width: ${ props => props.type === 'verythin' ? '88px' : '100%'};
`;

interface SelectFieldProps<T> {
  id: string;
  name: string;
  options: T[];
  label?: string;
  getOptionString: (t: T) => string;
  required?: boolean;
  validate?: any;
  onChangeSideEffect?: (v: T) => void;
  disabled?: boolean;
  type?: 'normal' | 'thin' | 'verythin';
}

export const SelectField: <T>(props: SelectFieldProps<T>) => React.ReactElement<SelectFieldProps<T>> = 
  ({id, name, options, label, getOptionString, required, validate, onChangeSideEffect, disabled = false, type = 'normal'}) =>
    <Field 
      name={name}
      validate={validate}
      render={({ input }) => {
        const change = (value: any) => {
          if (onChangeSideEffect && value)
            onChangeSideEffect(value);
          input.onChange(value)
        }

        return <Select
          id={input.id}
          name={input.name}
          value={input.value}
          options={options}
          label={label}
          disabled={disabled}
          required={required}
          getOptionString={getOptionString}
          onChange={change}
          type={type}
        />;
      }
    }/>;
