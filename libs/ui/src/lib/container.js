import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  grid-auto-flow: column;

  @media (min-width: 1024px) {
    max-width: 960px;
    grid-auto-flow: row;
    margin: 0 auto;
  }
`;

/**
 * @typedef {Object} ContainerProps
 * @property {JSX.Element} children
 */

/**
 * @description Displays a container that centers its contents.
 * @param {ContainerProps} props
 * @returns
 */
export function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
