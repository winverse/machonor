import * as React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'styles/styleUtils';

interface IStyled {
  active: boolean;
}

const Wrapper = styled.div`
  ${(props: IStyled) => {
    return css`
      display: none;
      justify-content: flex-start;
      align-items: center;
      margin-top: 0.5rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      border-radius: 5px;
      ${props.active && css`
        display: flex;
      `}

      @media ${media.xxMobile} {
        margin-top: 0.375rem;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
      }
    `;
  }}
`;

const Text = styled.span`
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
  message: string;
}

const ErrorMessage: React.SFC<IProps> = ({ message }) => (
  <Wrapper className="ErrorMessage" active={message !== '' ? true : false}>
    <Text>{message}</Text>
  </Wrapper>
);

export default ErrorMessage;