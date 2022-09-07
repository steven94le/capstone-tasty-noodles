import React from "react";
import styled from "styled-components";

const DropdownSort = ({ filteredList, setFilteredList, setCurrentPage }) => {
  const handleSortOption = (e) => {
    const sortValue = e.target.value;
    const sortedList = [...filteredList];

    switch (sortValue) {
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

      case "lRating-hRating":
        sortedList.sort((a, b) => {
          const ratingA = a.userRatings.score;
          const ratingB = b.userRatings.score;

          if (ratingA === 0 || ratingA === null) {
            return 1;
          }

          if (ratingB === 0 || ratingB === null) {
            return -1;
          }

          return ratingA - ratingB;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "hRating-lRating":
        sortedList.sort((a, b) => {
          const ratingA = a.userRatings.score;
          const ratingB = b.userRatings.score;

          if (ratingA === 0 || ratingA === null) {
            return 1;
          }

          if (ratingB === 0 || ratingB === null) {
            return -1;
          }

          return ratingB - ratingA;
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
        <option value="lIngredients-hIngredients">
          Least Ingredients To Most
        </option>
        <option value="hIngredients-lIngredients">
          Most Ingredients To Least
        </option>
        <option value="lCarlories-hCarlories">Least Calories To Most</option>
        <option value="hCarlories-lCarlories">Most Calories To Least</option>
        <option value="lTime-hTime">Least Time To Most</option>
        <option value="hTime-lTime">Most Time To Least</option>
        <option value="lRating-hRating">Lowest Rating To Highest</option>
        <option value="hRating-lRating">Highest Rating To Lowest</option>
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
