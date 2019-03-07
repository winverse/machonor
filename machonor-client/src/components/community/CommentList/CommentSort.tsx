import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { IoMdRefresh, IoMdCheckmark } from 'react-icons/io';

interface IStyled { 
  active: boolean;
}

const Positioner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
`;

const Sort = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.active ? css`
        color: ${oc.gray[9]};
        svg {
          display: inline-block;
        }
      ` : css`
        color: ${oc.gray[6]};  
      `}
    `;
  }}
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  cursor: pointer;
  user-select: none;
  & + & {
    margin-left: 0.8rem;
  }
`;

const Check = styled(IoMdCheckmark)`
  display: none;
`;

const Refresh = styled(IoMdRefresh)`
  @keyframes rotation {
    0% { -webkit-transform: rotate(0deg); }
    25% { -webkit-transform: rotate(180deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  color: ${oc.gray[9]};
  font-size: 1.25rem;
  cursor: pointer;
  user-select: none;
  margin-left: auto;
  &:active {
    animation: rotation 0.3s linear forwards;
  }
`;

interface IProps {
  sort: string;
  onClick(e: any): Promise<any>;
}

const CommentSort: React.SFC<IProps> = ({ onClick, sort }) => (
  <Positioner className="CommentSort"> 
    <Sort title="popular" onClick={onClick} active={'popular' === sort}><Check/>추천순</Sort>
    <Sort title="recently" onClick={onClick} active={'recently' === sort}><Check/>최신순</Sort>
    <Sort title="past" onClick={onClick} active={'past' === sort}><Check/>과거순</Sort>
    <Refresh onClick={onClick}/>
  </Positioner>
);

export default CommentSort;