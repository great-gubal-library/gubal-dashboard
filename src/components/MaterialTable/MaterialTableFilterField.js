/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';


const FilterField = ({ column: { filterValue, setFilter } }) => {
  /**
   * Prevents sorting change when input is clicked
   * @param {} e - event
   */
  const onClick = (e) => {
    e.stopPropagation();
  };

  const onChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Input
      value={filterValue || ''}
      onChange={onChange}
      onClick={onClick}
    />
  );
};

FilterField.propTypes = {
  column: PropTypes.shape({
    setFilter: PropTypes.func,
    filterValue: PropTypes.string,
  }).isRequired,
};

export default FilterField;
