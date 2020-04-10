import cn from 'classnames';
import { get } from 'lodash';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

import { useForm } from '../hooks';
import { selectAppById, ACTION_REQUIRED_REFRESH } from '../slices/appsSlice';
import { deleteApp, updateApp } from '../slices/appsSlice';
import Button from './Button';
import FormInput from './FormInput';


const useStyles = createUseStyles({
  AppSettings: {
    margin: '0 0 10px 0',
    padding: '10px',
    border: ({ theme }) => theme.border,
  },
  Buttons: {
    margin: '10px 0 0 210px',
  },
  AppSettingsReadOnly: {
    display: 'flex',
    '& img': {
      maxWidth: '100px',
      maxHeight: '100px',
      padding: '10px 10px 10px 20px',
    },
    alignItems: 'center',
  },
  NameAndUrl: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 10px',
  },
  Name: {
    fontSize: '20px',
  },
  Url: {
    fontSize: '12px',
    margin: '0 0 10px 0',
  },
  AppIcon: {
    maxWidth: '50px',
    maxHeight: '50px',
    padding: '10px 10px 10px 220px',
  }
});

const AppSettings = ({ appId }) => {

  const theme = useTheme();
  const s = useStyles({ theme });

  const dispatch = useDispatch();
  const app = useSelector(state => selectAppById(appId)(state));

  const form = useForm(() => {
    dispatch(updateApp({ appId, app: { ...values, actionRequired: ACTION_REQUIRED_REFRESH } }));
    setIsEdit(false);
  }, null, app);
  const { handleReinitialize, handleSubmit, values } = form;

  const [isEdit, setIsEdit] = useState(false);

  if (!isEdit) {
    return (
      <div className={cn(s.AppSettings, s.AppSettingsReadOnly)}>
        <img alt={app.name} src={app.iconUrl} />
        <div className={s.NameAndUrl}>
          <div className={s.Name}>
            {app.name}
          </div>
          <div className={s.Url}>
            {app.url && `(${app.url})`}
          </div>
          <Button label="Edit" onClick={() => setIsEdit(true)} />
          <Button label="Delete" onClick={() => dispatch(deleteApp({ appId }))} />
        </div>
      </div>
    );
  }

  return (
    <form className={s.AppSettings} onSubmit={handleSubmit}>
      <FormInput
        isRequired
        label="Name"
        name="name"
        placeholder="Name"
        {...form}
      />
      <FormInput
        isRequired
        label="URL"
        name="url"
        placeholder="URL"
        {...form}
      />
      <FormInput
        label="Icon URL"
        name="iconUrl"
        placeholder="Icon URL"
        {...form}
      />
      <img className={s.AppIcon} alt={get(values, 'name')} src={get(values, 'iconUrl')} />
      <FormInput
        label="Preload file name"
        name="preload"
        placeholder="Preload file name (leave blank to use default preload)"
        {...form}
      />
      <FormInput
        label="UserAgent"
        name="userAgent"
        placeholder="UserAgent (leave blank to use default UserAgent)"
        {...form}
      />
      <FormInput
        label="Partition"
        name="partition"
        placeholder="Partition (leave blank to use default Partition)"
        {...form}
      />
      <FormInput
        label="Zoom Factor"
        name="zoomFactor"
        placeholder="Zoom Factor (1 - regular view, try 0.9 or 1.2 to adjust zoom of the app)"
        {...form}
      />
      <div className={s.Buttons}>
        <Button label="Save" />
        <Button
          label="Cancel"
          onClick={() => {
            handleReinitialize();
            setIsEdit(false);
          }}
        />
      </div>
    </form>
  );
}

AppSettings.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default AppSettings;

