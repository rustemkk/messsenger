import { set } from 'lodash';
import { useState, useEffect } from 'react';


export const useForm = (callback, validator, initialValues = {}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    Object.keys(errors).length === 0 && isSubmitting && callback();
  }, [errors]); // eslint-disable-line

  const handleSubmit = (event) => {
    event && event.preventDefault();
    setErrors(validator ? validator(values) : {});
    setIsSubmitting(true);
    setHasChanged(false);
  };

  const handleChange = (name, value) => {
    setValues(values => ({ ...set(values, name, value) }));
    setHasChanged(true);
  };

  const handleReinitialize = () => {
    setValues({ ...initialValues });
    setHasChanged(false);
  }

  return { errors, handleChange, handleReinitialize, handleSubmit, hasChanged, setErrors, values };
};