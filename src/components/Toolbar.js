import cn from 'classnames';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import SvgIcon from './SvgIcon';
import { useDispatch } from 'react-redux';
import {
  ACTION_REQUIRED_GO_BACK,
  ACTION_REQUIRED_GO_FORWARD,
  ACTION_REQUIRED_GO_HOME,
  ACTION_REQUIRED_REFRESH,
  updateApp,
} from '../slices/appsSlice';


const useStyles = createUseStyles({
  Toolbar: {
    display: 'flex',
    height: 'calc(100% - 2px)',
    backgroundColor: ({ theme }) => theme.backgroundColor,
    border: ({ theme }) => theme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ToolbarItem: {
    display: 'flex',
    height: '100%',
    padding: '0 10px',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#ffffff22',
    },
  },
  Icon: {
    backgroundColor: '#fff',
  },
});

const Toolbar = ({ appId, className }) => {

  const theme = useTheme();
  const s = useStyles({ theme });

  const dispatch = useDispatch();

  return (
    <div className={cn(s.Toolbar, className)}>
      <div className={s.ToolbarItem}>
        <SvgIcon
          className={s.Icon}
          name="arrowLeft"
          onClick={() => dispatch(updateApp({ appId, app: { actionRequired: ACTION_REQUIRED_GO_BACK } }))}
          size={30}
        />
      </div>
      <div className={s.ToolbarItem}>
        <SvgIcon
          className={s.Icon}
          name="refresh"
          onClick={() => dispatch(updateApp({ appId, app: { actionRequired: ACTION_REQUIRED_REFRESH } }))}
          size={30}
        />
      </div>
      <div className={s.ToolbarItem}>
        <SvgIcon
          className={s.Icon}
          name="home"
          onClick={() => dispatch(updateApp({ appId, app: { actionRequired: ACTION_REQUIRED_GO_HOME } }))}
          size={30}
        />
      </div>
      <div className={s.ToolbarItem}>
        <SvgIcon
          className={s.Icon}
          name="arrowRight"
          onClick={() => dispatch(updateApp({ appId, app: { actionRequired: ACTION_REQUIRED_GO_FORWARD } }))}
          size={30}
        />
      </div>
    </div>
  );
}

export default Toolbar;
