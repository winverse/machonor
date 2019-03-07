import * as React from 'react';
import styled, { css } from 'styled-components';
import { IoIosSquareOutline, IoMdCheckboxOutline } from 'react-icons/io';
import oc from 'open-color';

interface IStyled {
  active: boolean | any;
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s;
  & + & {
    margin-left: 1rem;
  }
`;

const Name = styled.div`
  color: ${oc.gray[6]};
  font-size: 0.95rem;
  margin-right: 0.5rem;
  ${(props: IStyled) => {
    return css`
      ${props.active === 'true' ? css`
        color: ${oc.gray[7]};
      ` : ''};
    `;
  }};
`;

const Checked = styled(IoMdCheckboxOutline)`
  ${(props: IStyled) => {
    return css`
      display: none;
      font-size: 1.1rem;
      color: ${oc.gray[7]};
      ${props.active === 'true' ? css`
        display: block;
        color: rgba(230, 0, 19, 0.949);
      ` : ''};
    `;
  }};
`;

const UnChecked = styled(IoIosSquareOutline)`
  ${(props: IStyled) => {
    return css`
      font-size: 1.1rem;
      color: ${oc.gray[6]};
      ${props.active === 'false' ? 'display: block;' : 'display: none'};
    `;
  }};
`;

interface IProps {
  name: string | any;
  active: boolean;
  onChangeDisclosure(e: any): void;
}

const CheckBox: React.SFC<IProps> = ({ name, onChangeDisclosure, active }) => (
  <Wrapper className="CheckBox" onClick={onChangeDisclosure} title={name === '공개' ? 'open' : 'unopen'}>
    <Name active={active.toString()}>{name}</Name>
    <UnChecked active={active.toString()}/>
    <Checked active={active.toString()}/>
  </Wrapper>
);

export default CheckBox;