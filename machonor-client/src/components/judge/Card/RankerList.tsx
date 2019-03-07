import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const UserWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  color: #212842;
`;

const Donation = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Oswald:400,700');
  font-family: 'Oswald', sans-serif;
  flex: 4;
  color: rgba(230, 0, 19, 0.949);
  letter-spacing: 0px;
  font-weight: 600;
`;

const Username = styled(Link)`
  color: ${oc.red[5]};
  font-weight: 600;
  flex: 4.5;
`;

const CommentCount = styled.div`
  flex: 2;
`;

interface IProps {
  ranker: any[];
}

const RankerList: React.SFC<IProps> = ({ ranker }) => {
  const ranking = ranker && ranker.map(
    (user, i) => {
      return (
        <UserWrapper key={i}>
          <Donation>{user.donation}</Donation>
          <Username to={`/@${user.username}`}>{user.username}</Username>
          <CommentCount>{user.commentCount}개</CommentCount>
        </UserWrapper>
      );
    },
  );

  return (
    <Wrapper>
      {ranking}
    </Wrapper>
  );
};

export default RankerList;