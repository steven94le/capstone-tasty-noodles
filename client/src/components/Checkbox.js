import React from "react";
import styled from "styled-components";

const labels = [
  "Chicken",
  "Pork",
  "Beef",
  "Tofu",
  "Shrimp",
  "Egg",
  "Green Onions",
  "Garlic",
  "Mushroom",
  "Ginger",
  "Corn",
  "Sesame",
  "Carrot",
];

const Checkbox = ({ handleToggle, checkFilters }) => {
  return (
    <Wrapper>
      {labels.map((label, index) => (
        <Option key={`${label}-${index + 1}`}>
          <input
            type="checkbox"
            name={label}
            value={label}
            onChange={handleToggle}
            checked={checkFilters.indexOf(label) === -1 ? false : true}
          />
          <label htmlFor={label}>{label}</label>
        </Option>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

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
