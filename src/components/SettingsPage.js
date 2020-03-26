import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';


const useStyles = createUseStyles({
  SettingsPage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: ({ theme }) => theme.menuWidth,
    backgroundColor: ({ theme }) => theme.backgroundColor,
    borderLeft: '1px solid #ffffff16',
  },
});

const SettingsPage = () => {

  const theme = useTheme();
  const s = useStyles({ theme });

  return (
    <div className={s.SettingsPage}>

    </div>
  );
}

export default SettingsPage;
