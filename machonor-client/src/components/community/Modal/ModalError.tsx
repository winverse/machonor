import * as React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'styles/styleUtils';

interface IStyled {
  active: boolean;
}

const Positioner = styled.div`
  display: none;
  ${(props: IStyled) => {
    return css`
      ${props.active && css`display: block;`}
    `;
  }}
  margin-top: 0.5rem;
`;

const Text = styled.div`
  @keyframes shake {
    0% {
				transform: translate(-30px);
		}
		25% {
				transform: translate(15px);
		}
		50% {
				transform: translate(-10px);
		}
		75% {
				transform: translate(5px);
		}
		100% {
				transform: translate(0px);
		}
  }
  color: red;
  font-weight: 300;
  font-size: 0.85rem;
  animation: shake 0.3s ease-in-out;
  animation-fill-mode: forwards;

  @media ${media.xxMobile} {
    font-size: 0.7rem;
  }
`;

interface IProps {
  active: boolean;
}

const ModalError: React.SFC<IProps> = ({
  active,
}) => (
  <Positioner className="ModalError" active={active}>
    <Text>비밀번호가 일치하지 않습니다.</Text>
  </Positioner>
);

export default ModalError;