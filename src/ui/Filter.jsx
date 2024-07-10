import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const StyledFilter = styled.div`
   border: 1px solid var(--color-grey-100);
   background-color: var(--color-grey-0);
   box-shadow: var(--shadow-sm);
   border-radius: var(--border-radius-sm);
   padding: 0.4rem;
   display: flex;
   gap: 0.4rem;
`;

const FilterButton = styled.button`
   background-color: var(--color-grey-0);
   border: none;

   ${(props) =>
      props.active === 'true' &&
      css`
         background-color: var(--color-brand-800);
         color: var(--color-brand-50);
   `}

   border-radius: var(--border-radius-sm);
   font-weight: 500;
   font-size: 1.4rem;
   padding: 0.44rem 0.8rem;
   transition: all 0.3s;

   &:hover:not(:disabled) {
      background-color: var(--color-brand-500);
      color: var(--color-brand-50);
   }
`;

function Filter({filterField, options = []}) {
   const [params, setParams] = useSearchParams();

   const currentFilter = params.get(filterField) || options.at(0)?.value;

   function handleClick(value) {
      params.set(filterField, value);
      if (params.get('page')) params.set('page', 1);
      setParams(params);
   }

   return (
      <StyledFilter>
         { options.map(option => (
            <FilterButton
               key={option.value}
               onClick={() => handleClick(option.value)}
               active={option.value === currentFilter ? 'true' : 'false'}
               disabled={option.value === currentFilter}
            >{option.label}</FilterButton>
         ))
         }
      </StyledFilter>
   );
}

Filter.propTypes = {
   filterField: PropTypes.string.isRequired,
   options: PropTypes.array.isRequired,
};

FilterButton.defaultProps = {
   active: false,
   disabled: false,
}

export default Filter;