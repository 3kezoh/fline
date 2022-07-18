import { useState, useCallback } from 'react';

/**
 * @description Hook to use a form.
 * @param {Object} initialState The initial state of the form.
 * @param {Function} onSubmit The function to call when the form is submitted.
 * @returns {[Object, function, function]} An array containing in order:
 * - `formData` - The state of the form
 * - `onChange` - The function to call when the value of a field is modified,
 * - `onSubmit` - The function to call when the form is submitted.
 */
export function useForm(initialState = {}, onSubmit) {
  const [formData, setFormData] = useState(initialState);

  /**
   * @description Function to handle the change of a form field.
   */
  const onChange = useCallback(
    (event) => {
      const { name, value, type } = event.target;

      if (type === 'checkbox' || type === 'radio') {
        return setFormData((prevState) => ({
          ...prevState,
          [name]: !prevState[name],
        }));
      }

      return setFormData((prevState) => ({ ...prevState, [name]: value }));
    },
    [setFormData]
  );

  /**
   * @description Function to handle the submit of a form.
   */
  const onFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      return onSubmit(formData);
    },
    [formData, onSubmit]
  );

  return [formData, onChange, onFormSubmit];
}

export default useForm;
