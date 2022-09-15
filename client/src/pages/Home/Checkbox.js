import React from "react";
import styled, { keyframes } from "styled-components";

const labels = {
  Protein: ["Chicken", "Pork", "Beef", "Tofu", "Egg"],
  Toppings: ["Onions", "Garlic", "Mushroom", "Ginger", "Carrot"],
  Others: ["Soy Sauce", "Fish Sauce", "Sesame Oil", "Rice Vinegar", "Sriracha"],
};

const labelKeys = Object.keys(labels);

const Checkbox = ({ handleToggle, checkFilters }) => {
  return (
    <Wrapper>
      {labelKeys.map((labelKey) => (
        <Option key={labelKey}>
          <h1>{labelKey}</h1>
          {labels[labelKey].map((ingredient) => (
            <StyledLabel
              htmlFor={ingredient}
              checked={checkFilters.indexOf(ingredient) === -1 ? false : true}
              key={ingredient}
            >
              <Ingredient>
                {ingredient}
                <StyledInput
                  type="checkbox"
                  id={ingredient}
                  value={ingredient}
                  onChange={handleToggle}
                />
              </Ingredient>
            </StyledLabel>
          ))}
        </Option>
      ))}
    </Wrapper>
  );
};

const fadeInAnimation = keyframes`
0% {opacity: 0}
100% {opacity: 1}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  animation: ${fadeInAnimation} 1s;
  div {
    padding: 0.25rem;
  }
`;

const Option = styled.div`
  border-radius: 10px;
  font-size: 16px;
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Ingredient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  :hover {
    transform: scale(1.05);
  }
`;

const StyledLabel = styled.label`
  text-align: center;
  border: 0.1px solid grey;
  border-radius: 5px;
  background: ${({ checked }) => (checked ? "var(--blue)" : "")};
  color: ${({ checked }) => (checked ? "white" : "")};
  transition: background 0.1s linear, color 0.1s linear;

  :hover {
    cursor: pointer;
    background: ${({ checked }) =>
      checked ? "var(--blue)" : "var(--off-white)"};
    transition: background 0.1s linear;
  }
`;

const CheckBoxPop = keyframes`
0% {opacity: 0;}
75% {opacity: 1;}
100% {transform: scale(1.5)}
`;

const StyledInput = styled.input`
  :checked {
    animation: ${CheckBoxPop} 0.2s;
  }
`;

export default Checkbox;
