import React from "react";
import styled from "styled-components";

const DropdownSort = ({ filteredList, setFilteredList, setCurrentPage }) => {
  const handleSortOption = (e) => {
    const sortValue = e.target.value;
    const sortedList = [...filteredList];

    switch (sortValue) {
      case "lowToHighIngredients":
        sortedList.sort((a, b) => {
          return a.ingredients.length - b.ingredients.length;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "highToLowIngredients":
        sortedList.sort((a, b) => {
          return b.ingredients.length - a.ingredients.length;
        });
        setCurrentPage(1);
        setFilteredList(sortedList);
        break;

      case "lowToHighCalories":
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

      case "highToLowCalories":
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

      case "lowToHighTime":
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

      case "highToLowTime":
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

      case "lowToHighRating":
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

      case "highToLowRating":
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
      <div>
        <p>Sort Recipes</p>
      </div>
      <div>
        <StyledSelect name="sort" onChange={handleSortOption} defaultValue="">
          <option disabled value="">
            Select Sort Option
          </option>
          <option value="lowToHighIngredients">
            Least Ingredients To Most
          </option>
          <option value="highToLowIngredients">
            Most Ingredients To Least
          </option>
          <option value="lowToHighCalories">Least Calories To Most</option>
          <option value="highToLowCalories">Most Calories To Least</option>
          <option value="lowToHighTime">Least Time To Most</option>
          <option value="highToLowTime">Most Time To Least</option>
          <option value="lowToHighRating">Lowest Rating To Highest</option>
          <option value="highToLowRating">Highest Rating To Lowest</option>
        </StyledSelect>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledSelect = styled.select`
  width: 200px;
  height: 25px;
  text-align: center;

  background: var(--blue);
  color: white;
`;

export default DropdownSort;
