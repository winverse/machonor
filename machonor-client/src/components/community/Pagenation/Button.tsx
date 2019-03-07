import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { TiPencil, TiThList } from 'react-icons/ti';
import { media } from 'styles/styleUtils';

interface IStyled {
  purpose?: string;
}

const Positioner = styled(Link)`
  ${(props: IStyled) => {
    return css`
      ${props.purpose === 'list' ? css`
        left: 20px;
      ` : css`
        right: 20px;
      `}
    `;
  }}
  height: 30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(230, 0, 19, 0.949);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: white;
  user-select: none;
  border-radius: 5px;
  &:hover {
    background-color: ${oc.red[9]};
  }
  &:active {
    transform: translateY(2px);
    filter: brightness(110%);
  }
  svg {
    margin-right: 0.35rem;
  }
  @media ${media.xxMobile} {
    position: static;
    margin-left: auto;
    margin-bottom: 1rem;
  }
  z-index: 1000;
`;

const Text = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
`;

const provider = {
  list: {
    icon: TiThList,
  },
  write: {
    icon: TiPencil,
  },
};

interface IProps {
  text: string;
  to: string;
  type: 'list' | 'write';
}

const Button: React.SFC<IProps> = ({
  text,
  to,
  type,
}) => {
  const { icon: Icon } = provider[type];
  return (
    <Positioner className="Button" to={to}>
      <Icon />
      <Text>{text}</Text>
    </Positioner>
  );
};

export default Button;