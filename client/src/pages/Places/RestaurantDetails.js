import React from "react";
import styled from "styled-components";

const RestaurantDetails = ({ restaurantDetails }) => {
  const { reviews } = restaurantDetails;

  //sort reviews from most recent to least
  const sortedReviewsByDate = reviews.sort((a, b) => b.time - a.time);

  return (
    <Wrapper>
      <StyledHeader>Restaurant Reviews</StyledHeader>
      {sortedReviewsByDate.map((review, index) => (
        <Review key={`${review}-${index}`}>
          <ReviewAuthor>
            🍜 {review.author_name} ({review.rating}/5) -{" "}
            {review.relative_time_description} 🍜
          </ReviewAuthor>
          <ReviewText>{review.text}</ReviewText>
          <br />
        </Review>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 400px;
  height: 60vh;
  background-color: var(--yellow);
  font-size: 15px;
  overflow: auto;
  padding: 15px;
`;

const StyledHeader = styled.h1`
  font-size: 26px;
  margin-bottom: 15px;
  text-decoration: underline;
`;

const Review = styled.div``;

const ReviewAuthor = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const ReviewText = styled.p`
  font-size: 14px;
`;

export default RestaurantDetails;
