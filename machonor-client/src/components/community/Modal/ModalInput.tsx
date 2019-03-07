import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { TiLockClosed } from 'react-icons/ti';

interface IStyled {
  anonymous: boolean;
}

const Positioner = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.anonymous ? css`display: flex;` : css`display: none;`}
    `;
  }}
  align-items: center;
  margin-top: 1rem;
  border: 1px solid ${oc.gray[5]};
`;

const Input = styled.input`
  outline: none;
  border: none;
  &::placeholder {
    font-size: 0.9rem;
    color: ${oc.gray[4]};
  }
`;

const Lock = styled(TiLockClosed)`
  margin-right: 0.5rem;
  color: Rgba(230, 0, 19, 0.949);
  font-size: 1.25rem;
`;

interface IProps {
  anonymous: boolean;
  value: string;
  onChange(e: any): void;
}

const ModalInput: React.SFC<IProps> = ({
  anonymous,
  value,
  onChange,
}) => (
  <Positioner className="ModalInput" anonymous={anonymous}>
    <Input 
      value={value}
      placeholder="비밀번호 입력"
      type="password"
      onChange={onChange}
    />
    <Lock />
  </Positioner>
);

export default ModalInput;