import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import s from './Badge.module.scss';


const Badge = ({ className, isBlinking, style, value }) => {
  return !value || value <= 0 ? null : (
    <span
      className={cn(
        s.Badge,
        className && className,
        value >= 10 && value < 100 && s.Number2Digits,
        value >= 100 && s.Number3Digits,
        value === 1 && s.Transparent,
        isBlinking && s.Blink,
      )}
      style={style}
    >
      {value >= 1000 ? 999 : value}
    </span>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.number,
};

export default Badge;
