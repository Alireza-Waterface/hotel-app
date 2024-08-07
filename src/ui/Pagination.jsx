import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/consts";

const StyledPagination = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const P = styled.p`
   font-size: 1.4rem;
   margin-left: 0.8rem;

   & span {
      font-weight: 600;
   }
`;

const Buttons = styled.div`
   display: flex;
   gap: 0.6rem;
`;

const PaginationButton = styled.button`
   background-color: ${(props) =>
      props.active === 'true' ? " var(--color-brand-500)" : "var(--color-grey-50)"};
   color: ${(props) => (props.active === 'true' ? " var(--color-brand-50)" : "inherit")};
   border: none;
   border-radius: var(--border-radius-sm);
   font-weight: 500;
   font-size: 1.4rem;

   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.4rem;
   padding: 0.6rem 1.2rem;
   transition: all 0.3s;

   &:has(span:last-child) {
      padding-left: 0.4rem;
   }

   &:has(span:first-child) {
      padding-right: 0.4rem;
   }

   & svg {
      height: 1.8rem;
      width: 1.8rem;
   }

   &:hover:not(:disabled) {
      background-color: var(--color-brand-700);
      color: var(--color-brand-50);
   }
`;




function Pagination({count = 0}) {
   const [searchParams, setSearchParams] = useSearchParams();

   const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

   const pageCount = Math.ceil(count / PAGE_SIZE);

   useEffect(() => {
      if (currentPage > pageCount) {
         searchParams.set('page', pageCount);
         setSearchParams(searchParams);
      } else if (currentPage < 1) {
         searchParams.set('page', 1);
         setSearchParams(searchParams);
      }
      return;
   }, [currentPage, pageCount, searchParams, setSearchParams]);

   function nextPage() {
      const next = currentPage === pageCount ? currentPage : currentPage + 1;

      searchParams.set('page', next);
      setSearchParams(searchParams);
   }

   function prevPage() {
      const prev = currentPage === 1 ? currentPage : currentPage - 1;

      searchParams.set('page', prev);
      setSearchParams(searchParams);
   }

   return pageCount <= 1 ? null : (
      <StyledPagination>
         <P>
            Showing page
            <span> {(currentPage - 1) * PAGE_SIZE + 1} </span> 
            to 
            <span> {currentPage === pageCount ? count : currentPage * PAGE_SIZE} </span> 
            of 
            <span> {count} </span>
            results
         </P>
         
         <Buttons>
            <PaginationButton onClick={prevPage} active={!(currentPage <= 1) ? 'true' : 'false'} disabled={currentPage <= 1}>
               <HiChevronLeft /> <span>Previous</span>
            </PaginationButton>

            <PaginationButton onClick={nextPage} active={!(currentPage >= pageCount) ? 'true' : 'false'} disabled={currentPage >= pageCount}>
            <span>Next</span> <HiChevronRight />
            </PaginationButton>
         </Buttons>
      </StyledPagination>
   )
}

export default Pagination;