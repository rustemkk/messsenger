import cn from 'classnames';
import { PropTypes } from 'prop-types';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';


const useStyles = createUseStyles({
  Button: {
    minWidth: '140px',
    padding: '5px 10px',
    margin: '0 10px 0 0',
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

const Button = ({ className, label, onClick }) => {

  const theme = useTheme();
  const s = useStyles({ theme });

  return (
    <button
      className={cn(s.Button, className)}
      onClick={onClick}
      type={onClick ? 'button' : 'submit'}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
