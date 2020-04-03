import cn from 'classnames';
import { PropTypes } from 'prop-types';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';


const useStyles = createUseStyles({
  FormButton: {
    minWidth: '100px',
    padding: '5px 10px',
    outline: 'none',
    border: ({ theme }) => theme.border,
    color: '#fff',
    backgroundColor: ({ theme }) => theme.backgroundColor,
    WebkitAppearance: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ffffff22',
    },
  },
});

const FormButton = ({ className, label, onClick }) => {

  const theme = useTheme();
  const s = useStyles({ theme });

  return (
    <button
      className={cn(s.FormButton, className)}
      onClick={onClick}
      type={onClick ? 'button' : 'submit'}
    >
      {label}
    </button>
  );
};

FormButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default FormButton;
