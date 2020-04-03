import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

import { useForm } from '../hooks';
import { selectAppById } from '../slices/appsSlice';
import { updateApp } from '../slices/appsSlice';
import FormInput from './FormInput';
import FormButton from './FormButton';


const useStyles = createUseStyles({
  AppSettings: {
    margin: '0 0 10px 0',
    padding: '10px',
    border: ({ theme }) => theme.border,
  },
  Buttons: {
    margin: '10px 0 0 210px',
  },
});

const AppSettings = ({ id }) => {

  const theme = useTheme();
  const s = useStyles({ theme });

  const dispatch = useDispatch();
  const app = useSelector(state => selectAppById(id)(state));

  const form = useForm(() => dispatch(updateApp(values)), null, app);
  const { handleReinitialize, handleSubmit, hasChanged, values } = form;

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
      {hasChanged &&
        <div className={s.Buttons}>
          <FormButton label="Save" />
          <FormButton label="Cancel" onClick={handleReinitialize} />
        </div>
      }
    </form>
  );
}

export default AppSettings;

