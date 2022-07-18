import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from './grid';

const StyledLabel = styled.label`
  display: block;
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
`;

/**
 * @typedef {Object} InputProps
 * @property {boolean} [isChecked] The value of the input if its a checkbox or radio.
 * @property {string} label The label of the input.
 * @property {string} name The name of the input.
 * @property {Function} onChange The function to call when the value of a field is modified.
 * @property {string} [placeholder] The placeholder of the input.
 * @property {string} [type] The type of the input.
 * @property {string} [value] The value of the input. Use `checked` for checkbox and radio.
 */

/**
 * @description Display an input.
 * @note May not supports all input types at the moment.
 * @param {InputProps} props
 * @returns {JSX.Element}
 */
export function Input({
  isChecked,
  isRequired,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}) {
  return (
    <Grid spacing={1}>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        checked={isChecked}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
        type={type}
        value={value}
      />
    </Grid>
  );
}

Input.propTypes = {
  isChecked: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
