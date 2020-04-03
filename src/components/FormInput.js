import cn from 'classnames';
import { get } from 'lodash';
import { PropTypes } from 'prop-types';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import FormField from './FormField';


const useStyles = createUseStyles({
  Input: {
    width: 'calc(100% - 20px)',
    padding: '5px 10px',
    outline: 'none',
    border: ({ theme }) => theme.border,
    color: '#fff',
    backgroundColor: ({ theme }) => theme.backgroundColor,
    WebkitAppearance: 'none',
    fontSize: '16px',
  },
  InputError: {
    border: '1px solid red !important',
  },
});

const FormInput = ({
  className,
  errors,
  handleChange,
  isDisabled,
  isRequired,
  label,
  labelClassName,
  maxLength,
  name,
  placeholder,
  values,
}) => {

  const theme = useTheme();
  const s = useStyles({ theme });

  return (
    <FormField
      className={className}
      errors={errors}
      isRequired={isRequired}
      label={label}
      labelClassName={labelClassName}
      name={name}
    >
      <input
        className={cn(s.Input, get(errors, name) && s.InputError, className)}
        disabled={isDisabled}
        maxLength={maxLength || 200}
        name={name}
        onChange={e => handleChange(name, e.target.value)}
        placeholder={placeholder}
        type="text"
        value={get(values, name) || ''}
      />
    </FormField>
  );
};

FormInput.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  values: PropTypes.object.isRequired,
};

export default FormInput;
