import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Members = ({ members }) => {
  return (
    <Wrapper>
      {members?.map((member) => (
        <User key={member.email}>
          <Link to={`/profile/${member.handle}`}>
            <UserImg src={member.picture} alt="member" />
          </Link>
          <UserName>@{member.handle}</UserName>
        </User>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const User = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const UserImg = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;

  :hover {
    cursor: pointer;
  }
`;

const UserName = styled.div`
  font-size: 16px;
`;

export default Members;
