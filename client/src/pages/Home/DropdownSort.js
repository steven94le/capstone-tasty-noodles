import React from "react";
import styled from "styled-components";

const DropdownSort = ({ filteredList, setFilteredList, setCurrentPage }) => {
  const handleSortOption = (e) => {
    const sortValue = e.target.value;
    const sortedList = [...filteredList];

    switch (sortValue) {
      case "a-z":
        sortedList.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        setFilteredList(sortedList);
        setCurrentPage(1);
        break;

      case "z-a":
        sortedList.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameB < nameA) {
            return -1;
          }
          if (nameB > nameA) {
            return 1;
          }

          return 0;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "lIngredients-hIngredients":
        sortedList.sort((a, b) => {
          return a.ingredients.length - b.ingredients.length;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "hIngredients-lIngredients":
        sortedList.sort((a, b) => {
          return b.ingredients.length - a.ingredients.length;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "lCarlories-hCarlories":
        sortedList.sort((a, b) => {
          if (Object.keys(a.nutrition).length === 0) {
            return 1;
          }
          if (Object.keys(b.nutrition).length === 0) {
            return -1;
          }

          return a.nutrition.calories - b.nutrition.calories;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "hCarlories-lCarlories":
        sortedList.sort((a, b) => {
          if (Object.keys(a.nutrition).length === 0) {
            return 1;
          }
          if (Object.keys(b.nutrition).length === 0) {
            return -1;
          }

          return b.nutrition.calories - a.nutrition.calories;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "lTime-hTime":
        sortedList.sort((a, b) => {
          const totalTimeA = a.prepTimeMinutes + a.cookTimeMinutes;
          const totalTimeB = b.prepTimeMinutes + b.cookTimeMinutes;

          if (totalTimeA === 0 || totalTimeA === null) {
            return 1;
          }

          if (totalTimeB === 0 || totalTimeB === null) {
            return -1;
          }

          return totalTimeA - totalTimeB;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "hTime-lTime":
        sortedList.sort((a, b) => {
          const totalTimeA = a.prepTimeMinutes + a.cookTimeMinutes;
          const totalTimeB = b.prepTimeMinutes + b.cookTimeMinutes;

          if (totalTimeA === 0 || totalTimeA === null) {
            return 1;
          }

          if (totalTimeB === 0 || totalTimeB === null) {
            return -1;
          }

          return totalTimeB - totalTimeA;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      default:
        return filteredList;
    }
  };

  return (
    <Wrapper>
      <p>Sort Recipes</p>
      <select name="sort" onChange={handleSortOption} defaultValue="">
        <option disabled value="">
          Select
        </option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="lIngredients-hIngredients">
          Less Ingredients To Most
        </option>
        <option value="hIngredients-lIngredients">
          Most Ingredients To Less
        </option>
        <option value="lCarlories-hCarlories">Less Calories To Most</option>
        <option value="hCarlories-lCarlories">Most Calories To Less</option>
        <option value="lTime-hTime">Less Time To Most</option>
        <option value="hTime-lTime">Most Time To Less</option>
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  gap: 1rem;
`;

export default DropdownSort;
