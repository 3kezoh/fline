import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: grid;
  ${({ justifyItems }) => justifyItems && `justify-items: ${justifyItems};`}
  ${({ spacing }) => spacing && `grid-gap: ${spacing}rem;`}
  ${({ direction }) => direction && `grid-auto-flow: ${direction};`}
`;

/**
 * @typedef {Object} GridProps
 */

/**
 * @description Displays a container that manages the arrangement of its
 * children along the vertical or horizontal axis with optional spacing.
 * @param {GridProps} props
 * @returns {JSX.Element}
 */
export function Grid({ children, direction, justifyItems, spacing }) {
  return (
    <StyledGrid
      direction={direction}
      justifyItems={justifyItems}
      spacing={spacing}
    >
      {children}
    </StyledGrid>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['row', 'column']),
  justifyItems: PropTypes.string,
  spacing: PropTypes.number,
};

Grid.defaultProps = {
  direction: 'row',
};

export default Grid;
