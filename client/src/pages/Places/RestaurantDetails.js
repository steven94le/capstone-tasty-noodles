import React from "react";
import styled from "styled-components";

const RestaurantDetails = ({ restaurantDetails }) => {
  const { reviews } = restaurantDetails;
  const sortedReviewsByDate = reviews.sort((a, b) => b.time - a.time);

  return (
    <Wrapper>
      {sortedReviewsByDate.map((review) => (
        <div>
          <div>
            {review.author_name} ({review.rating}/5) -{" "}
            {review.relative_time_description}
          </div>
          <div></div>
          <div>{review.text}</div>
          <br />
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 400px;
  height: max-content;
  background-color: var(--yellow);
  font-size: 15px;
  overflow: auto;
  height: 500px;
  padding: 15px;
`;

export default RestaurantDetails;
