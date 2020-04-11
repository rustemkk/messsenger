import cn from 'classnames';
import { get } from 'lodash';
import { PropTypes } from 'prop-types';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import FormField from './FormField';


const useStyles = createUseStyles({
  ToggleSwitch: {
    width: '46px',
    height: '28px',
    borderRadius: '14px',
    color: '#171717',
    backgroundColor: '#d9d9d9',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  ToggleSwitchActive: {
    backgroundColor: '#4bd863',
    borderColor: '#dfdfdf',
    '& $ToggleButton': {
      left: '20px',
      right: '2px',
      transitionDelay: '.05s, 0s',
    }
  },
  ToggleButton: {
    height: '24px',
    borderRadius: '12px',
    backgroundColor: ({ theme }) => theme.backgroundColor,
    position: 'absolute',
    top: '2px',
    left: '2px',
    right: '20px',
    transition: '.35s cubic-bezier(0.785, 0.135, 0.150, 0.860)',
    transitionProperty: 'left, right',
    transitionDelay: '0s, .05s',
  }
});

const FormToggleSwitch = ({
  className,
  errors,
  handleChange,
  isRequired,
  label,
  labelClassName,
  name,
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
      <div
        className={cn(s.ToggleSwitch, get(values, name) && s.ToggleSwitchActive)}
        onClick={() => handleChange(name, !get(values, name))}
      >
        <div className={cn(s.ToggleButton)} />
      </div>
    </FormField>
  );
};

FormToggleSwitch.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
};

export default FormToggleSwitch;
