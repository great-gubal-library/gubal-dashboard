import { Box } from '@material-ui/core';
import { styled } from '../../styles';

export const FormBox = styled(Box)`
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.formBorder};
`;
