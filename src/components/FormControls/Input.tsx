import React, { FC } from 'react';
import { Field } from 'react-final-form'
import { TextField } from '@material-ui/core';

interface InputProps {
  validate?: any;
  name: string;
  type?: string;
  id: string;
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

export const Input: FC<InputProps> = ({
  validate, name, id, label, required, ...rest
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => (
        <TextField
          {...input}
          id={id}
          label={label}
          variant="outlined"
          fullWidth
          required={required}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          {...rest}
        />
      )}
    </Field>
  );
}
