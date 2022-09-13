import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = ({
  currentPage,
  setCurrentPage,
  filteredList,
  recipesPerPage,
}) => {
  const [numPages, setNumPages] = useState();

  useEffect(() => {
    const filteredNumPages = Math.ceil(filteredList.length / recipesPerPage);

    if (currentPage > filteredNumPages) {
      setCurrentPage(1);
    }

    setNumPages(filteredNumPages);
  }, [filteredList, recipesPerPage, currentPage, setCurrentPage]);

  const handlePageUp = () => {
    if (currentPage >= 1 && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageDown = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <BtnWrap>
      {numPages !== 0 ? (
        <>
          <StyledBtn onClick={handlePageDown}>
            {currentPage === 1 ? <FiArrowLeft /> : <FiArrowLeft />}
          </StyledBtn>
          <PageCounter>
            Page {currentPage} of {numPages}
          </PageCounter>
          <StyledBtn onClick={handlePageUp}>
            {currentPage === numPages ? <FiArrowRight /> : <FiArrowRight />}
          </StyledBtn>
        </>
      ) : (
        <div>No Recipes Available With These Ingredients 😢</div>
      )}
    </BtnWrap>
  );
};

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyledBtn = styled.button`
  width: 75px;
  height: 30px;
  font-size: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;

  &:hover {
    background-color: var(--blue);
  }

  &:active {
    box-shadow: 0px 0px 1px 1px lightgray;
    background-color: lightblue;
  }
`;

const PageCounter = styled.div`
  display: flex;
  justify-content: center;
`;

export default Pagination;
