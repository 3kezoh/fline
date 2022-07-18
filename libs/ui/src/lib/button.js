import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  background-color: #fff;
  color: #000;
  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: #ccc;
  }
  &:disabled {
    background-color: #eee;
    color: #ccc;
    cursor: not-allowed;
  }
`;

/**
 * @typedef {Object} ButtonProps
 * @property {JSX.Element} children
 * @property {boolean} [isDisabled] Whether the button is disabled.
 * @property {boolean} [isLoading] Whether the button is loading.
 */

/**
 * @description Displays a button.
 * @param {ButtonProps} props
 * @returns
 */
export function Button({ children, isDisabled, isLoading, ...props }) {
  return (
    <StyledButton disabled={isDisabled || isLoading} type="button" {...props}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default Button;
