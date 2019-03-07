import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { IoIosInformationCircleOutline as Icon } from 'react-icons/io';

const Positioner = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  color: ${oc.gray[7]};
  font-size: 0.875rem;
  letter-spacing: -1px;
  & + & {
    margin-top: 1rem;
  }
  svg {
    color: Rgba(230, 0, 19, 0.949);
    font-size: 1rem;
    margin-right: 0.5rem;
  }
`;

interface IProps {
  word: string;
}

const Info: React.SFC<IProps> = ({ word }) => (
  <Positioner className="Info">
    <Text><Icon />쉬운 비밀번호를 입력하면 타인의 수정, 삭제가 쉽습니다.</Text>
    <Text><Icon />음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수 있습니다..</Text>
  </Positioner>
);

export default Info;