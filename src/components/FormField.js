import cn from 'classnames';
import { get } from 'lodash';
import { PropTypes } from 'prop-types';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';


const useStyles = createUseStyles({
  FormField: {
    margin: '10px 0 0 0',
    display: 'flex',
    flexDirection: 'row',
  },
  Label: {
    margin: '0 10px 0 0',
    minWidth: '200px',
    textAlign: 'right',
    fontSize: '20px',
    whiteSpace: 'nowrap',
  },
  ChildrenContainer: {
    width: '100%',
  },
  IsRequired: {
    margin: '0 0 0 4px',
    color: 'red',
  },
  Error: {
    height: '10px',
    margin: '2px 0 0 13px',
    fontSize: '12px',
    textAlign: 'left',
    color: 'red',
  },
});

const FormField = ({
  children,
  className,
  errors,
  isRequired,
  label,
  labelClassName,
  name,
}) => {

  const theme = useTheme();
  const s = useStyles({ theme });

  return (
    <div className={cn(s.FormField, className)}>
      {label &&
        <div className={cn(s.Label, labelClassName)}>
          {label}
          {isRequired &&
            <span className={s.IsRequired}>*</span>
          }
        </div>
      }
      <div className={s.ChildrenContainer}>
        {children}
        {get(errors, name) &&
          <div className={s.Error}>{get(errors, name)}</div>
        }
      </div>
    </div>
  );
};

FormField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  errors: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default FormField;
