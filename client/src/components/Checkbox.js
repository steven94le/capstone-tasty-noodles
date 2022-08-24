import React from "react";
import styled from "styled-components";

const labels = {
  Protein: ["Chicken", "Pork", "Beef", "Tofu", "Egg"],
  Toppings: ["Green Onions", "Garlic", "Mushroom", "Ginger", "Carrot"],
  Others: ["Soy Sauce", "Fish Sauce", "Sesame Oil", "Rice Vinegar", "Sriracha"],
};

const labelKeys = Object.keys(labels);

const Checkbox = ({ handleToggle, checkFilters }) => {
  return (
    <Wrapper>
      {labelKeys.map((labelKey, index) => (
        <Option key={`${labelKey}-${index + 1}`}>
          <h1>{labelKey}</h1>
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
  justify-content: center;
  margin: 10px 0 10px 0;

  div {
    padding: 0.25rem;
  }
`;

const Option = styled.div`
  width: 150px;
  border-radius: 10px;
  font-size: 16px;
  font-family: var(--font-body);

  label {
    padding-left: 0.2rem;
  }
`;

export default Checkbox;
