import React from "react";
import styled from "styled-components";

const labels = {
  Protein: ["Chicken", "Pork", "Beef", "Tofu", "Shrimp", "Egg"],
  Toppings: ["Green Onions", "Garlic", "Mushroom", "Ginger", "Corn", "Carrot"],
  Sauces: ["Soy Sauce", "Fish Sauce"],
};

const labelKeys = Object.keys(labels);

const Checkbox = ({ handleToggle, checkFilters }) => {
  return (
    <Wrapper>
      {labelKeys.map((labelKey, index) => (
        <Option key={`${labelKey}-${index + 1}`}>
          <div>{labelKey}</div>
          {labels[labelKey].map((ingredient, index) => (
            <div key={`${ingredient}-${index + 1}`}>
              <input
                type="checkbox"
                id={ingredient}
                value={ingredient}
                onChange={handleToggle}
                checked={checkFilters.indexOf(ingredient) === -1 ? false : true}
              />
              <label htmlFor={ingredient}>{ingredient}</label>
            </div>
          ))}
        </Option>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    padding: 0.25rem;
  }
`;

const Option = styled.div`
  display: flex;

  label {
    padding-left: 0.2rem;
  }
`;

export default Checkbox;
