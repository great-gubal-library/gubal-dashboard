import { Button, CircularProgress } from '@material-ui/core';
import React, { FC } from 'react';
import { styled } from '../../styles/styledTheme';

interface SubmitButtonProps {
  loading: boolean;
  label: string;
  paddingTop?: string;
  disabled?: boolean;
}

const ButtonContainer = styled.div<{ paddingTop?: string}>`
  width: 100%;
  ${props => props.paddingTop ? `padding-top: ${props.paddingTop};` : ''}
`;

export const SubmitButton: FC<SubmitButtonProps> = ({
  label, loading, disabled, paddingTop
}) => {

  return (
    <ButtonContainer paddingTop={paddingTop}>
      {
        loading
          ? <CircularProgress size={24} />
          : <Button
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            disabled={disabled}
            disableElevation>
            Submit
          </Button>
      }
    </ButtonContainer >
  );
}
