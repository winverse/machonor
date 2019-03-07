import * as React from 'react';
import styled, { css } from 'styled-components';
import { IoMdCheckmark } from 'react-icons/io';

interface IStyled {
  active?: boolean;
  checked?: boolean;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  flex-flow: row nowrap;
  margin-top: 1rem;
  cursor: pointer;
  user-select: none;
  ${(props: IStyled) => {
    return css`
      ${props.active && css`
        div{
          font-weight: 600;
          &:first-child {
            border: 1.5px solid rgba(230, 0, 19, 0.949);
          }
        }
      `};
    `;
  }}
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(230, 0, 19, 0.949);
  border-radius: 2px;
  width: 24px;
  height: 24px;
`;

const Marked = styled(IoMdCheckmark)`
  color: rgba(230, 0, 19, 0.749);
  font-size: 1.3rem;
  font-weight: 800;
  visibility: hidden;
  ${(props: IStyled) => {
    return css`
      ${props.checked && css`
        visibility: visible;
      `};
    `;
  }};
`;

const Label = styled.div`
  font-weight: 300;
  margin-left: 0.5rem;
`;

interface IProps {
  active: boolean;
  message: string;
  checked: boolean;
  title: string;
  onClick(e: any): void;
}

const CheckBoxWithLabel: React.SFC<IProps> = ({
  active,
  message,
  checked,
  title,
  onClick,
}) => (
  <Wrapper className="CheckBoxWithLabel" active={active} title={title} onClick={onClick}>
    <CheckBox>
      <Marked checked={checked}/>
    </CheckBox>
    <Label>{message}</Label>
  </Wrapper>
);

export default CheckBoxWithLabel;