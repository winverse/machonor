import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { MdSubdirectoryArrowRight } from 'react-icons/md';

import { LineOne, Username, Time, Text } from './PostComments';

const Wrapper = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1rem;

  & + & {
    border-top: 0.8px solid ${oc.gray[4]};
    padding-top: 1rem;
  }
`;

const Icon = styled(MdSubdirectoryArrowRight)`
  display: inline-block;
  font-size: 0.8rem;
  color: ${oc.gray[5]};
  margin-right: 0.25rem;
`;

interface IProps {
  username: string;
  text: string;
}

const Comment: React.SFC<IProps> = ({
  username,
  text,
}) => {
  return (
    <Wrapper className="Comment">
      <LineOne>
        <Icon />
        <Username to={`/@${username}`}>{username}</Username>
        <Time>11분전</Time>
      </LineOne>
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default Comment;