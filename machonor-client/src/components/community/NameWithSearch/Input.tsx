import * as React from 'react';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import oc from 'open-color';
import { media } from 'styles/styleUtils';

const Positioner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  width: 250px;
  border: 1px solid #e1e2e6;
  margin-left: 0.5rem;
  background-color: #f9fafc;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const Svg = styled(IoIosSearch)`
  font-size: 1.2rem;
`;

const InputBox = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  &::placeholder {
    font-size: 0.85rem;
    color: ${oc.gray[4]};
    @media ${media.xxMobile} {
      font-size: 0.75rem;
    }
  }
`;

interface IProps {
  value: string;
  onKeyPress(e: any): void;
  onChange(e: any): void;
}

const Input: React.SFC<IProps> = ({
  value,
  onChange,
  onKeyPress,
}) => (
  <Positioner className="Input">
    <Svg/>
    <InputBox 
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder="검색어를 입력해주세요"
    />
  </Positioner>
);

export default Input;